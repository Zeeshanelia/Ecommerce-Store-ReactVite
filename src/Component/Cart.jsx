import LayoutAll from "./LayoutAll";
import { useState, useEffect } from "react";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const auth = getAuth(firebaseAppConfig);
const db = getFirestore(firebaseAppConfig);

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track current user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user || null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's cart items from Firestore
  const fetchCartItems = async (userId) => {
    if (!userId) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const cartRef = collection(db, "cart");
      const q = query(cartRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const cartItems = querySnapshot.docs.map((d) => ({
        firestoreId: d.id,
        ...d.data(),
      }));

      setProducts(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refetch when user logs in/out
  useEffect(() => {
    if (session?.uid) fetchCartItems(session.uid);
    else setProducts([]);
  }, [session]);

  // Delete product from Firestore
  const handleRemove = async (firestoreId) => {
    if (!firestoreId) {
      alert("Missing Firestore document ID.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "cart", firestoreId));
      setProducts((prev) => prev.filter((item) => item.firestoreId !== firestoreId));
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete item. Check console for details.");
    }
  };

  // Total calculation
  const totalAmount = products.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const discount = parseFloat(item.discount) || 0;
    const discounted = price - (price * discount) / 100;
    return sum + discounted;
  }, 0);

  // Stripe test payment link
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_7sYbITez478j1FydXra3u00";

  const handleCheckout = () => {
    const url = new URL(STRIPE_PAYMENT_LINK);
    if (session?.email) url.searchParams.append("prefilled_email", session.email);
    window.location.href = url.toString();
  };

  return (
    <LayoutAll>
      <div className="md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <i className="ri-shopping-cart-line text-4xl"></i>
          <h1 className="text-3xl font-semibold">Cart</h1>
        </div>

        <hr className="my-6" />

        {/* Loading or Cart Items */}
        {loading ? (
          <p className="text-center text-gray-500">Loading your cart...</p>
        ) : products.length > 0 ? (
          <div className="space-y-12">
            {products.map((item) => (
              <div key={item.firestoreId} className="flex gap-4 items-start">
                <img
                  src={item.image || "/img/default.png"}
                  alt={item.title}
                  className="w-[100px] border border-gray-200 shadow-sm rounded"
                />
                <div>
                  <h1 className="font-semibold capitalize text-lg">{item.title}</h1>
                  <div className="flex flex-col gap-2">
                    <div className="space-x-3">
                      <span className="text-lg font-semibold text-gray-800">
                        Rs:{" "}
                        {(
                          item.price -
                          (item.price * item.discount) / 100
                        ).toLocaleString()}
                      </span>
                      <del className="text-gray-400">Rs: {item.price}</del>
                      <span className="text-gray-500">({item.discount}% Off)</span>
                    </div>

                    <button
                      onClick={() => handleRemove(item.firestoreId)}
                      className="w-fit bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition"
                    >
                      <i className="ri-delete-bin-line mr-2"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg py-8">
            Your cart is empty 🛒
          </p>
        )}

        <hr className="my-6" />

        {/* Total and Checkout */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl">
            Total: Rs {totalAmount.toLocaleString()}
          </h1>
          {products.length > 0 && (
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-12 py-3 rounded mt-4 font-semibold hover:bg-green-600 transition"
            >
              <i className="ri-shopping-bag-4-line mr-2"></i> Pay Now
            </button>
          )}
        </div>
      </div>
    </LayoutAll>
  );
};

export default Cart;
