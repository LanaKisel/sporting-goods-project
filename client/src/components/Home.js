import React, { useContext, useEffect, useState, useCallback } from 'react'
import { EquipmentsContext, EquipmentsProvider } from "./Context";
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
    const [categories, setCategories] = useState([])
    let history = useHistory();

    useEffect(() => {
        fetch('/categories')
            .then(r => r.json())
            .then(data => setCategories(data));
    }, [])

    const token = useSelector((state) => state.user.value.token);
    console.log('Home.js: token', token)

    const category= categories.map(category=><Link key={category.id} to={`/categories/${category.category_name}`}><h2>{category.category_name}</h2></Link>)
    return (
        <div>            
            <img className="homepage_photo" src={"https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=900&t=st=1719098303~exp=1719098903~hmac=5a6af19bfcc72113264d23e928921278b00ef10189549f728ac13f581b7a2b33"} alt={"Sport equipment"} />
            <h2 className='homepage_h2'>Ready to have some fun?</h2>
            <h3 className='homepage_h3'>Check out sport equipment that's available to rent</h3>
            <h3 className='cat_h3'>Categories:</h3>
            {category}
            <h2 className='homepage_h2'>Available equipment near you:</h2>
        </div>
    )
}

export default Home

