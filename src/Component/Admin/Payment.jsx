import { useState } from "react"
import Layout from "./Layout"

const Payment = () => {
    const [Payments, setPayments] = useState([{

        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        DateShipment: '21-12-2024',
        Ammount: 20500
    },
    {


        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        DateShipment: '21-12-2024',
        Ammount: 20500
    },
    {

        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        DateShipment: '21-12-2024',
        Ammount: 20500
    },
   
  

    ])
    return (
        <>
            <Layout>
                <div className="px-0 py-0 mb-0" >
                    <h1 className="text-xl font-semibold"> Payment's </h1>
                    <div className=" ">
                        <table className="w-full ">
                            <thead>
                                <tr className="bg-rose-400 w-full text-white h-14">
                                    <th>Customer Name</th>
                                    <th>Email </th>
                                    <th>Mobile</th>
                                    <th>Date Shipment</th>
                                    <th>Ammount </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    Payments.map((item, index) => (
                                        <tr className="bg-white text-center"
                                            key={index}
                                            style={{ background: (index + 1) % 2 === 0 ? '#f1f5f9' : 'white' }}>

                                            <td className="capitalize px-2 py-3">
                                                <div className="flex gap-3 items-center ">
                                                    <img src="/img/avatar.png" className="w-8 h-8 rounded-full " />
                                                    <div className="flex  flex-col justify-center ">

                                                        {item.CustomerName}
                                                        <small className="text-gray-400"> {item.DateShipment}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.Email}</td>
                                            <td>{item.Mobile}</td>
                                            <td> Rs. {item.Ammount.toLocaleString()} </td>
                                            <td> {item.DateShipment} </td>



                                        </tr>
                                    ))}
                            </tbody>


                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export default Payment