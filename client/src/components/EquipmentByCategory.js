import React, { useContext, useState, useEffect } from 'react'
import { EquipmentsContext, EquipmentsProvider } from "./Context";
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { useSelector, useDispatch } from 'react-redux'

const EquipmentByCategory = () => {
    const [displayedCategory, setDisplayedCategory] = useState("")
    const [categoryId, setCategoryId] = useState(-1)
    const [equipments, setEquipments] = useState([])

    let { category_name } = useParams()
    useEffect(() => {
        fetch(`/categories/${category_name}`)
            .then(r => r.json())
            .then(data => (
                setCategoryId(data.id),
                setDisplayedCategory(data)
            ))
    }, [])

    useEffect(() => {
        if (categoryId !== -1) {
            fetch(`/equipments/category/${categoryId}`)
                .then(r => r.json())
                .then(data => (
                    setEquipments(data)
                ))
        }

    }, [categoryId])

    const token = useSelector((state) => state.user.value.token);
    useEffect(() => {
        if (token !== undefined) {
            console.log('EquipmentByCategory.js: token', token)
        }
    }, [token])

    const equipment = equipments.map(e => (
        <div key={e.id}>
            <img className="equipment_pic" src={e.pictures}></img>
            <Link style={{marginLeft: 300}}to={`/equipments/${e.id}`}>{e.name}</Link>
            <br />
            <br />
        </div>

    ))

    return (
        <div>
            <h2 style = {{textAlign:"center"}}>{category_name}</h2>
            {equipment}
        </div>
    )
}

export default EquipmentByCategory
