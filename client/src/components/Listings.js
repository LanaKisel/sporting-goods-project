import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Button } from 'antd';
import EquipmentPictures from './EquipmentPictures';
import CreateListing from './CreateListing';
import variables from "../Variables"
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useGetEquipmentsQuery, useGetCategoriesQuery } from "../services/sportingGoodsApi"

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

const Listings = () => {
  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const [createListingModalIsOpen, setCreateListingModalIsOpen] = useState(false)

  function toggleCreateListingModal() {
    setCreateListingModalIsOpen(!createListingModalIsOpen);
  }

  const { data: equipments } = useGetEquipmentsQuery() // this RTK query(api call) will limit results to the currently authenticated user
  const { data: categories } = useGetCategoriesQuery();

  const equipmentDisplays = !!equipments && equipments.map(e => (
    <div key={e.id} className='row' style={{ border: 'dashed 1px black' }}>
      <div className='column bookingsPic' style={{ maxWidth: "30%" }}>
        <EquipmentPictures pictures={e.pictures} />
      </div>
      <div className='column'>
        <h3 style={{ textAlign: "center", marginTop: '2em' }}>{e.name}</h3>
        <LoadScript
          googleMapsApiKey={variables.maps_api_key}
          libraries={variables.maps_libraries}
        ><GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: e.latitude ?? 0,
            lng: e.longitude ?? 0
          }}
          zoom={14}
        >
            <Marker position={{
              lat: e.latitude ?? 0,
              lng: e.longitude ?? 0
            }} />
          </GoogleMap></LoadScript>
          <h3 style={{ textAlign: "center", marginTop: '2em' }}>{!!categories && categories.filter(c => c.id == e.category_id)[0].category_name}</h3>
          <h3 style={{ textAlign: "center", marginTop: '2em' }}>{e.location}</h3>
      </div>
    </div>
  ))

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button type="primary" onClick={toggleCreateListingModal}>Create Listing</Button>
      </div>
      <div>
        <h2 className='h2Bookings'>Your active listings:</h2>
        {equipmentDisplays}
      </div>
      <Modal
        isOpen={createListingModalIsOpen}
        onRequestClose={toggleCreateListingModal}
        style={customStyles}
        contentLabel='Create new listing'>
        <CreateListing />
      </Modal>
    </>
  )
}

export default Listings
