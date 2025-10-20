import React, { useState } from "react";
import LayoutAll from "./LayoutAll";
import { Link, useNavigate } from "react-router-dom";
import appConfig from "../util/firebase-config";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth(appConfig);

const SignUp = () => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const [signUp, setSignUp] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoader(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUp.email,
        signUp.password
      );

      // Update user profile with full name
      await updateProfile(auth.currentUser, { displayName: signUp.fullname });

      if (userCredential.user) {
        navigate("/"); // Redirect on success
      }
    } catch (err) {
      // Firebase-specific error messages
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already registered. Please login.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        default:
          setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <LayoutAll>
      <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen justify-center items-center mx-4 lg:mx-16">
        {/* Left Side - Image */}
        <img
          src="/img/sign-up.jpg"
          className="w-full h-auto max-w-md mx-auto mb-8 md:mb-0"
          alt="Sign Up"
        />

        {/* Right Side - Form */}
        <div className="flex flex-col md:mt-8 sm:items-center">
          <h1 className="font-bold text-2xl md:text-3xl">Create Account</h1>
          <p className="text-gray-500 text-center md:text-left">
            Join us and start shopping today!
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSignUp}>
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Full Name</label>
              <input
                onChange={handleChange}
                type="text"
                required
                name="fullname"
                value={signUp.fullname}
                placeholder="Enter your full name"
                className="p-2 border border-gray-300 w-full md:w-96 rounded"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Email</label>
              <input
                onChange={handleChange}
                type="email"
                required
                name="email"
                value={signUp.email}
                placeholder="Enter your email"
                className="p-2 border border-gray-300 w-full md:w-96 rounded"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="font-semibold mb-1">Password</label>
              <input
                onChange={handleChange}
                type={passwordType}
                required
                name="password"
                value={signUp.password}
                placeholder="********"
                className="p-2 border border-gray-300 w-full md:w-96 rounded"
              />
              <button
                type="button"
                onClick={() =>
                  setPasswordType((prev) =>
                    prev === "password" ? "text" : "password"
                  )
                }
                className="absolute bottom-2 right-4 md:right-8 text-xl text-gray-600"
              >
                {passwordType === "password" ? (
                  <i className="ri-eye-line"></i>
                ) : (
                  <i className="ri-eye-off-line"></i>
                )}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loader}
              className={`w-full p-2 rounded font-semibold ${
                loader
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition`}
            >
              {loader ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <span className="mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </span>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm w-full md:w-96">
              {error}
            </div>
          )}
        </div>
      </div>
    </LayoutAll>
  );
};

export default SignUp;
