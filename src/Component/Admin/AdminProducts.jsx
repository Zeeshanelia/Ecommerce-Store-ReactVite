import { useState, useEffect } from "react";
import Layout from "./Layout";
import firebaseAppConfig from "../../util/firebase-config";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
// import uploadFile from "../../util/"

const db = getFirestore(firebaseAppConfig);

const Products = () => {
  const [updateUi, setUpdateUi] = useState(false);
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [edit, setEdit] = useState(null);
  const [productModal, setProductModal] = useState(false);
  const [applyCloseAnimation, setApplyCloseAnimation] = useState(false);

  const model = {
    title: "",
    description: "",
    price: "",
    discount: "",
  };
  const [productForm, setProductForm] = useState(model);

  useEffect(() => {
    const req = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const tmp = [];
      snapshot.forEach((doc) => {
        const allProducts = doc.data();
        allProducts.id = doc.id;
        tmp.push(allProducts);
      });
      setProducts(tmp);
    };
    req();
  }, [updateUi]);

  const handleModalClose = () => {
    setApplyCloseAnimation(true);
    setTimeout(() => {
      setProductModal(false);
      setEdit(null);
      setProductForm(model);
    }, 700);
  };

  const handleModalOpen = () => {
    setApplyCloseAnimation(false);
    setProductModal(true);
    setEdit(null);
    setProductForm(model);
  };

  const handleProductForm = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const createProduct = async (e) => {
    try {
      e.preventDefault();
      if (isSubmitting) return;

      setIsSubmitting(true);
      await addDoc(collection(db, "products"), productForm);
      setProductForm(model);
      handleModalClose();
      setUpdateUi(!updateUi);
      Swal.fire({
        icon: "success",
        title: "Product Added",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadProductImage = async (e, id) => {
    const input = e.target;
    const file = input.files[0];
    if (!file) return;

    const path = `products/${Date.now()}.png`;
    const url = await uploadFile(file, path);
    const ref = doc(db, "products", id);
    await updateDoc(ref, { image: url });
    setUpdateUi(!updateUi);
  };

  const deleteProduct = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const ref = doc(db, "products", id);
        await deleteDoc(ref);
        setUpdateUi(!updateUi);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to delete product",
        text: err.message,
      });
    }
  };

  const editProduct = (item) => {
    setEdit(item);
    setProductForm(item);
    setProductModal(true);
    setApplyCloseAnimation(false);
  };

  const saveData = async (e) => {
    try {
      e.preventDefault();
      if (isSubmitting) return;

      setIsSubmitting(true);
      const ref = doc(db, "products", edit.id);
      await updateDoc(ref, productForm);
      setProductForm(model);
      setProductModal(false);
      setEdit(null);
      setUpdateUi(!updateUi);
      Swal.fire({
        icon: "success",
        title: "Product Updated",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to update product",
        text: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-xl font-semibold mb-2">
            Click The Button. You Can Add Products Here..
          </h1>
          <button
            className="items-center bg-indigo-600 text-white rounded py-2 px-4"
            onClick={handleModalOpen}
          >
            <i className="ri-sticky-note-add-line mr-2"></i>
            New Product
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-8">
          {products.map((item, index) => (
            <div key={index} className="bg-white rounded-md shadow-lg">
              <div className="relative">
                <img
                  src={item.image ? item.image : "/images/pt.jpg"}
                  className="rounded-t-md w-full h-[270px] object-cover"
                  alt={item.title}
                />
                <input
                  onChange={(e) => uploadProductImage(e, item.id)}
                  type="file"
                  className="opacity-0 w-full h-full absolute top-0 left-0"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-lg capitalize">
                    {item.title}
                  </h1>
                  <div className="space-x-2">
                    <button type="button" onClick={() => editProduct(item)}>
                      <i className="ri-edit-box-line text-violet-600"></i>
                    </button>
                    <button type="button" onClick={() => deleteProduct(item.id)}>
                      <i className="ri-delete-bin-6-line text-rose-600"></i>
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 mt-1">
                  <label>Rs: {item.price - (item.price * item.discount) / 100}</label>
                  <del className="font-semibold">Rs {item.price}</del>
                  <label className="text-gray-600">
                    ({item.discount}% Off)
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productModal && (
          <div
            className={`animate__animated ${
              applyCloseAnimation ? "animate__fadeOut" : "animate__fadeIn"
            } bg-black bg-opacity-80 fixed top-0 left-0 w-full h-full flex justify-center items-center z-50`}
          >
            <div
              className={`animate__animated ${
                applyCloseAnimation ? "animate__zoomOut" : "animate__zoomIn"
              } animate__faster bg-white w-5/12 py-5 px-6 mt-8 rounded-md border border-1 relative`}
            >
              <button
                type="button"
                className="absolute top-4 right-3"
                onClick={handleModalClose}
              >
                <i className="ri-close-line text-lg"></i>
              </button>
              <h1 className="text-lg font-semibold">
                {edit ? "Edit Product" : "New Product"}
              </h1>
              <form
                className="grid grid-cols-2 gap-6"
                onSubmit={edit ? saveData : createProduct}
              >
                <input
                  required
                  name="title"
                  placeholder="Enter product title here"
                  className="p-2 border border-gray-300 rounded col-span-2"
                  onChange={handleProductForm}
                  value={productForm.title}
                />

                <input
                  required
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="p-2 border border-gray-300 rounded"
                  onChange={handleProductForm}
                  value={productForm.price}
                />

                <input
                  required
                  type="number"
                  name="discount"
                  placeholder="Discount"
                  className="p-2 border border-gray-300 rounded"
                  onChange={handleProductForm}
                  value={productForm.discount}
                />

                <textarea
                  required
                  name="description"
                  placeholder="Description"
                  className="border border-gray-300 rounded col-span-2"
                  rows={8}
                  onChange={handleProductForm}
                  value={productForm.description}
                />

                <div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white rounded px-4 py-1 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : edit
                      ? "Update"
                      : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
