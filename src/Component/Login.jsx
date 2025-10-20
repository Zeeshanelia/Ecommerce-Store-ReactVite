import React, { useState } from "react";
import LayoutAll from "./LayoutAll";
import { Link, useNavigate } from "react-router-dom";
import appConfig from "../util/firebase-config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(appConfig);

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [formInputType, setFormInputType] = useState({
    email: "",
    password: "",
  });

  const logIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        formInputType.email,
        formInputType.password
      );
      navigate("/");
    } catch (error) {
      setErrors(error.message);
    }
  };

  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    setFormInputType({
      ...formInputType,
      [name]: value,
    });
  };

  return (
    <LayoutAll>
      <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen md:overflow-hidden">
        {/* Left Image */}
        <img
          src="/img/signUP 5.jpg"
          className="w-full h-auto object-cover md:w-3/4 mx-auto md:ml-16"
          alt="Login"
        />

        {/* Right Side Form */}
        <div className="flex flex-col p-8 md:p-16 justify-center">
          <p className="text-gray-700 font-semibold text-lg md:text-xl mb-4">
            Log in to Shopping Club
          </p>

          <form className="mt-6 space-y-6" onSubmit={logIn}>
            {/* Email Input */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Email</label>
              <input
                type="email"
                onChange={HandleOnChange}
                required
                name="email"
                placeholder="Enter your email"
                className="p-3 border border-gray-300 rounded w-full md:w-[32rem]"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col relative">
              <label className="font-semibold mb-1">Password</label>
              <input
                type={passwordType}
                onChange={HandleOnChange}
                autoComplete="current-password"
                required
                name="password"
                placeholder="********"
                className="p-3 border border-gray-300 rounded w-full md:w-[32rem]"
              />
              <button
                type="button"
                onClick={() =>
                  setPasswordType(
                    passwordType === "password" ? "text" : "password"
                  )
                }
                className="absolute top-9 right-4 w-8 h-8 flex items-center justify-center hover:bg-blue-100 text-blue-600 rounded-full"
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
              className="py-3 px-8 rounded bg-blue-600 text-white font-semibold w-full md:w-auto hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <span className="mt-4 text-center md:text-left">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Register Now
            </Link>
          </span>

          {/* Error Display */}
          {errors && (
            <div className="bg-red-600 py-2 px-4 rounded text-white font-semibold mt-4 animate__animated animate__shakeX">
              {errors}
            </div>
          )}
        </div>
      </div>
    </LayoutAll>
  );
};

export default Login;
