import React, { useEffect, useState } from 'react';
import { getLocationById } from '../../Service/LocationService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Authentication';
function ViewLocations(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const path = window.location.pathname;
    const arr = path.split('/');
    const loc_id = arr[arr.length-1];
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    useEffect(()=>{
        getLocationById(loc_id).then((res)=>{
            const location = res.data;
            setName(location.locationName);
            setAddress(location.locationAddress);
        })
    },[]);
    const handleBack = ()=>{
        history(`/admin/${id}/location`);
    }

    return (
        <div className='contentContainer'>
            <div className='card'>
            <h2>LOCATION DETAILS</h2>
            <div className='details'>
            <p>Name: {name}</p>
            <p>Address: {address}</p>
            </div>
            <button className='det' onClick={handleBack}>BACK</button>
            </div>
        </div>
    );
}

export default ViewLocations;
