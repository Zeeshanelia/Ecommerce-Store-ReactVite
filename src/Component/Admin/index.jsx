import { useNavigate } from "react-router-dom"


const Admin = () => {

    return (
        <>
            <div className="bg-gray-100 h-screen flex justify-center items-center">
                <img src="/img/Admin (2).svg" className="w-80 h-80" />
                
                
                <div >
                    <h2 className="mb-4 font-semibold text-4xl">  wellcom admin sb  </h2>
                    <form className="flex flex-col">
                        <input type="text" className="w-[450px] border p-4 bg-white rounded-md"
                            placeholder="Admin Secret" />
                            <button className="p-4 bg-violet-500 w-fit rounded-md mt-4 "> Access Now </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Admin