// src/Component/Page/Success.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-50">
      <h1 className="text-4xl text-green-600 font-bold mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700">
        Thank you for your purchase. Redirecting to home...
      </p>
    </div>
  );
};

export default Success;
