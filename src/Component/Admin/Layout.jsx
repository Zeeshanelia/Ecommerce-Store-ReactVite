import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [size, setSize] = useState(280);
  const [mobSize, setMobSize] = useState(0);
  const [accMenu, setAccMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobSize(0);
  }, [location.pathname]);

  // Close account menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setAccMenu(false);
    if (accMenu) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [accMenu]);

  const menus = [
    { label: "Dashboard", icon: <i className="ri-dashboard-horizontal-line"></i>, link: "/admin/dashboard" },
    { label: "Customer", icon: <i className="ri-shield-user-fill"></i>, link: "/admin/customer" },
    { label: "Products", icon: <i className="ri-shopping-cart-fill"></i>, link: "/admin/products" },
    { label: "Order", icon: <i className="ri-list-ordered-2"></i>, link: "/admin/order" },
    { label: "Payment", icon: <i className="ri-money-dollar-box-line"></i>, link: "/admin/payment" },
    { label: "Settings", icon: <i className="ri-settings-3-fill"></i>, link: "/admin/settings" },
  ];

  // Logout handler
  const handleLogout = () => {
    setAccMenu(false);
    setMobSize(0);
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleAccountMenu = (e) => {
    e.stopPropagation();
    setAccMenu(!accMenu);
  };

  return (
    <>
      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:block">
        <aside
          className="bg-indigo-600 fixed top-0 left-0 h-full overflow-y-auto shadow-lg"
          style={{ width: `${size}px`, transition: "0.3s ease" }}
        >
          <div className="flex flex-col py-4">
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center px-6 py-3 text-white hover:bg-rose-600 transition-colors ${
                  location.pathname === item.link ? "bg-rose-700" : ""
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 text-white hover:bg-rose-600 transition-colors text-left"
            >
              <i className="ri-logout-box-r-line mr-3 text-lg"></i> Logout
            </button>
          </div>
        </aside>

        <section
          className="min-h-screen bg-gray-50"
          style={{ marginLeft: size, transition: "0.3s ease" }}
        >
          <nav className="bg-white p-3 shadow-md flex items-center justify-between sticky top-0 left-0 z-40">
            <div className="flex gap-3 items-center">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setSize(size === 280 ? 0 : 280)}
              >
                <i className="ri-menu-line text-2xl text-gray-700"></i>
              </button>
              <h2 className="text-lg font-bold text-gray-800">ShopMart</h2>
            </div>

            <div className="relative">
              <button onClick={handleAccountMenu}>
                <img
                  src="/img/avatar.png"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                  alt="User avatar"
                />
              </button>

              {accMenu && (
                <div className="absolute top-12 right-0 bg-white w-64 p-4 shadow-lg rounded-lg border border-gray-200 z-50">
                  <div className="text-center mb-3">
                    <h3 className="font-semibold text-gray-800">Zeeshan Elia</h3>
                    <p className="text-sm text-gray-600">example@yahoo.com</p>
                  </div>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left text-red-600 hover:text-red-800 transition"
                  >
                    <i className="ri-logout-box-r-line mr-2"></i> Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="p-6">{children}</div>
        </section>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="block md:hidden">
        {mobSize > 0 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobSize(0)}
          />
        )}

        <aside
          className={`bg-indigo-600 fixed top-0 left-0 h-full overflow-y-auto z-50 transition-all duration-300 ${
            mobSize === 0 ? "w-0" : "w-64"
          }`}
        >
          <div className="flex flex-col py-4">
            <button
              onClick={() => setMobSize(0)}
              className="self-end mx-6 my-2 p-2 text-white hover:bg-rose-600 rounded-lg"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center px-6 py-3 text-white hover:bg-rose-600 transition ${
                  location.pathname === item.link ? "bg-rose-700" : ""
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 text-white hover:bg-rose-600 transition text-left"
            >
              <i className="ri-logout-box-r-line mr-3 text-lg"></i> Logout
            </button>
          </div>
        </aside>

        <section className="min-h-screen bg-gray-50">
          <nav className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 left-0 z-30">
            <div className="flex gap-3 items-center">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobSize(mobSize === 0 ? 280 : 0)}
              >
                <i className="ri-menu-line text-2xl text-gray-700"></i>
              </button>
              <h2 className="text-lg font-semibold text-gray-800">ShopMart</h2>
            </div>

            <div className="relative">
              <button onClick={handleAccountMenu}>
                <img
                  src="/img/avatar.png"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                  alt="User avatar"
                />
              </button>

              {accMenu && (
                <div className="absolute top-12 right-0 bg-white w-64 p-4 shadow-lg rounded-lg border border-gray-200 z-50">
                  <div className="text-center mb-3">
                    <h3 className="font-semibold text-gray-800">Zeeshan Elia</h3>
                    <p className="text-sm text-gray-600">example@yahoo.com</p>
                  </div>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left text-red-600 hover:text-red-800 transition"
                  >
                    <i className="ri-logout-box-r-line mr-2"></i> Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
          <div className="p-4">{children}</div>
        </section>
      </div>
    </>
  );
};

export default Layout;
