import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

const UpdateRent = ({ rent_id }) => {
    let history = useHistory();
    const formSchema = Yup.object().shape({
        start_date: Yup.date().min(new Date(), 'Rental date must be in the future.'),
        end_date: Yup.date().min(new Date(), 'Rental date must be in the future.')
    });

    const formik = useFormik({
        initialValues: {
            location: '',
            start_date: '',
            end_date: ''
        },
        validationSchema: formSchema,
        onSubmit: values => {
            let formdata = structuredClone(formik.values) // copying all values to change datetime without affecting the datetime input
            formdata.start_date = `${formdata.start_date.getUTCFullYear()}-${formdata.start_date.getUTCMonth() + 1}-${formdata.start_date.getUTCDate()}`
            formdata.end_date = `${formdata.end_date.getUTCFullYear()}-${formdata.end_date.getUTCMonth() + 1}-${formdata.end_date.getUTCDate()}`
            // fetch(process.env.REACT_APP_API_URI + `/photoshoots/${photoshoot_id}`, {
            fetch(`/rentals/${rent_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata)
            })
                .then(r => r.json())
                .then(data => {
                    if (!data.errors && !!data.id) {
                        history.go(0);
                    } else {
                        alert('Rent data has no id or has errors')
                    }
                })
        }
    })

    useEffect(() => {
        fetch(`/rentals/${rent_id}`)
            .then(r => r.json())
            .then(data => {
                formik.setFieldValue('start_date', new Date(data.start_date), false);
                formik.setFieldValue('end_date', new Date(data.end_date), false);
            })
    // eslint-disable-next-line
    }, [rent_id])

    const onChange = (dates) => {
        const [start, end] = dates;
        formik.setFieldValue('start_date', start)
        formik.setFieldValue('end_date', end)
    };
    return (
        <div>
            <h1>Update photoshoot</h1>
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
        </div>
    )
}

export default UpdateRent
