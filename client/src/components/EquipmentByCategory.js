import React, { useContext, useState, useEffect } from 'react'
import { EquipmentsContext, EquipmentsProvider } from "./Context";
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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

    const equipment = equipments.map(e => (
        <div key={e.id}>
            <img className="equipment_pic" src={e.pictures}></img>,
            <Link to={`/equipments/${e.id}`}>{e.name}, {e.make}</Link>
            <br />
            <br />
        </div>

    ))

    return (
        <div>
            <h2>{category_name}</h2>
            {equipment}
        </div>
    )
}

export default EquipmentByCategory
