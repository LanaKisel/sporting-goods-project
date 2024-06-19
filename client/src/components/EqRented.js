import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import Modal from 'react-modal'
import UpdateRent from './UpdateRent';
import CancelRent from './CancelRent';
Modal.setAppElement('#root');
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

const EqRented = () => {
    let { id } = useParams()
    const [rent, setRent] = useState([])
    useEffect(()=>{
        fetch(`/rentals/${id}`)
        .then(r=>r.json())
        .then(data =>(
            setRent(data)
        ))
    }, [])
    const [updateModalIsOpen, setUpdateIsOpen] = React.useState(false);
    const [cancelModalIsOpen, setCancelIsOpen] = React.useState(false);
    
    function openUpdateModal() {
        setUpdateIsOpen(true);
      }
    
      function openCancelModal() {
        setCancelIsOpen(true);
      }
    
      function closeUpdateModal() {
        setUpdateIsOpen(false);
      }
      function closeCancelModal() {
        setCancelIsOpen(false);
      }
  
    return (
    <div>
        <h2>Here're details of the rent:</h2>
        <h3>Location: {rent.location}</h3>
        <h3>Dates: {rent.start_date? format(new Date((rent.start_date + 'Z').replace(/-/g, '/')), 'MMMM do yyyy'): ""} - {rent.start_date? format(new Date((rent.end_date + 'Z').replace(/-/g, '/')), 'MMMM do yyyy'): ""}</h3>
        <br/>
        <button type = 'button' onClick={openUpdateModal}>Update rent</button>
        <br/>
        <button type='button' onClick={openCancelModal}>Cancel rent</button>
        <Modal
        isOpen={updateModalIsOpen}
        style={customStyles}
        contentLabel="Update rent Modal">
        {<UpdateRent rent_id={rent.id}/>}
        </Modal>
        <Modal
        isOpen={cancelModalIsOpen}
        onRequestClose={closeCancelModal}
        style={customStyles}
        contentLabel="Cancel photoshoot Modal">
        {<CancelRent rent_id={rent.id}/>}
      </Modal>      
    </div>
  )
}

export default EqRented
