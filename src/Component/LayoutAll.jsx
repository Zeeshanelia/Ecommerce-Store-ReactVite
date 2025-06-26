import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import appConfig from "../util/firebase-config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
const db = getFirestore(appConfig);
const auth = getAuth(appConfig);

const LayoutAll = ({ children, updateLayoutAllUi }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [accountMenu, setAccountMenu] = useState(false);
  const [session, setSession] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (updateLayoutAllU) {
  //     // Perform any necessary updates when the layout changes
  //   }
  // }, [updateLayoutAllU]);


  useEffect(() => {
    if (session) {
      const req = async () => {
        const col = collection(db, "cart");
        const q = query(col, where("userId", "==", session.uid));
        const snapshot = await getDocs(q);
        setCartCount (snapshot.size);
      };
      req();
    }
  }, [session, updateLayoutAllUi]);


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSession(null);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const Menus = [
    { label: "Home", Link: "/" },
    { label: "Products", Link: "/products" },
    { label: "Category", Link: "/category" },
    { label: "Contact Us", Link: "/contact-us" },
  ];

  const moblieLink = (href) => {
    setOpen(false);
    navigate(href);
  };

  if (loading) {
    return (
      <div className="bg-gray-100 h-full fixed top-0 left-0 w-full flex justify-center items-center">
        <span className="relative flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
        </span>
      </div>
    );
  }

  return (
    <>
      <nav className="bg-slate-400 p-2 shadow-lg sticky top-0 break-words z-10">
        <div className="flex justify-between gap-1 mr-10 items-center">
          <button className="flex items-center gap-2 ml-9">
            <img
              src="/img/shopping.png"
              onError={(e) => (e.target.style.display = "none")}
              className="w-14 items-center"
              alt="Shopping"
            />
            <h2 className="text-md">Shopping Club</h2>
          </button>

          {/* Mobile Nav Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <i className="ri-menu-search-line text-3xl"></i>
          </button>

          <div className="md:flex hidden gap-5">
            {Menus.map((item, index) => (
              <Link
                key={index}
                to={item.Link}
                className="px-2 py-1 text-white p-4 hover:bg-rose-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            {session && (
              <Link to="/cart" className="relative">
                <i className="ri-shopping-cart-line text-xl"></i>
                {typeof cartCount === "number" && (
                  <div className="absolute -top-2 -right-2 font-bold text-rose-600">{cartCount}</div>
                )}
              </Link>
            )}

            {!session ? (
              <>
                <Link to="/login" className="bg-pink-500 hover:bg-rose-800 px-6 py-2 font-semibold rounded">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-500 px-6 py-2 hover:bg-rose-800 hover:text-white font-semibold rounded">
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={() => setAccountMenu(!accountMenu)}>
                <img
                  src="/img/avatar.png"
                  onError={(e) => (e.target.style.display = "none")}
                  className="w-10 h-10 rounded-full"
                  alt="Avatar"
                />
                {accountMenu && (
                  <div className="flex flex-col w-28 h-30 shadow rounded bg-white absolute top-[4.2rem] right-16 z-10 border animate__animated animate__headShake">
                    <Link to="/profile" className="hover:bg-gray-100 text-left py-2 px-1">
                      <i className="ri-profile-fill"></i> My Profile
                    </Link>
                    <Link to="/cart" className="hover:bg-gray-100 text-left py-2 px-1">
                      <i className="ri-shopping-cart-fill"></i> Cart
                    </Link>
                    <button onClick={handleSignOut} className="hover:bg-gray-100 text-left py-2 px-1">
                      <i className="ri-logout-box-r-line"></i> Logout
                    </button>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      <div>{children || null}</div>



      {/* Mobile Sidebar */}
      <aside
        className="overflow-hidden bg-slate-700 md:hidden h-96 z-50 fixed top-0 left-0"
        style={{
          width: open ? 110 : 0,
          transition: "0.4s",
        }}
      >
        <div className="flex flex-col gap-3 py-24 text-white">
          {Menus.map((item, index) => (
            <button onClick={() => moblieLink(item.Link)} className="text-white" key={index}>
              {item.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default LayoutAll;
