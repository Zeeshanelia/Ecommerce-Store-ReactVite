import React from "react";
import LayoutAll from "./LayoutAll";

const ContactUs = () => {

    return <>
<LayoutAll>
        <header className="  w-12/12  shadow-lg  md:my-16">
            <img src="/img/Contact pic.jpg" className=" py-4 md:w-3/4 w-12/12 mx-auto " />
        </header>
        
        <div className="mb-5 md:w-7/12 md:mx-auto ">
            <form className="mt-0   space-y-4" >

                <div className="flex flex-col  " >
                    <label className="font-semibold  mb-2"> You Name</label>
                    <input type="name"
                        required name="password" placeholder="Juan elia" className="p-3 border border-gray-300 rounde" />
                    
                </div>


                <div className="flex flex-col  " >
                    <label className="font-semibold mb-1"> Email </label>
                    <input type="email"
                        required name="email" placeholder=" Enter Here Your Email id " className="p-3 border border-gray-300 rounded" />
                </div>

                <div className="flex flex-col  " >
                <label className="font-semibold mb-1"> Message </label>
                    <textarea className="p-6 border border-gray-300 rounded " name="" placeholder="Enter your message" id="" cols={5} >  </textarea>
                </div>


                <button className="py-2 px-4 w-full rounded bg-blue-600 text-white font-semibold hover:bg-rose-600"> Sign Up</button>
            </form>

        </div>
        </LayoutAll>
    </>

}
export default ContactUs