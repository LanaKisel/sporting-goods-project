import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux'
import Header from './Header';
import variables from '../Variables';
import { GoogleMap, Marker, useJsApiLoader, geoloc } from '@react-google-maps/api';
import { useGetCategoriesQuery, useGetEquipmentsForMapQuery } from "../services/sportingGoodsApi"
import { Button } from 'antd';

const Home = () => {
    const { data: categories } = useGetCategoriesQuery();
    const { data: equipments, is: equipmentsIsLoading } = useGetEquipmentsForMapQuery();
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: variables.maps_api_key,
        libraries: variables.maps_libraries
    })

    const containerStyle = {
        width: '100%',
        height: '450px'
    };

    const locationHandler = (position) => {
        console.log(position)
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
    }
    const getLocation = () => { navigator.geolocation.getCurrentPosition(locationHandler); }

    const category = !!categories && categories.map(category => <Link key={category.id} to={`/categories/${category.category_name}`}><h2>{category.category_name}</h2></Link>)

    return (
        <div>
            <Header />
            {/* <img className="homepage_photo" src={"https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=900&t=st=1719098303~exp=1719098903~hmac=5a6af19bfcc72113264d23e928921278b00ef10189549f728ac13f581b7a2b33"} alt={"Sport equipment"} />
            <h2 className='homepage_h2'>Ready to have some fun?</h2>
            <h3 className='homepage_h3'>Check out sport equipment that's available to rent</h3> */}
            <br />
            <h3 className='cat_h3'>Categories:</h3>
            <div className='categoryContainer'>
                {category}
            </div>
            <h2 className='homepage_h2'>Available equipment near you:</h2>
            <Button type="primary" onClick={getLocation}>Set My Location</Button>
            {
                isLoaded ? <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                        lat: userLocation.lat,
                        lng: userLocation.lng
                    }}
                    zoom={10}
                >
                    {!!equipments && equipments.map(e => <Marker key={e.id} position={{
                        lat: e.latitude ?? 0,
                        lng: e.longitude ?? 0
                    }} />)}

                </GoogleMap> : <></>
            }
        </div>
    )
}

export default Home

