import { useState } from 'react'
import Layout from './Layout'

const AdminProducts = () => {
    const [Products, setProducts] = useState([
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description: 'Printed trouser with excellent stuff',
            img: "/img/trouser1.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser2.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser3.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser4.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser5.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser6.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser7.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser8.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser19.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Discription : 'Printed trouser with excellent stuff',
            img: "/img/trouser18.jpeg"
        },
        {
            Title: 'trouser',
            Price: '1150',
            Discount: '20%',
            Description : 'Printed trouser with excellent stuff',
            img: "/img/trouser17.jpeg"
        }

    ])

    return (
        <>
            <Layout>
                <h1 className='text-4xl semi-bold '>Products</h1>
                <div className='grid md:grid-cols-5 gap-3'>
                    {
                        Products.map((items, index) => (
                            <div key={index} className=' rounded-md bg-white shadow-lg '>
                                <img src={items.img} className='w-full h-[210px] object-cover rounded-t-md ' />


                                <div className='p-1 m-0'>
                                    <h1 className='font-semibold text-md capitalize '>{items.Title}</h1> 
                                    <p className='text-gray-400'> {items.Description  }</p>
                                    <div className='flex gap-3'>
                                        
                                    <p>Rs.{items.Price - (items.Price * parseFloat(items.Discount) / 100)}</p>
                                        <del>Rs.{items.Price}</del>
                                        <label className='text-gray-500'> {items.Discount} off </label>
                                    </div>
                                    </div>

                            </div>


                        ))
                    }
                </div>

            </Layout>
        </>
    )
}
export default AdminProducts
