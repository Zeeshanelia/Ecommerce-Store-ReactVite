import { useState, useEffect } from "react";
import Layout from "./Layout";
import firebaseAppConfig from '../../util/firebase-config';
import { getFirestore, getDocs, collection, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

const db = getFirestore(firebaseAppConfig);

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, "orders"));
      const tmp = [];
      snapshot.forEach((docSnap) => {
        const order = docSnap.data();
        order.orderId = docSnap.id;
        tmp.push(order);
      });
      setOrders(tmp);
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (e, orderId) => {
    try {
      const status = e.target.value;
      const ref = doc(db, "orders", orderId);
      await updateDoc(ref, { status });
      Swal.fire({
        icon: "success",
        title: "Order status updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-xl font-semibold">Orders</h1>
        <div className="mt-6">
          <table className="w-full">
            <thead>
              <tr className="bg-rose-600 text-white">
                <th className="py-4">Order Id</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr
                  className="text-center"
                  key={index}
                  style={{
                    background: (index + 1) % 2 === 0 ? "#f1f5f9" : "white",
                  }}
                >
                  <td className="py-4">{item.orderId}</td>
                  <td className="capitalize">{item.customerName || "N/A"}</td>
                  <td>{item.email || "N/A"}</td>
                  <td>{item.phone || "N/A"}</td>
                  <td className="capitalize">{item.title}</td>
                  <td>₹{item.price?.toLocaleString() || 0}</td>
                  <td>{item.date || "N/A"}</td>
                  <td className="capitalize">
                    <select
                      className="border p-1 border-gray-200"
                      defaultValue={item.status || "pending"}
                      onChange={(e) => updateOrderStatus(e, item.orderId)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="returned">Returned</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
