// https://github.com/ant-design/ant-design/issues/8894#issuecomment-2063571305
import React, { useEffect, useState } from 'react';
import { Input } from "antd"
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import variables from "../Variables"

const LocationSearchInput = ({ address, onAddressSelect, onChange }) => {
    const [searchResult, setSearchResult] = useState(undefined);
    const handleOnPlaceChanged = () => {
        onAddressSelect(searchResult.getPlace())
    };
    
    return (<>
        <LoadScript
            googleMapsApiKey={variables.maps_api_key}
            libraries={variables.maps_libraries}
        >
            <Autocomplete
                onLoad={(autocomplete) => setSearchResult(autocomplete)}
                onPlaceChanged={handleOnPlaceChanged}
                fields={['geometry.location', 'formatted_address']}
            >
                <Input placeholder="Enter your address" value={address} onChange={e => onChange(e.target.value)} />
            </Autocomplete>
        </LoadScript>
    </>)
}

export default LocationSearchInput;