import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Button, Spin } from 'antd';
import EquipmentPictures from './EquipmentPictures';
import CreateListing from './CreateListing';
import UpdateListing from './UpdateListing';
import variables from "../Variables"
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: variables.maps_api_key,
    libraries: variables.maps_libraries
  })

  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const [createListingModalIsOpen, setCreateListingModalIsOpen] = useState(false)
  const [updateListingModalIsOpen, setUpdateListingModalIsOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(undefined)

  function toggleCreateListingModal() {
    setCreateListingModalIsOpen(!createListingModalIsOpen);
  }
  function openUpdateListingModal(id) {
    setSelectedEquipmentId(id);
    setUpdateListingModalIsOpen(true);
  }
  function closeUpdateListingModal() {
    setUpdateListingModalIsOpen(false);
  }


  const { data: equipments, isLoading: equipmentsIsLoading } = useGetEquipmentsQuery() // this RTK query(api call) will limit results to the currently authenticated user
  const { data: categories } = useGetCategoriesQuery();



  const equipmentDisplays = !!equipments && equipments.map(e => (
    <div key={e.id} className='row' style={{ border: 'dashed 1px black' }}>
      <div className='column bookingsPic' style={{ maxWidth: "30%" }}>
        <EquipmentPictures pictures={e.pictures} />
      </div>
      <div className='column'>
        <h3 style={{ textAlign: "center", marginTop: '2em' }}>{e.name}</h3>
        {
          isLoaded ? <GoogleMap
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
          </GoogleMap> : <></>
        }
        <h3 style={{ textAlign: "center", marginTop: '2em' }}>{!!categories && categories.filter(c => c.id == e.category_id)[0].category_name}</h3>
        <h3 style={{ textAlign: "center", marginTop: '2em' }}>{e.location}</h3>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <Button type='primary' style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} onClick={() => { openUpdateListingModal(e.id) }}>Update Listing</Button>
        </div>
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
        <Spin spinning={equipmentsIsLoading}>
          {equipmentDisplays}
        </Spin>
      </div>
      <Modal
        isOpen={createListingModalIsOpen}
        onRequestClose={toggleCreateListingModal}
        style={customStyles}
        contentLabel='Create new listing'>
        <CreateListing />
      </Modal>
      <Modal
        isOpen={updateListingModalIsOpen}
        onRequestClose={closeUpdateListingModal}
        style={customStyles}
        contentLabel='Update listing'>
        {!!selectedEquipmentId && <UpdateListing equipment_id={selectedEquipmentId} />}
      </Modal>
    </>
  )
}

export default Listings
