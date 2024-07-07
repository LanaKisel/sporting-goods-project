import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import RentEquipment from './RentEquipment';
import Review from './Review';
import { Button } from 'antd';
import {gray} from '@ant-design/colors';

import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetEquipmentByIdQuery, useGetReviewsByEquipmentIdQuery, useGetCurrentUserQuery } from "../services/sportingGoodsApi"

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
    let { id } = useParams()
    const { data: equipment } = useGetEquipmentByIdQuery(id ?? skipToken)
    const { data: reviews = [] } = useGetReviewsByEquipmentIdQuery(equipment?.id ?? skipToken)
    
    const token = useSelector((state) => state.user.value.token)
    const { data: currUser, isLoading: currUserIsLoading } = useGetCurrentUserQuery(token ?? skipToken)

    const review=reviews.map((r)=>(<Review key={r.id} review={r}/>))

    const [modalIsOpen, setIsOpen] = useState(false);

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
        !equipment ? <></> :
        <div>
            <h2 style = {{textAlign:"center"}}>{equipment.name}</h2>
            {/* {equipment.pictures.split('|').map((p, i) => {
                    if (p.startsWith('http')) {
                        return <img key={'equipment_pic_' + i} className='equipment_pic' src={p}></img>
                    } else {
                        return <img key={'equipment_pic_' + i} className='portfolio_pic' src={`data:image/jpeg;base64,${p}`}></img>

                    }
                })}         */}
            <img className="equipment" src={equipment.pictures}></img> 
            <h2 style = {{marginLeft: 20}}>Rent price : ${equipment.rent_price}.00</h2>
            {review}
            <br/>
            <Button style = {{marginLeft: 20, marginBottom: 20}} type='primary' onClick={openModal} disabled={currUser == undefined}>Click to rent</Button>{currUser == undefined && !currUserIsLoading && <span style={{marginLeft: '1em'}}>Login to rent</span>}    
            <br/>       
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
