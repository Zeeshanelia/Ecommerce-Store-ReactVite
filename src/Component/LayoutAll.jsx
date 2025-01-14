import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import appConfig from "../util/firebase-config";

const auth = getAuth(appConfig);

const LayoutAll = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [accountMenu, setAccountMenu] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state to track the loading process

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user); // Set session if user is authenticated
      } else {
        setSession(null); // Set session to null if no user is authenticated
      }
      setLoading(false); // Set loading to false once the auth state is resolved
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSession(null); // Update session state after sign out
      navigate('/login'); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const Menus = [
    { label: 'Home', Link: '/' },
    { label: 'Products', Link: '/products' },
    { label: 'Category', Link: '/category' },
    { label: 'Contact Us', Link: '/contact-us' },
  ];

  const moblieLink = (href) => {
    setOpen(false);
    navigate(href);
  };

  // Show loading spinner until session is determined (while loading)
        if ( loading ) {
      return (
       <div className="bg-gray-100 h-full fixed top-0 left-0 w-full flex justify-center items-center">
         <span className="relative flex h-6 w-6">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400        opacity-75"></span>
           <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
         </span>
        </div>
     );
   }

  return (
    <>
      <nav className="bg-slate-400 p-2 shadow-lg sticky top-0 break-words">
        <div className="flex justify-between gap-1 mr-10 items-center">
          <button className="flex items-center gap-2 ml-9">
            <img src="/img/shopping.png" className="w-14 items-center" alt="Shopping" />
            <h2 className="text-md">Shopping Club</h2>
          </button>

          {/* For Mobile Nav Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <i className="ri-menu-search-line text-3xl"></i>
          </button>

          <div className="md:flex hidden gap-5">
            {Menus.map((item, index) => (
              <Link key={index} to={item.Link} className="px-2 py-2 text-white p-4 hover:bg-rose-800 hover:text-white justify-end">
                {item.label}
              </Link>
            ))}

            {!session ? (
              <>
                <Link to="/login" className="bg-pink-500 hover:bg-rose-800 px-6 py-2 items-center font-semibold rounded">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-500 px-6 py-2 hover:bg-rose-800 hover:text-white items-center font-semibold rounded">
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={() => setAccountMenu(!accountMenu)}>
                <img src="/img/avatar.png" className="w-10 h-10 rounded-full" alt="Avatar" />
                {accountMenu && (
                  <div className="flex flex-col w-28 h-30 shadow rounded bg-white-900 absolute top-[4.2rem] right-16 z-0 border animate__animated animate__headShake">
                    <Link to="/profile" className="hover:bg-gray-100 sm:hover:bg-gray-100 w-full text-left py-2 px-1">
                      <i className="ri-profile-fill"></i> My Profile
                    </Link>
                    <Link to="/cart" className="hover:bg-gray-100 sm:hover:bg-gray-100 w-full text-left py-2 px-1">
                      <i className="ri-shopping-cart-fill"></i> Cart
                    </Link>
                    <button onClick={handleSignOut} className="hover:bg-gray-100 sm:hover:bg-gray-100 w-full text-left py-2 px-1">
                      <i className="ri-logout-box-r-line"></i> Logout
                    </button>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      <div>{children}</div>

      <footer className="bg-orange-200 md:h-64">
        <div className="md:w-10/12 mx-auto px-5 grid md:grid-cols-4 md:gap-3">
          <div>
            <h1 className="text-2xl m-3 mt-4">Product Detail</h1>
            <p className="text-md mb-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, cumque aliquam, possimus non ut s!</p>
            <img src="/img/shopping.png" className="w-20 items-center" alt="Shopping" />
          </div>

          <div className="list-none">
            <h1 className="text-2xl mt-4">Product Detail</h1>
            {Menus.map((item, index) => (
              <li key={index}>
                <Link to={item.Link} className="px-1 hover:bg-rose-800 hover:text-white list-none">
                  {item.label}
                </Link>
              </li>
            ))}
          </div>

          <div className="list-none">
            <h1 className="text-2xl mt-4">Follow Us</h1>
            <ul>
              <li className="flex flex-col px-1 w-24">
                <Link className="hover:bg-rose-800 hover:text-white" to="/">Facebook</Link>
                <Link className="hover:bg-rose-800 hover:text-white" to="/">Instagram</Link>
                <Link className="hover:bg-rose-800 hover:text-white" to="/">Twitter</Link>
                <Link className="hover:bg-rose-800 hover:text-white" to="/">LinkedIn</Link>
                <Link className="hover:bg-rose-800 hover:text-white" to="/">Dailymotion</Link>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-2xl mt-4">Contact Us</h1>
            <form className="space-y-2">
              <input required type="text" name="fullname" placeholder="Enter Your Name" className="bg-white w-full rounded p-1" />
              <input required type="text" name="email" placeholder="Enter Email Here" className="bg-white w-full rounded p-1" />
              <textarea name="message" placeholder="Type Message Here" className="bg-white w-full rounded" rows={3}></textarea>
              <button className="p-2 bg-slate-400 rounded justify-center items-center font-semibold">Submit</button>
            </form>
          </div>
        </div>
      </footer>

      <aside
        className="overflow-hidden bg-slate-700 md:hidden h-96 z-50 fixed top-0 left-0 w-[110px]"
        style={{
          width: open ? 110 : 0,
          transition: "0.4s",
        }}
      >
        <div className="flex flex-col gap-1 py-24 gap-3 text-white">
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
