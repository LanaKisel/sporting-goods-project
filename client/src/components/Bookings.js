import React, {useState, useEffect} from 'react'

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    useEffect(()=>{

        fetch('/rentals')
        .then(r=>r.json())
        .then(data=>setBookings(data))
    }, [])

    const booking = bookings.map(b=><h2>Location {b.location} and Date {b.date}</h2>)

  return (
    <div>
        <h2>Details of your bookings</h2>
        {booking}

      
    </div>
  )
}

export default Bookings
