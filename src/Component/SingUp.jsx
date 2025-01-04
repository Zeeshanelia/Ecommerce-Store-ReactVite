import React, { useState } from "react";
import LayoutAll from "./LayoutAll";


const SingUp = () => {
    const [ passwordType , setPasswordType] = useState( 'password')

    return <>
        <LayoutAll>


            <div className="grid md:grid-cols-2 md:h-screen   md:left-0 justify-center">
                <img src="/img/signUP 5.jpg" className=" w-3/4 items-center ml-12  " />

                <div className="flex flex-col md:mt-12 mb-5  sm:items-center ml-20  ">
                    <h1 className="font-bold text-xl"> New User </h1>
                    <p className=" text-gray-500  ">Create Id & Start to Shoping</p>

                    <form action="" className="mt-12 space-y-2">
                        <div className="flex flex-col " >
                            <label className="font-semibold mb-1"> Full Name  </label>
                            <input type="text"
                             required name="fullname" placeholder="Mr Zeeshan Elia" className="p-2 border border-gray-300 md:w-1/2   w-3/4 rounded" />
                        </div>

                        <div className="flex flex-col  " >
                            <label className="font-semibold mb-1"> Email </label>
                            <input type="email"
                             required name="email" placeholder=" Enter Here Your Email id " className="p-2 border border-gray-300 md:w-1/2   w-3/4 rounded" />
                        </div>

                        <div className="flex flex-col relative overflow-hidden " >
                            <label className="font-semibold  mb-2"> Password </label>
                            <input type={passwordType}
                             required name="password" placeholder="********" className="p-2 border border-gray-300 md:w-1/2   w-3/4 rounded" />
                            <button onClick={()=> setPasswordType( passwordType === "password" ?  'text' : "password")} className="absolute  bottom-2  md:left-72   left-48   md:w-6 rounded-full hover:bg-blue-300 hover:text-white-900  "> {
                                passwordType === "password " ? <i className=" ri-eye-line"></i>
                            :
                                <i className=" ri-eye-off-line"></i>  } </button>
                        </div>

                        <button className="bg-blue-500 font-semibold  rounded md:p-2 sm:p-6 w-3/4"> Sign Up</button>
                    </form>
                </div>
            </div>
        </LayoutAll>
    </>
}

export default SingUp