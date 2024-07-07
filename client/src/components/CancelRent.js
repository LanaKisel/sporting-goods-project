import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";

import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetRentalByIdQuery, useDeleteRentalByIdMutation } from "../services/sportingGoodsApi"

const CancelRent = ({ rent_id }) => {
    console.log(rent_id)
    const { data: rent } = useGetRentalByIdQuery(rent_id ?? skipToken)
    const [deleteRental, { isSuccess: deleteRentalIsSuccess, isError: deleteRentalIsError, data: deleteRentalResponse }] = useDeleteRentalByIdMutation()

    useEffect(() => {
        console.log("CancelRent.js - deleteRentalResponse", deleteRentalResponse)
        if (deleteRentalIsSuccess) { history.push(`/equipments/${rent.equipment_id}`) }
        else if (deleteRentalIsError) {
            history.go(0);
        }
    }, [deleteRentalIsSuccess, deleteRentalIsError, deleteRentalResponse])

    let history = useHistory();
    function handleDelete() {
        deleteRental(rent_id)
    }
    return (
        !rent ? <></> :
            <div>
                <h1>Cancel this photoshoot?</h1>
                <h3 className='cancelRental'>Location: {rent.location}</h3>
                <h3 className='cancelRental'>Date: {rent.start_date} - {rent.end_date}</h3>
                <button className="cancel" type='button' onClick={handleDelete}>Cancel</button>
            </div>
    )
}

export default CancelRent
