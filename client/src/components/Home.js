import React, { useContext, useEffect, useState, useCallback } from 'react'
import { EquipmentsContext, EquipmentsProvider } from "./Context";
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {
    const [categories, setCategories] = useState([])
    let history = useHistory();
    useEffect(() => {
        fetch('/categories')
            .then(r => r.json())
            .then(data => setCategories(data))
    }, [])
   
    const category= categories.map(category=><Link key={category.id} to={`/categories/${category.category_name}`}><h2>{category.category_name}</h2></Link>)
    return (
        <div>
            <img className="homepage_photo" src={"https://media.istockphoto.com/id/949190756/photo/various-sport-equipments-on-grass.jpg?s=1024x1024&w=is&k=20&c=sMZL6tZpKAZihvQMPn5YnJaTMGh5bhrxsNJ_rJA0bWs="} alt={"Sport equipment"} />
            <h2 className='homepage_h2'>Ready for your next adventure?</h2>
            <h2 className='homepage_h2'>Check out sport equipment that's available to rent</h2>
            <h3>Categories:</h3>
            {category}
            <h2 className='homepage_h2'>Available equipment near you:</h2>
        </div>
    )
}

export default Home

