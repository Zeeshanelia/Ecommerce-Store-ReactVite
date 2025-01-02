import { useState } from "react"
import Layout from "./Layout"

const Order = () => {
    const [Order, setOrder] = useState([{
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    }
    ,
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    },
    {
        OrderId: '#!12345',
        CustomerName: 'Nadeem Danish',
        Email: 'Nadeem@yahoo.com',
        Mobile: '+123456789',
        Products: 'Printing Mug',
        Ammount: '2250',
        DateShipment: '101024',
        StatusOrder: 'Pening',
    }
])
    return (
        <>
            <Layout>
                <div>
                    <h1 className="text-xl font-semibold"> Orders </h1>
                    <div className="mt-2 ">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-rose-400 text-white">
                                    <th className="py-2">Order's iD</th>
                                    <th>Customer Name</th>
                                    <th>Email </th>
                                    <th>Mobile</th>
                                    <th>Product's</th>
                                    <th>Ammount</th>
                                    <th>Date Shipment</th>
                                    <th>Status Order</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    Order.map((item, index) => (
                                        <tr className="bg-white text-center" key={index}
                                        style={{ background : (index+1)%2 === 0 ? '#f1f5f9' : 'white'}}>
                                            <td className="py-2">{item.OrderId}</td>
                                            <td className="capitalize">{item.CustomerName}</td>
                                            <td>{item.Email}</td>
                                            <td>{item.Mobile}</td>
                                            <td className="capitalize">{item.Products}</td>
                                            <td> Rs. {item.Ammount.toLocaleString()} </td>
                                            <td>{item.DateShipment}</td>
                                            <td className="capitalize">
                                                <select className="border border-sky-800">
                                                    <option value="pending"> Pending</option>
                                                    <option value="processing"> Processing</option>
                                                    <option value="dispatch"> Dispatch</option>
                                                    <option value="returned"> Returned </option>
                                                </select>

                                            </td>
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
export default Order