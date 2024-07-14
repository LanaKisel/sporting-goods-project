import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Select, Form, InputNumber, Input } from "formik-antd";
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { FormikProvider } from 'formik';
import LocationSearchInput from "./LocationSearchInput"

import { useCreateEquipmentMutation, useGetCategoriesQuery } from "../services/sportingGoodsApi"

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CreateListing = () => {
    const [createListing] = useCreateEquipmentMutation()
    const { data: categories } = useGetCategoriesQuery();

    /* start fileupload */
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        var picturesObjArray = await Promise.all(newFileList.map(async fl => { return { name: fl.name, data: await getBase64(fl.originFileObj) } }))
        formik.values.pictures = JSON.stringify(picturesObjArray);
        formik.setFieldTouched('pictures')
    }
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    /* end fileupload */

    let history = useHistory();

    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .required("Enter a name for the item you are listing")
            .max(250, ''),
        pictures: Yup
            .string()
            .required("Provide at least one picture")
            .min(3, "Provide at least one picture"), // empty array is "[]" len 2
        rent_price: Yup
            .number()
            .required()
            .min(10),
        location: Yup
            .string()
            .required("Specify a location")
            .max(250, ''),
        category_id: Yup
            .number()
            .required("Select a category")
            .integer(),
        latitude: Yup
            .number()
            .required("Specify a location"),
        longitude: Yup
            .number()
            .required("Specify a location"),
    })
    const formik = useFormik({
        initialValues: {
            name: '',
            pictures: '',
            rent_price: 10.00,
            location: '',
            category_id: undefined,
            latitude: undefined,
            longitude: undefined
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            let formdata = structuredClone(formik.values)

            try {
                const payload = await createListing(formdata).unwrap();
                console.log(payload)
                if (!payload.errors && !!payload.id) {
                    history.go(0)
                } else {
                    alert('Listing data has no id or has errors')
                }
            } catch (error) {
                alert('Listing data has errors')
            }
        },
    })

    /* start address */
    const handleAddressChange = address => {
        formik.setFieldValue('location', address)
    }

    const handleAddressSelect = (place) => {

                formik.setFieldValue('latitude', place.geometry.location.lat())
                formik.setFieldValue('longitude', place.geometry.location.lng())
          
        formik.setFieldValue('location', place.formatted_address)
    }
    /* end address */

    return (
        <div>
            <h1>Create listing:</h1>
            <FormikProvider value={formik}>
                <Form>
                    <label>Name:</label>
                    <div>{(formik.errors.name) ? <p style={{ color: 'red' }}>{formik.errors.name}</p> : null}</div>
                    <Input name="name" />
                    <br />
                    <label>Price:</label>
                    <div>{(formik.errors.rent_price) ? <p style={{ color: 'red' }}>{formik.errors.rent_price}</p> : null}</div>
                    <InputNumber name="rent_price" style={{ width: "100%" }} />
                    <label>Category:</label>
                    <div>{(formik.errors.category_id) ? <p style={{ color: 'red' }}>{formik.errors.category_id}</p> : null}</div>
                    <Select name="category_id" options={!!categories && [...categories].sort((a, b) => { return a.category_name.localeCompare(b.category_name) }).map(c => { return { value: c.id, label: <span>{c.category_name}</span> } })} style={{ width: "100%" }} />
                    <label>Pictures:</label>
                    <div>{(formik.errors.pictures) ? <p style={{ color: 'red' }}>{formik.errors.pictures}</p> : null}</div>
                    <Upload
                        listType="picture-card"
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={(file) => {
                            return false;
                        }}
                        fileList={fileList}
                    >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                    <label>Location:</label>
                    <LocationSearchInput
                        address={formik.values.location}
                        onAddressSelect={handleAddressSelect}
                        onChange={handleAddressChange}
                    />

                    <div>{(formik.errors.location) ? <p style={{ color: 'red' }}>{formik.errors.location}</p> : null}</div>
                    <br />
                    <input type="submit"></input>
                </Form>
            </FormikProvider>
        </div>
    )
}

export default CreateListing
