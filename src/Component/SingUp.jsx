import React, { useState } from "react";
import LayoutAll from "./LayoutAll";
import { Link } from "react-router-dom";
Link
import appConfig from "../util/firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(appConfig)
const SingUp = () => {
    const [passwordType, setPasswordType] = useState('password')
    const [SignUp, setSignUp] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const Signup = async (e) => {
        try {
            e.preventDefault()
            const userr = createUserWithEmailAndPassword(auth, SignUp.email, SignUp.password)
            console.log(userr)
        }
        catch (err ) 
        {
            console.log(err)
        }

    }

    const HandleChange = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setSignUp({
            ...SignUp,
            [name]: value
        })
    }

    return <>
        <LayoutAll>
            <div className="grid md:grid-cols-2 overflow-heddin md:h-screen mr-16  lg:left-0 justify-center animate__animated  animate__pulse">
                <img src="/img/signUP 5.jpg" className=" w-3/4 items-center ml-12  " />

                <div className="flex flex-col md:mt-12 mb-5  sm:items-center ml-20  ">
                    <h1 className="font-bold text-xl"> New User </h1>
                    {/* {JSON.stringify(SignUp)} */}
                    <p className=" text-gray-500  ">Create Id & Start to Shoping</p>



                    <form className="mt-12 space-y-2 mr-16" onSubmit={Signup} >
                        <div className="flex flex-col   " >
                            <label className="font-semibold mb-1"> Full Name  </label>
                            <input onChange={HandleChange} type="text"
                                required name="fullname" placeholder="Mr Zeeshan Elia" className="p-2 border border-gray-300 md:w-96 w-44 rounded" />
                        </div>

                        <div className="flex flex-col  " >
                            <label className="font-semibold mb-1"> Email </label>
                            <input onChange={HandleChange} type="email"
                                required name="email" placeholder=" Enter Here Your Email id " className="p-2 border border-gray-300 md:w-full  w-44 rounded" />
                        </div>

                        <div className="flex flex-col relative overflow-hidden ">
                            <label className="font-semibold  mb-2"> Password </label>
                            <input onChange={HandleChange}
                                autoComplete="current-password"
                                type={passwordType}
                                required name="password"
                                placeholder="********"
                                className="p-2 border border-gray-300 md:w-full   w-44 rounded" />

                            <button onClick={() => setPasswordType(passwordType === "password" ? 'text' : "password")} className="absolute  bottom-2  md:left-80   left-36   md:w-6 rounded-full hover:bg-blue-300 hover:text-white-900  "> {
                                passwordType === "password" ? <i className="ri-eye-line"></i>
                                    :
                                    <i className="ri-eye-off-line"></i>} </button>
                        </div>

                        <button className="bg-blue-500 font-semibold  rounded md:p-2 w-44 md:w-full"> Sign Up</button>
                    </form>

                    <span className="mt-2"> have an account <Link to='/Login' className="text-blue-400 font-semibold "> Login </Link></span>

                </div>
            </div>
        </LayoutAll>
    </>
}

export default SingUp