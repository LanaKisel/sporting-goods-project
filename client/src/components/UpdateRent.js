import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { Spin } from 'antd';
import {useUpdateRentalMutation, useGetRentalsQuery, useGetRentalByIdQuery}  from "../services/sportingGoodsApi"
import { skipToken } from '@reduxjs/toolkit/query/react'
const UpdateRent = ({ rent_id }) => {
    let history = useHistory();
    const [updateRent, {isLoading: updateRentIsLoading}] = useUpdateRentalMutation()
    const {data: rent, isLoading: rentIsLoading } = useGetRentalByIdQuery(rent_id ?? skipToken)
    const formSchema = Yup.object().shape({
        start_date: Yup.date().min(new Date(), 'Rental date must be in the future.'),
        end_date: Yup.date().min(new Date(), 'Rental date must be in the future.')
    });

    const formik = useFormik({
        initialValues: {
            start_date: '',
            end_date: ''
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            let formdata = structuredClone(formik.values) // copying all values to change datetime without affecting the datetime input
            formdata.start_date = `${formdata.start_date.getUTCFullYear()}-${formdata.start_date.getUTCMonth() + 1}-${formdata.start_date.getUTCDate()}`
            formdata.end_date = `${formdata.end_date.getUTCFullYear()}-${formdata.end_date.getUTCMonth() + 1}-${formdata.end_date.getUTCDate()}`
            
            try {
                const payload = await updateRent({ rental_id: rent_id, body: formdata }).unwrap();
                if (!payload.errors && !!payload.id) {
                    history.go(0)
                } else {
                    alert('Listing data has no id or has errors')
                }
            } catch (error) {
                alert('Listing data has errors')
            }
            
        }})    
            
    useEffect(() => {
        if (!!rent) {
            formik.setFieldValue('start_date', new Date(rent.start_date), true);
            formik.setFieldValue('end_date', new Date(rent.end_date), true);  
        }
    }, [rent])

    const onChange = (dates) => {
        const [start, end] = dates;
        formik.setFieldValue('start_date', start)
        formik.setFieldValue('end_date', end)
    }
    return (
        <div>
            <h1>Update Rental</h1>
            <Spin spinning={rentIsLoading}>        
            <form onSubmit={formik.handleSubmit}>
                <label>Dates:</label>
                <div>{(formik.errors.start_date) ? <p style={{ color: 'red' }}>{formik.errors.start_date}</p> : null}</div>
                <div>{(formik.errors.end_date) ? <p style={{ color: 'red' }}>{formik.errors.end_date}</p> : null}</div>
                <DatePicker
                    selected={formik.values.start_date}
                    onChange={onChange}
                    startDate={formik.values.start_date}
                    endDate={formik.values.end_date}
                    selectsRange
                    inline
                />
                <input type="submit"></input>
            </form>
            </Spin>
        </div>
    )
}

export default UpdateRent
