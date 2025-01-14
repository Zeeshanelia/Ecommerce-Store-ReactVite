import LayoutAll from "./LayoutAll"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import appConfig from "../util/firebase-config"
import { useNavigate } from "react-router-dom"

const auth = getAuth(appConfig)

const Profile = () => {
    const [session, setSession] = useState(null)
    const [formVal, setFormVal] = useState({
        fullname: "",
        email: "",
        mobile: "",
        adress: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    })

    const navigate = useNavigate()

    const HandleOnChange = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setFormVal({
            ...formVal,
            [name]: value
        })
    }

     const HandlePicChange = (e) => {
        const input = e.target
        const file = input.files[0] // Correct property is 'files'
        console.log(file)

    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            } else {
                setSession(false)
                navigate("/login")
            }
        })
    }, [navigate])

    // Show loading spinner until session is determined (while loading)
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

    return (
        <LayoutAll>
            <div className='mx-auto md:my-16 shadow-lg rounded-md p-8 md:w-7/12 border'>
                <div className='flex gap-3'>
                    <i className="ri-user-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Profile</h1>
                </div>

                <hr className='my-6' />

                <div className='w-24 h-24 mx-auto relative mb-2'>
                    <img src="/img/avatar.png" className="rounded-full w-24 h-24" />
                    <input type="file" accept="image/*" className='opacity-0 absolute top-0 left-0 w-full h-full' onChange={HandlePicChange}/>
                </div>

                <form className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Fullname</label>
                        <input
                            onChange={HandleOnChange}
                            required
                            name="fullname"
                            className='p-2 rounded border border-gray-300'
                            value={session?.displayName || ''}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Email</label>
                        <input
                            onChange={HandleOnChange}
                            required
                            name="email"
                            type="email"
                            className='p-2 rounded border border-gray-300'
                            value={session?.email || ''}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Mobile</label>
                        <input
                            onChange={HandleOnChange}
                            required
                            name="mobile"
                            type="number"
                            className='p-2 rounded border border-gray-300'
                            value={formVal.mobile}
                        />
                    </div>

                    <div />

                    <div className='flex flex-col gap-2 col-span-2'>
                        <label className='text-lg font-semibold'>Area/Street/Vill</label>
                        <input
                            onChange={HandleOnChange}
                            required
                            name="address"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={formVal.adress}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>City</label>
                        <input
                            onChange={HandleOnChange}
                            required
                            name="city"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={formVal.city}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>State</label>
                        <input
                            onChange={HandleOnChange}
                            required
                            name="state"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={formVal.state}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Country</label>
                        <input
                            onChange={HandleOnChange}
                            required
                            name="country"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={formVal.country}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Pincode</label>
                        <input
                            onChange={HandleOnChange}
                            required
                            name="pincode"
                            type="number"
                            className='p-2 rounded border border-gray-300'
                            value={formVal.pincode}
                        />
                    </div>
                    <button className='px-4 py-2 bg-rose-600 text-white rounded w-fit hover:bg-green-600'>
                        <i className="ri-save-line mr-2"></i>
                        Save
                    </button>
                </form>
            </div>
        </LayoutAll>
    )
}

export default Profile
