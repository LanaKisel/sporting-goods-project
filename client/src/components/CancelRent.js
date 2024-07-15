import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";

import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetRentalByIdQuery, useDeleteRentalMutation } from "../services/sportingGoodsApi"

const CancelRent = ({ rent_id }) => {
    let history = useHistory();

    const { data: rent } = useGetRentalByIdQuery(rent_id ?? skipToken)
    const [deleteRental, { isSuccess: deleteRentalIsSuccess, isError: deleteRentalIsError, data: deleteRentalResponse }] = useDeleteRentalMutation()

    useEffect(() => {
        if (deleteRentalIsSuccess) { history.push(`/equipments/${rent.equipment_id}`) }
        else if (deleteRentalIsError) {
            history.go(0);
        }
    }, [deleteRentalIsSuccess, deleteRentalIsError, deleteRentalResponse, history, rent])

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
