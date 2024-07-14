import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Button } from 'antd';
import CancelRent from './CancelRent';
import CreateReview from './CreateReview';
import EquipmentPictures from './EquipmentPictures';

import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetRentalsQuery } from "../services/sportingGoodsApi"

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

const Bookings = () => {
  const { data: bookings } = useGetRentalsQuery() // this TRK query(api call) will limit results to the currently authenticated user

  const [modalIsOpen, setIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState(undefined)
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(undefined)

  function openModal(id) {
    setSelectedBookingId(id);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openReviewModal(id) {
    setSelectedEquipmentId(id);
    setReviewModalIsOpen(true);
  }
  function closeReviewModal() {
    setReviewModalIsOpen(false);
  }
  const booking = !!bookings && bookings.map(b => (
    <div key={b.id} className='row' style={{ border: 'dashed 1px black' }}>
      <div className='column equipment_pic' style={{ maxWidth: "30%" }}>
        <EquipmentPictures pictures={b.equipment.pictures} />
      </div>
      <div className='column'>
        <h3 style={{ textAlign: "center", marginTop: '2em' }}>{b.equipment.name}</h3>
        <h3 style={{ textAlign: "center" }}>Location: {b.equipment.location}</h3>
        <h3 style={{ textAlign: "center" }}>Dates: {b.start_date} - {b.end_date}</h3>
        <div>
          <Button type='primary' style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} onClick={() => {openModal(b.id)}}>Cancel Rental</Button>
        </div>
        <br />
        <Button type='primary' style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} onClick={() => {openReviewModal(b.equipment.id)}}>Leave a review</Button>
        <br />
      </div>
    </div>
  ))
  return (
    <div>
      <h2 className='h2Bookings'>Details of your bookings:</h2>
      {booking}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Cancel Rent equipment'>
        {!!selectedBookingId && <CancelRent rent_id={selectedBookingId} />}
      </Modal>
      <Modal
        isOpen={reviewModalIsOpen}
        onRequestClose={closeReviewModal}
        style={customStyles}
        contentLabel='Rent equipment'>
        {!!selectedEquipmentId && <CreateReview equipment_id={selectedEquipmentId} />}
      </Modal>
    </div>
  )
}

export default Bookings
