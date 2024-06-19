import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
const RentEquipment = ({ equipment_id }) => {
    //const [user, setUser] = useState({ name: "", id: -1 });
    let history = useHistory();
    const formSchema = Yup.object().shape({
        location: Yup.string().required("Location can't be empty").max(60),
        start_date: Yup.date().min(new Date(), 'Rent date must be in the future.'),
        end_date: Yup.date().min(new Date(), 'Rent date must be in the future.')
    })
    const formik = useFormik({
        initialValues: {
            user_id: 1,
            equipment_id: equipment_id,
            location: '',
            start_date: '',
            end_date:''
        },
        validationSchema: formSchema,
        onSubmit: values => {
            // copying all values to change datetime without affecting the datetime input
            let formdata = structuredClone(formik.values)
            formdata.start_date =`${formdata.start_date.getUTCFullYear()}-${formdata.start_date.getUTCMonth()+1}-${formdata.start_date.getUTCDate()}`
            formdata.end_date = `${formdata.end_date.getUTCFullYear()}-${formdata.end_date.getUTCMonth()+1}-${formdata.end_date.getUTCDate()}`
            console.log('dates', formdata.start_date, formdata.end_date)
            formdata.user_id = 1;
            //fetch(process.env.REACT_APP_API_URI + "/rentals", {
            fetch('/rentals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata)
            })
                .then(r => r.json())
                .then(data => {
                    if (!data.errors & !!data.id) {
                        history.push(`/rentals/${data.id}`)
                    } else {
                        alert('Rent data has no id or has errors')
                    }
                })
        }

    })

    const onChange = (dates) => {
        const [start, end] = dates;
        formik.setFieldValue('start_date', start)
        formik.setFieldValue('end_date', end)
        
    };

    const rentForm = () => {
        return (<form onSubmit={formik.handleSubmit}>
            <p>Hi user</p>
            <p>Please enter location, date and time to rent this equipment</p>
            <label>Location:</label>
            <div>{(formik.errors.location) ? <p style={{ color: 'red' }}>{formik.errors.location}</p> : null}</div>
            <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange}></input>
            <br />
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
