import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";

const CancelRent = ({rent_id}) => {
    const [rent, setRent] = useState([])
    useEffect(()=>{
        fetch(`/rentals/${rent_id}`)
        .then(r=>r.json())
        .then(data=>(
            setRent(data)
        ))
    },[])
    let history = useHistory();
    function handleDelete(){
        fetch(`/rentals/${rent_id}`, {
            method:'DELETE',
        })
        .then(r=>{
            if (r.ok) {history.push(`/equipments/${rent.equipment_id}`)}
            else{
                history.go(0);
            }
        })
    }
  return (
    <div>
        <h1>Cancel this photoshoot?</h1>
            <h3 className='cancelRental'>Location: {rent.location}</h3>
            <h3 className='cancelRental'>Time: {rent.start_date_time}</h3>
            <h3 className='cancelRental'>Time: {rent.end_date_time}</h3>
            <button className="cancel" type='button' onClick={handleDelete}>Cancel</button>      
    </div>
  )
}

export default CancelRent
