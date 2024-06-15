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
        date_time: Yup.date().min(new Date(), 'Rent date must be in the future.')
    })
    const formik = useFormik({
        initialValues: {
            user_id: 1,
            equipment_id: equipment_id,
            location: '',
            date_time: '',
        },
        validationSchema: formSchema,
        onSubmit: values => {
            // copying all values to change datetime without affecting the datetime input
            let formdata = structuredClone(formik.values)
            formdata.date_time = formdata.date_time.toISOString().replace('T', ' ').split(".")[0]
            formdata.user_id = 1;
            //fetch(process.env.REACT_APP_API_URI + "/rents", {
            fetch('/rents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata)
            })
                .then(r => r.json())
                .then(data => {
                    if (!data.errors & !!data.id) {
                        history.push(`/rents/${data.id}`)
                    } else {
                        alert('Rent data has no id or has errors')
                    }
                })
        }

    })

    const setRentDate_time = (date_time) => {
        formik.setFieldValue('date_time', date_time)
    }
    const rentForm = () => {
        return (<form onSubmit={formik.handleSubmit}>
            <p>Hi user</p>
            <p>Please enter location, date and time to rent this equipment</p>
            <label>Location:</label>
            <div>{(formik.errors.location) ? <p style={{ color: 'red' }}>{formik.errors.location}</p> : null}</div>
            <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange}></input>
            <br />
            <label>Date and time:</label>
            <div>{(formik.errors.date_time) ? <p style={{ color: 'red' }}>{formik.errors.date_time}</p> : null}</div>
            <DatePicker
                selected={formik.values.date_time}
                onChange={(date) => setRentDate_time(date)}
                showTimeSelect
                name="date_time"
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='time'
                dateFormat="yyyy-MM-dd hh:mm aa"
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
