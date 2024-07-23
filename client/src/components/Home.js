import { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from './Header';
import variables from '../Variables';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useGetCategoriesQuery, useGetEquipmentsForMapQuery, useGetEquipmentByIdQuery } from "../services/sportingGoodsApi"
import { Button, Spin, Row, Col } from 'antd';
import { skipToken } from '@reduxjs/toolkit/query';
import EquipmentPictures from './EquipmentPictures';
import LocationSearchInput from "./LocationSearchInput"

const Home = () => {
    const { data: categories } = useGetCategoriesQuery();
    const { data: equipments } = useGetEquipmentsForMapQuery();

    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
    const [userAddress, setUserAddress] = useState("");
    const [activeMarker, setActiveMarker] = useState(undefined);

    const { data: equipment, isLoading: equipmentMarkerIsLoading } = useGetEquipmentByIdQuery(activeMarker ?? skipToken);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: variables.maps_api_key,
        libraries: variables.maps_libraries
    });
    const containerStyle = {
        width: '100%',
        height: '450px'
    };

    const handleAddressChange = address => {
        setUserAddress(address)
    }
    const handleAddressSelect = (place) => {
        if (place !== undefined && place.geometry !== undefined) {
            setUserLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
            setUserAddress(place.formatted_address);
        }
    }
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        });
    }

    const handleMarkerClick = (equipment_id) => {
        setActiveMarker(equipment_id)
    }

    const category = !!categories && categories.map(category => <Link key={category.id} to={`/categories/${category.category_name}`}><h2>{category.category_name}</h2></Link>)

    return (
        <div>
            <Header />
            <br />
            <h3 className='cat_h3'>Categories:</h3>
            <div className='categoryContainer'>
                {category}
            </div>
            <h2 className='homepage_h2'>Available equipment near you:</h2>
            <Row justify="center" align="middle" gutter={[16, 16]} style={{marginBottom:"2em"}}>
                <Col span={8} offset={4}><label>My Location:</label>
                    <LocationSearchInput
                        address={userAddress}
                        onAddressSelect={handleAddressSelect}
                        onChange={handleAddressChange}
                    /></Col>
                <Col>
                    <em>or</em></Col>
                <Col span={8}><Button type="primary" onClick={getLocation}>Detect My Location</Button></Col>
            </Row>
            {
                isLoaded ? <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                        lat: userLocation.lat,
                        lng: userLocation.lng
                    }}
                    zoom={10}
                >
                    {!!equipments && equipments.map(e =>
                        <Marker
                            key={e.id}
                            position={{
                                lat: e.latitude ?? 0,
                                lng: e.longitude ?? 0
                            }}
                            onClick={(event) => handleMarkerClick(e.id, event.latLng.lat(), event.latLng.lng())}
                        >
                            {activeMarker === e.id ? <InfoWindow position={{
                                lat: e.latitude ?? 0,
                                lng: e.longitude ?? 0
                            }}>
                                <Spin spinning={equipmentMarkerIsLoading} style={{minHeight:"100px", minWidth:"100px"}}>
                                    {!!equipment && !!categories &&
                                        <>
                                            <div style={{ display: "block" }}><Link to={`/equipments/${e.id}`}>{equipment.name}</Link></div>
                                            <span>{categories.filter(c => c.id === equipment.category_id)[0].category_name}</span>
                                            <span>Rent price : ${equipment.rent_price}.00</span>
                                            <EquipmentPictures pictures={equipment.pictures} maxWidth='120px' />
                                        </>
                                    }
                                </Spin>
                            </InfoWindow> : <></>}
                        </Marker>)}
                </GoogleMap> : <></>
            }
        </div>
    )
}

export default Home

