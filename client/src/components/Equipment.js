import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import RentEquipment from './RentEquipment';
import { useSelector, useDispatch } from 'react-redux'
import Review from './Review';
import { Button } from 'antd';
import {gray} from '@ant-design/colors';
const customStyles = {
    content: {
        overflow: 'visible',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const Equipment = () => {
    const [equipment, setEquipment] = useState('')
    const [reviews, setReviews] = useState([])
    let { id } = useParams()

    const token = useSelector((state) => state.user.value.token);
    console.log('token from equipment.js',token)
    useEffect(()=>{
        fetch(`/equipments/${id}`)
        .then(r=>r.json())
        .then(data=>(
            setEquipment(data)
        ))
    }, [])
    
    useEffect(()=>{
        fetch(`/equipments/${id}/reviews`)
        .then(r=>r.json())
        .then(data=>setReviews(data))
    },[])
    
    const review=reviews.map((r)=>(<Review key={r.id} review={r}/>))

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(){
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false);
    }

    function handleClick(){
        console.log("Button here")
    }

    return (
        <div>
            <h2>{equipment.name}</h2>
            {/* {equipment.pictures.split('|').map((p, i) => {
                    if (p.startsWith('http')) {
                        return <img key={'equipment_pic_' + i} className='equipment_pic' src={p}></img>
                    } else {
                        return <img key={'equipment_pic_' + i} className='portfolio_pic' src={`data:image/jpeg;base64,${p}`}></img>

                    }
                })}         */}
            <img className="equipment_pic" src={equipment.pictures}></img> 
            <h2>Rent price : {equipment.rent_price}</h2>
            {review}
            <Button type='primary' onClick={openModal}>Click to rent</Button>            
            {/* <button onClick={openModal}>Click to rent</button> */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Rent equipment'>
                <RentEquipment equipment_id={equipment.id}/>
            </Modal>          
        </div>
    )
}

export default Equipment
