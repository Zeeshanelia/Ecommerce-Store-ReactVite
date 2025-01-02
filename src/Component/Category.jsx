import { useState } from 'react';
import LayoutAll from './LayoutAll';

const Category = () => {
    const [category, setCategory] = useState([
        {
            title: 'Electronics'
        },
        {
            title: 'Fashion'
        },
        {
            title: 'Smartphones'
        },
        {
            title: 'Furnitures'
        },
        {
            title: 'Men`s'
        },
        {
            title: 'Women`s'
        },
        {
            title: 'Electronics'
        },
        {
            title: 'Electronics'
        }
    ]);
    return (
        <>
        <LayoutAll Category={category}/>
        </>
    );
};

export default Category;