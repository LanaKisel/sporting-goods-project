import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import { Button } from 'antd';
import CancelRent from './CancelRent';
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
    const [bookings, setBookings] = useState([])
    useEffect(()=>{

        fetch('/rentals')
        .then(r=>r.json())
        .then(data=>(
          console.log(data),
          setBookings(data)))
    }, [])
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(){
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false);
    }
    const booking = bookings.map(b=>(
      <div className='row' style={{border:'dashed 1px black'}}>
        <div className='column'>
          <img className='bookingsPic'src={b.equipment.pictures}></img>
        </div>
        <div className='column'> 

          <h3 style={{textAlign:"center", marginTop:'2em'}}>{b.equipment.name}</h3>         
          <h3 style={{textAlign:"center"}}>Location: {b.location}</h3>
          <h3 style={{textAlign:"center"}}>Dates: {b.start_date} - {b.end_date}</h3>
          <div>
          <Button type='primary' style = {{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} onClick={openModal}>Cancel Rental</Button>
          </div>
          <br/>
          <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Rent equipment'>
                <CancelRent equipment_id={b.equipment.id}/>
            </Modal> 
          </div> 
      </div>
    ))
   
  return (
    <div>
      <h2 className='h2Bookings'>Details of your bookings:</h2>
        {booking}
    </div>
  )
}

export default Bookings
