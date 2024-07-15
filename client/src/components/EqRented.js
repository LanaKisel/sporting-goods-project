import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import UpdateRent from './UpdateRent';
import CancelRent from './CancelRent';
import EquipmentPictures from './EquipmentPictures';
import { Button } from 'antd';

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
  useEffect(() => {
    fetch(`/rentals/${id}`)
      .then(r => r.json())
      .then(data => (
        setRent(data)
      ))
  }, [id])
  // console.log(rent.equipment.name, rent.equipment)
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
      <h2 style={{ textAlign: 'center' }}>Here're the details of your rental:</h2>
      <div className='row'>
        <div className='column equipment_pic'>
          {!!rent && !!rent.equipment && <EquipmentPictures pictures={rent.equipment.pictures} />}
        </div>
        <div className='column'>
          {!!rent && !!rent.equipment &&
            <>
            <h3 style={{ textAlign: "center" }}>{rent.equipment.name}</h3>
            <h3 style={{ textAlign: "center", marginLeft: 40 }}>Location: {rent.equipment.location}</h3>
              <h3 style={{ textAlign: "center", marginLeft: 40 }}>Dates: {rent.start_date} - {rent.end_date}</h3>
              <div style={{ display: 'block', textAlign: 'center' }}>
                <Button type='primary' style={{ marginRight: '1em' }} onClick={openUpdateModal}>Update Rental</Button>
                <Button type='primary' style={{ marginLeft: '1em' }} onClick={openCancelModal}>Cancel Rental</Button>
              </div>
            </>
          }
        </div>
      </div>
      <Modal
        isOpen={updateModalIsOpen}
        style={customStyles}
        onRequestClose={closeUpdateModal}
        contentLabel="Update rent Modal">
        {<UpdateRent rent_id={rent.id} />}
      </Modal>
      <Modal
        isOpen={cancelModalIsOpen}
        onRequestClose={closeCancelModal}
        style={customStyles}
        contentLabel="Cancel photoshoot Modal">
        {<CancelRent rent_id={rent.id} />}
      </Modal>
    </div>
  )
}

export default EqRented
