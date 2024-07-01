import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const MyProfile = () => {
  const token = useSelector((state) => state.user.value.token);

  useEffect(() => {
    fetch('/users/me', {
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      })
    })
      .then(r => r.json())
      .then(data => {
        dispatch(setUser(data))
      })
  }, [])

  const booking = bookings.map(b => <h2>Location {b.location} and Date {b.date}</h2>)

  return (
    <div>
      <h2>Details of your bookings</h2>
      {booking}


    </div>
  )
}

export default Bookings
