<<<<<<< HEAD
import { useEffect, useState } from "react";
import firebaseAppConfig from "../../util/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Outlet, Navigate, useLocation } from "react-router-dom";

const auth = getAuth(firebaseAppConfig);

const PreSignLog = () => {
  const [session, setSession] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user ? user : false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show loading spinner while checking authentication
  if (session === null) {
    return (
      <div className="bg-gray-100 h-full fixed top-0 left-0 w-full flex justify-center items-center">
        <span className="relative flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
        </span>
      </div>
    );
  }

  // Redirect to dashboard if visiting /admin root
  if (location.pathname === "/admin" || location.pathname === "/admin/") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Redirect to login if user is not authenticated
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Render nested admin routes
  return <Outlet />;
};

export default PreSignLog;
=======
import { useEffect, useState } from "react"
import firebaseAppConfig from "../../util/firebase-config"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Navigate, Outlet } from "react-router-dom"
const auth = getAuth(firebaseAppConfig)

const PreSignLog = ()=>{
    const [session, setSession] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user)
            {
                setSession(user)
            }
            else {
                setSession(false)
            }
        })
    }, [])

    if(session === null)
    return (
        <div className="bg-gray-100 h-full fixed top-0 left-0 w-full flex justify-center items-center">
            <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
            </span>
        </div>
    )

    if(session)
    return <Navigate to="/" />


    return <Outlet />
}

export default PreSignLog
>>>>>>> 43360bff556c7beeeac6c9aab57f55638a3d1a5d
