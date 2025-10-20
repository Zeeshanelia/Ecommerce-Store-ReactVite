import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <img src="/img/Admin (2).svg" className="w-80 h-80" alt="Admin Illustration" />

        <div className="ml-6">
          <h2 className="mb-4 font-semibold text-4xl">Welcome Admin</h2>
          <form className="flex flex-col">
            <input
              type="text"
              className="w-[450px] border p-4 bg-white rounded-md"
              placeholder="Admin Secret"
            />
            <button className="p-4 bg-violet-500 text-white font-semibold w-fit rounded-md mt-4 hover:bg-violet-600">
              Access Now
            </button>
          </form>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Admin;
