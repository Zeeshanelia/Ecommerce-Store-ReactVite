import React, { useState } from "react";
import LayoutAll from "./LayoutAll";
import { Link } from "react-router-dom";



const Login = () => {
    const [ passwordType , setPasswordType] = useState( 'password')

    return <>
        <LayoutAll>


            <div className="grid md:grid-cols-2 md:h-screen md:overflow-hidden animate__animated  aanimate__slideInDown">
                <img src="/img/signUP 5.jpg" className=" w-3/4 items-center ml-12  " />

                <div className="flex flex-col md:p-16 p-8  ">
                    
                    <p className=" text-gray-500 font-semibold mr-16">Now Log-In Here</p>



                    <form className="mt-8 space-y-6" >
                        <div className="flex flex-col  " >
                            <label className="font-semibold mb-1"> Email </label>
                            <input type="email"
                             required name="email" placeholder=" Enter Here Your Email id " className="p-3 border border-gray-300 rounded" />
                        </div>

                        <div className="flex flex-col relative  " >
                            <label className="font-semibold  mb-2"> Password </label>
                            <input type={passwordType}
                             required name="password" placeholder="********" className="p-3 border border-gray-300 rounde" />

                             
                            <button onClick={()=> setPasswordType( passwordType === "password" ?  'text' : "password")} className="absolute top-11 right-4 w-8 h-8 rounded-full hover:bg-blue-200 hover:text-blue-600 "> {
                                passwordType === "password " ? <i className=" ri-eye-line"></i>
                            :
                                <i className=" ri-eye-off-line"></i>  } </button>
                        </div>

                        <button className="py-3 px-8 rounded bg-blue-600 text-white font-semibold hover:bg-rose-600"> Login </button>
                    </form>
                    <span className="mt-2"> Don't have an account <Link to ='/signup' className="text-blue-400"> Register Now </Link></span>
                </div>
            </div>
        </LayoutAll>
    </>
}

export default Login