import LayoutAll from "./LayoutAll";
import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import appConfig from "../util/firebase-config";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const auth = getAuth(appConfig);

const Login = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const [formInputType, setFormInputType] = useState({
        email: "",
        password: ""
    });

    const logIn = async (e) => {
        try {
            e.preventDefault();
            await signInWithEmailAndPassword(auth, formInputType.email, formInputType.password);
            navigate('/');
        } catch (error) {
            setErrors(error.message);
        }
    };

    const HandleOnChange = (e) => {
        const input = e.target;
        const name = input.name;
        const value = input.value;
        setFormInputType({
            ...formInputType,
            [name]: value,
        });
    };

    return (
        <LayoutAll>
            <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen md:overflow-hidden">
                <img src="/img/signUP 5.jpg" className="w-full h-auto object-cover md:w-3/4 mx-auto mt-4 md:ml-10" alt="Login Image" />

                <div className="flex flex-col   justify-center">
                    <p className=" font-semibold text-lg md:text-xl ">Log in to Shopping Club</p>

                    <form className="mt-4 space-y-6" onSubmit={logIn}>
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

                        <div className="flex flex-col relative">
                            <label className="font-semibold mb-2">Password</label>
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
                                onClick={() => setPasswordType(passwordType === "password" ? 'text' : "password")}
                                className="absolute top-9 right-4 md:right-[7rem] w-11 h-11 rounded-full hover:bg-blue-200 hover:text-blue-600"
                            >
                                { passwordType === "password" ? <i className="ri-eye-line"></i> : <i className="ri-eye-off-line"></i>  }
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="py-3 px-8 rounded bg-blue-600 text-white font-semibold w-full md:w-auto hover:bg-rose-600"
                        >
                            Login
                        </button>
                    </form>

                    <span className="mt-2 text-center md:text-left">
                        Don't have an account ?
                         <span>

                            
                        <Link to="/signup" className="text-blue-400 hover:text-blue-500">
                             Register Now
                        </Link>
                         </span>
                    </span>

                    {errors && (
                        <div className="bg-red-700 py-2 px-4 rounded text-white font-semibold mt-4 animate__animated animate__bounce">
                            {errors}
                        </div>
                    )}
                </div>
            </div>
        </LayoutAll>
    );
};

export default Login;
