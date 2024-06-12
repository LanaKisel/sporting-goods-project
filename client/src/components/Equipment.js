import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Equipment = () => {
    const [equipment, setEquipment] = useState('')
    let { id } = useParams()

    useEffect(()=>{
        fetch(`/equipments/${id}`)
        .then(r=>r.json())
        .then(data=>(
            setEquipment(data)
        ))
    }, [])

    function handleClick(){
        console.log("Button here")
    }

    return (
        <div>
            <h2>{equipment.name}</h2>
            <img className="equipment_pic" src={equipment.pictures}></img>
            <h2>Make: {equipment.make}</h2>
            <h2>Rent price : {equipment.rent_price}</h2>
            <button onClick={handleClick}>Click to rent</button>

        </div>
    )
}

export default Equipment
