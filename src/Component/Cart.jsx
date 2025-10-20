<<<<<<< HEAD
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

  // 1  Track current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user || null);
    });
    return () => unsubscribe();
  }, []);

  //  2 Fetch user's cart items
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
        firestoreId: d.id, //  Firestore internal doc ID
        ...d.data(),
      }));

      setProducts(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3 Refetch when user logs in/out
  useEffect(() => {
    if (session?.uid) fetchCartItems(session.uid);
    else setProducts([]);
  }, [session]);

  //  4 Delete product from Firestore
  const handleRemove = async (firestoreId) => {
    if (!firestoreId) {
      alert("Missing Firestore document ID.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "cart", firestoreId)); //  Uses real Firestore doc ID
      console.log("🗑️ Deleted Firestore document:", firestoreId);

      // Update UI
      setProducts((prev) => prev.filter((item) => item.firestoreId !== firestoreId));
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete item. Check console for details.");
    }
  };

  // 5 Total calculation
  const totalAmount = products.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const discount = parseFloat(item.discount) || 0;
    const discounted = price - (price * discount) / 100;
    return sum + discounted;
  }, 0);

  const STRIPE_PAYMENT_LINK =
    "https://buy.stripe.com/test_7sYbITez478j1FydXra3u00";

  const handleCheckout = () => {
    const url = new URL(STRIPE_PAYMENT_LINK);
    if (session?.email)
      url.searchParams.append("prefilled_email", session.email);
    window.location.href = url.toString();
  };

  return (
    <LayoutAll>
      <div className="md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-8">
        <div className="flex items-center gap-4">
          <i className="ri-shopping-cart-line text-4xl"></i>
          <h1 className="text-3xl font-semibold">Cart</h1>
        </div>

        <hr className="my-6" />

        {/*  Loading */}
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
                  <h1 className="font-semibold capitalize text-lg">
                    {item.title}
                  </h1>
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
                      <span className="text-gray-500">
                        ({item.discount}% Off)
                      </span>
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

        {/*  Total and Checkout */}
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

































// import LayoutAll from "./LayoutAll"
// import { useState } from "react"
// import { useEffect } from "react"
// import firebaseAppConfig from "../util/firebase-config";
// import { getAuth, onAuthStateChanged, } from "firebase/auth";
// import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
// import CheckoutButton from "./CheckoutButton";



// const auth = getAuth(firebaseAppConfig)
// const db = getFirestore(firebaseAppConfig);

// // const firebaseConfig = {
// //     apiKey  : "AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// //     authDomain: "your-project-id.firebaseapp.com",          
// //     projectId: "your-project-id",
// //     storageBucket: "your-project-id.appspot.com",
// //     messagingSenderId: "xxxxxxxxxxxx",
// //     appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxx",
// //     measurementId: "G-XXXXXXXXXX"
// // };

// const Cart = () => {
//     const [products, setProducts] = useState([
//         {
//             title: 'trosur fresh article',
//             price: 20000,
//             discount: 15,
//             image: '/img/trouser24.jpeg'
//         },
//         {
//             title: 'trosur fresh article',
//             price: 20000,
//             discount: 15,
//             image: '/img/trouser25.jpeg'
//         },

//         {
//             title: 'trosur fresh article',
//             price: 20000,
//             discount: 15,
//             image: '/img/trouser26.jpeg'
//         }
//     ])


//     // Add more products as needed


//     const [session, setSession] = useState(null)

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setSession(user)
//             }
//             else {
//                 setSession(null)
//             }
//         })
//     }, [])
//     useEffect(() => {
//         const fetchCartItems = async () => {
//             if (session) {
//                 const cartQuery = query(
//                     collection(db, 'cart'),
//                     where('userId', '==', session.uid)
//                 );
//                 const querySnapshot = await getDocs(cartQuery);
//                 const cartItems = [];
//                 querySnapshot.forEach((doc) => {
//                     cartItems.push(doc.data());
//                 });
//                 setProducts(cartItems);
//             }
//         }
//         fetchCartItems();

//     }, [])
//     return (
//         <LayoutAll>
//             <div className="md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-8">
//                 <div className="flex items-center gap-4">
//                     <i className="ri-shopping-cart-line text-4xl"></i>
//                     <h1 className="text-3xl font-semibold">Cart</h1>
//                 </div>
//                 <hr className="my-6" />
//                 <div className="space-y-12">
//                     {
//                         products.map((item, index) => (
//                             <div key={index} className="flex gap-4">
//                                 <img src={item.image} className="w-[100px] border border-3 border-white shadow" />
//                                 <div>
//                                     <h1 className="font-semibold capitalize text-lg">{item.title}</h1>
//                                     <div className="flex flex-col gap-4">
//                                         <div className="space-x-3">
//                                             <label className="text-lg font-semibold">Rs:{item.price - (item.price * item.discount) / 100}</label>
//                                             <del>Rs:{item.price}</del>
//                                             <label className="text-gray-500">{item.discount}% Discount</label>
//                                         </div>
//                                         <button className="w-fit bg-rose-600 text-white px-4 py-2 rounded">
//                                             <i className="ri-delete-bin-line mr-2"></i>
//                                             Remove
//                                         </button>

//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>

//                 <hr className="my-6" />
//                 <div className="flex justify-between items-center">
//                     <h1 className="font-semibold text-2xl">Total : Rs 57,000</h1>
//                     <button className="bg-green-500 text-white px-12 py-3 rounded mt-4 font-semibold hover:bg-rose-600">
//                         <i className="ri-shopping-bag-4-line mr-2"></i>
//                         Buy Now
                   
//                     </button>
//                 </div>
//             </div>
//         </LayoutAll>
//     )
// }

// export default Cart


=======
import { useState } from "react"
import LayoutAll from "./LayoutAll"
import { useEffect } from "react"
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";




const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig);

// const firebaseConfig = {
//     apiKey  : "AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//     authDomain: "your-project-id.firebaseapp.com",          
//     projectId: "your-project-id",
//     storageBucket: "your-project-id.appspot.com",
//     messagingSenderId: "xxxxxxxxxxxx",
//     appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxx",
//     measurementId: "G-XXXXXXXXXX"
// };

const Cart = () => {
    const [products, setProducts] = useState([
        {
            title: 'trosur fresh article',
            price: 20000,
            discount: 15,
            image: '/img/trouser24.jpeg'
        },
        {
            title: 'trosur fresh article',
            price: 20000,
            discount: 15,
            image: '/img/trouser25.jpeg'
        },

        {
            title: 'trosur fresh article',
            price: 20000,
            discount: 15,
            image: '/img/trouser26.jpeg'
        }
    ])


    // Add more products as needed


    const [session, setSession] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            }
            else {
                setSession(null)
            }
        })
    }, [])
    useEffect(() => {
        const fetchCartItems = async () => {
            if (session) {
                const cartQuery = query(
                    collection(db, 'cart'),
                    where('userId', '==', session.uid)
                );
                const querySnapshot = await getDocs(cartQuery);
                const cartItems = [];
                querySnapshot.forEach((doc) => {
                    cartItems.push(doc.data());
                });
                setProducts(cartItems);
            }
        }
        fetchCartItems();

    }, [])
    return (
        <LayoutAll>
            <div className="md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-8">
                <div className="flex items-center gap-4">
                    <i className="ri-shopping-cart-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Cart</h1>
                </div>
                <hr className="my-6" />
                <div className="space-y-12">
                    {
                        products.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <img src={item.image} className="w-[100px] border border-3 border-white shadow" />
                                <div>
                                    <h1 className="font-semibold capitalize text-lg">{item.title}</h1>
                                    <div className="flex flex-col gap-4">
                                        <div className="space-x-3">
                                            <label className="text-lg font-semibold">Rs:{item.price - (item.price * item.discount) / 100}</label>
                                            <del>Rs:{item.price}</del>
                                            <label className="text-gray-500">{item.discount}% Discount</label>
                                        </div>
                                        <button className="w-fit bg-rose-600 text-white px-4 py-2 rounded">
                                            <i className="ri-delete-bin-line mr-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <hr className="my-6" />
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-2xl">Total : Rs 57,000</h1>
                    <button className="bg-green-500 text-white px-12 py-3 rounded mt-4 font-semibold hover:bg-rose-600">
                        <i className="ri-shopping-bag-4-line mr-2"></i>
                        Buy Now
                    </button>
                </div>
            </div>
        </LayoutAll>
    )
}

export default Cart
>>>>>>> 43360bff556c7beeeac6c9aab57f55638a3d1a5d








// import LayoutAll from "./LayoutAll"
// import { useState, useEffect } from "react"
// import firebaseAppConfig from "../util/firebase-config";
// import { onAuthStateChanged, getAuth } from "firebase/auth";
// import { getFirestore, getDocs, collection, query, where, doc, deleteDoc, serverTimestamp, addDoc } from "firebase/firestore";
// import axios from "axios";
// // import useRazorpay from "react-razorpay";
// const auth = getAuth(firebaseAppConfig)
// const db = getFirestore(firebaseAppConfig)
// import { useNavigate } from "react-router-dom";

// const Cart = ()=>{
//     const navigate = useNavigate()
//     const [address, setAddress] = useState(null)
//     const [Razorpay] = useRazorpay();
//     const [products, setProducts] = useState([])
//     const [session, setSession] = useState(null)
//     const [updateUi, setUpdateUi] = useState(false)
//     useEffect(()=>{
//         onAuthStateChanged(auth, (user)=>{
//             if(user)
//             {
//                 setSession(user)
//             }
//             else {
//                 setSession(null)
//             }
//         })
//     },[])

//     useEffect(()=>{
//         const req = async ()=>{
//             if(session)
//             {
//                 const col = collection(db, "carts")
//                 const q = query(col, where("userId", "==", session.uid))
//                 const snapshot = await getDocs(q)
//                 const tmp = []
//                 snapshot.forEach((doc)=>{
//                     const document = doc.data()
//                     document.cartId = doc.id
//                     tmp.push(document)
//                 })
//                 setProducts(tmp)
//             }
//         }
//         req()
//     },[session, updateUi])

//     useEffect(()=>{
//         const req = async ()=>{
//             if(session)
//             {
//                 const col = collection(db, "addresses")
//                 const q = query(col, where("userId", "==", session.uid))
//                 const snapshot = await getDocs(q)
//                 snapshot.forEach((doc)=>{
//                     const document = doc.data()
//                     setAddress(document)
//                 })
//             }
//         }

//         req()
//     }, [session])

//     const getPrice = (products)=>{
//         let sum = 0
//         for(let item of products)
//         {
//             let amount = Math.round(item.price - (item.price*item.discount)/100)
//             sum = sum+amount
//         }
//         return sum
//     }

//     const removeCart = async (id)=>{
//         try {
//             const ref = doc(db, "carts", id)
//             await deleteDoc(ref)
//             setUpdateUi(!updateUi)
//         }
//         catch(err)
//         {
//             console.log(err)
//         }
//     }

//     const buyNow = async ()=>{
//         try {
//             const amount = getPrice(products)
//             const {data} = await axios.post('http://localhost:8080/order', {amount: amount})
//             const options = {
//                 key: 'rzp_test_I8721sxIUbhro5',
//                 amount: data.amount,
//                 order_id: data.orderId,
//                 name: 'You & Me Shop',
//                 description: 'Bulk products',
//                 image: 'https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg',
//                 handler: async function(response) {
//                     for(let item of products)
//                     {
//                         let product = {
//                             ...item,
//                             userId: session.uid,
//                             status: 'pending',
//                             email: session.email,
//                             customerName: session.displayName,
//                             createdAt: serverTimestamp(),
//                             address: address
//                         }
//                         await addDoc(collection(db, "orders"), product)
//                         await removeCart(item.cartId)
//                     }
//                     navigate('/profile')
//                 },
//                 notes: {
//                     name: session.displayName
//                 }
//             }
//             const rzp = new Razorpay(options)

//             rzp.open()

//             rzp.on("payment.failed", function(response) {
//                 navigate('/failed')
//             })
//         }
//         catch(err)
//         {
//             console.log(err)
//         }
//     }


//     return (
//         <LayoutAll update={updateUi}>
//           
//   <div className="md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-8">
//                 <div className="flex items-center gap-4">
//                     <i className="ri-shopping-cart-line text-4xl"></i>
//                     <h1 className="text-3xl font-semibold">Cart</h1>
//                 </div>
//                 <hr className="my-6"/>
//                 <div className="space-y-12">
//                     {
//                         products.map((item, index)=>(
//                             <div key={index} className="flex gap-4">
//                                
//  <img src={item.image} className="w-[100px] border border-3 border-white shadow" />
//                                 <div>
//                                   
//   <h1 className="font-semibold capitalize text-lg">{item.title}</h1>
//                                     <div className="flex flex-col gap-4">
//                                         <div className="space-x-3">
//                                         
//     <label className="text-lg font-semibold">₹{item.price - (item.price*item.discount)/100}</label>
//                                             <del>₹{item.price}</del>
//                                           
//   <label className="text-gray-500">{item.discount}% Discount</label>
//                                         </div>
//                                        
//  <button className="w-fit bg-rose-600 text-white px-4 py-2 rounded" onClick={()=>removeCart(item.cartId)}>
//                                            
//  <i className="ri-delete-bin-line mr-2"></i>
//                                             Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>

//                 <hr className="my-6"/>
//                 <div className="flex justify-between items-center">
//                     <h1 className="font-semibold text-2xl">Total : ₹{getPrice(products).toLocaleString()}</h1>
//                     {
//                         (products.length > 0) &&
//                         <button onClick={buyNow} className="bg-green-500 text-white px-12 py-3 rounded mt-4 font-semibold hover:bg-rose-600">
//                             <i className="ri-shopping-bag-4-line mr-2"></i>
//                             Buy Now
//                         </button>
//                     }
//                 </div>
//             </div>
//         </LayoutAll>
//     )
// }

// export default Cart