import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux'

import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetEquipmentByIdQuery, useGetCurrentUserQuery, useCreateRentalMutation } from "../services/sportingGoodsApi"

const RentEquipment = ({ equipment_id }) => {
    let history = useHistory();

    const { data: equipment } = useGetEquipmentByIdQuery(equipment_id ?? skipToken)
    const [createRental, { isSuccess: createRentalIsSuccess, isError: createRentalIsError, data: createRentalResponse }] = useCreateRentalMutation()
    const token = useSelector((state) => state.user.value.token)
    const { data: currUser } = useGetCurrentUserQuery(token ?? skipToken)

    useEffect(() => {
        if (createRentalIsError) {
            alert('Rent data has no id or has errors')
        } else if (createRentalIsSuccess && !!createRentalResponse) {
            history.push(`/rentals/${createRentalResponse.id}`)
        }
    }, [createRentalResponse, createRentalIsSuccess, createRentalIsError, history])

    const formSchema = Yup.object().shape({
        start_date: Yup
            .date()
            .required('Rent Start Date must be specified')
            .min(new Date(), 'Rent date must be in the future.'),
        end_date: Yup
            .date()
            .required('Rent Date must be specified')
            .min(new Date(), 'Rent date must be in the future.'),
    })
    const formik = useFormik({
        initialValues: {
            equipment_id: equipment_id,
            start_date: '',
            end_date: ''
        },
        validationSchema: formSchema,
        onSubmit: values => {
            // copying all values to change datetime without affecting the datetime input
            let formdata = structuredClone(formik.values)
            formdata.start_date = `${formdata.start_date.getUTCFullYear()}-${formdata.start_date.getUTCMonth() + 1}-${formdata.start_date.getUTCDate()}`
            formdata.end_date = `${formdata.end_date.getUTCFullYear()}-${formdata.end_date.getUTCMonth() + 1}-${formdata.end_date.getUTCDate()}`
            console.log('dates', formdata.start_date, formdata.end_date)
            createRental(formdata);
        }
    })

    const onChange = (dates) => {
        const [start, end] = dates;
        formik.setFieldValue('start_date', start)
        formik.setFieldValue('end_date', end)
    };

    const rentForm = () => {
        return (<form onSubmit={formik.handleSubmit}>
            <p>Hi {currUser?.name},</p>
            <p>Please enter date and time to rent '{!!equipment && equipment.name}'</p>
            <label>Dates:</label>
            <div>{(formik.errors.start_date) ? <p style={{ color: 'red' }}>{formik.errors.start_date}</p> : null}</div>
            <div>{(formik.errors.end_date) ? <p style={{ color: 'red' }}>{formik.errors.end_date}</p> : null}</div>
            <DatePicker
                selected={formik.values.start_date}
                onChange={onChange}
                startDate={formik.values.start_date}
                endDate={formik.values.end_date}
                selectsRange
            />
            <input type="submit"></input>
        </form>)
    }
    return (
        <div>
            <h1>Rent equipment</h1>
            {rentForm()}
        </div>
    )
}

export default RentEquipment
