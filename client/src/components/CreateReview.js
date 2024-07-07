import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useFormik } from 'formik';
import * as Yup from "yup";

import { useCreateReviewMutation } from "../services/sportingGoodsApi"

const CreateReview = ({ equipment_id }) => {
    const [createReview, { isSuccess: createReviewIsSuccess, isError: createReviewIsError, data: createReviewResponse }] = useCreateReviewMutation()

    let history = useHistory();
    // to validate urls: https://stackoverflow.com/a/65810131
    const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

    const formSchema = Yup.object().shape({
        text: Yup
            .string()
            .max(250, ''),
        photos: Yup
            .string()
            .matches(URL, 'Enter a valid url'), //https://stackoverflow.com/a/65810131
    })
    const formik = useFormik({
        initialValues: {
            text: '',
            photos: '',
            equipment_id: equipment_id,
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const payload = await createReview(formik.values).unwrap();
                console.log(payload)
                if (!payload.errors && !!payload.id) {
                    history.go(0)
                } else {
                    alert('Review data has no id or has errors')
                }
            } catch (error) {
                alert('Review data has errors')
            }
        }
    })
    return (
        <div>
            <h1>Leave your review here:</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>Review:</label>
                <div>{(formik.errors.text) ? <p style={{ color: 'red' }}>{formik.errors.text}</p> : null}</div>
                <input type="text" name="text" value={formik.values.text} onChange={formik.handleChange}></input>
                <br />
                <label>Photos:</label>
                <div>{(formik.errors.photos) ? <p style={{ color: 'red' }}>{formik.errors.photos}</p> : null}</div>
                <input type="text" name="photos" value={formik.values.photos} onChange={formik.handleChange}></input>
                <br />
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default CreateReview
