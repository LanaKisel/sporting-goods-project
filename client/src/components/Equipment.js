import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import RentEquipment from './RentEquipment';
import { useSelector, useDispatch } from 'react-redux'
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
            <img className="equipment_pic" src={equipment.pictures}></img>
            <h2>Make: {equipment.make}</h2>
            <h2>Rent price : {equipment.rent_price}</h2>
            <button onClick={openModal}>Click to rent</button>
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
