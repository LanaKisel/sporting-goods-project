import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useDeleteEquipmentMutation, useGetEquipmentByIdQuery } from '../services/sportingGoodsApi';
import { skipToken } from '@reduxjs/toolkit/query/react'

const CancelListing = ({ equipment_id }) => {
    let history = useHistory();
    const { data: equipment } = useGetEquipmentByIdQuery(equipment_id ?? skipToken)
    const [deleteEquipment, { isSuccess: deleteEquipmentIsSuccess, isError: deleteEquipmentIsError, data: deleteEquipmentResponse }] = useDeleteEquipmentMutation()

    useEffect(() => {
        if (deleteEquipmentIsSuccess) { history.push('/mylistings') }
        else if (deleteEquipmentIsError) {
            history.go(0)
        }
    }, [deleteEquipmentIsSuccess, deleteEquipmentIsError, deleteEquipmentResponse, history, equipment])

    function handleDelete() {
        deleteEquipment(equipment_id)
    }
    return (
        !equipment ? <></> :
            <div>
                <h1>Cancel this listing?</h1>
                <h3>Name: {equipment.name}</h3>
                <h3>Location: {equipment.location}</h3>
                <button className='cancel' type='button' onClick={handleDelete}>Cancel</button>
            </div>
    )
}

export default CancelListing
