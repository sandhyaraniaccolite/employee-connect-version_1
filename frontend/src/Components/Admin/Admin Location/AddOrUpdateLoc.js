
import React, { useState, useEffect } from 'react';
import { getLocationById, addLocation, updateLocation } from '../../Service/LocationService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Authentication';
function AddOrUpdateLoc(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const path = window.location.pathname;
    const arr = path.split('/');
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const loc_id = arr[arr.length-1];

    useEffect(()=>{
        if(loc_id!=-1){
            getLocationById(loc_id).then((res)=>{
                const location = res.data;
                setName(location.locationName);
                setAddress(location.locationAddress);
            })
        }
    },[]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(name!=="" && address!==""){   
            const location = {
                locationName:name,
                locationAddress:address,
                active:true
            }
            if(loc_id==-1){
                addLocation(id,location);
            }else{
                updateLocation(id,loc_id,location);
            }
            history(`/admin/${id}/location`);
            return;
        }
        console.log("NOT ADDED")
    }

    const handleCancel = ()=>{
        setName("");
        setAddress("");
        history(`/admin/${id}/location`);
    }

    const getTitle=()=>{
        if(loc_id==-1){
            return <h2>ADD LOCATION</h2>
        }
        return <h2>UPDATE LOCATION</h2>
    }

    const getButton=()=>{
        if(loc_id==-1){
            return < button className='add' onClick={handleSubmit}>ADD</button>
        }
        return < button className='add' onClick={handleSubmit}>UPDATE</button>
    }

    return (
        <div className='contentContainer'>
            <div className='card'>
            {getTitle()}
            <form>
                <div>
                <label>NAME: </label>
                <input 
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required/>
                </div>
                <div>
               <div><label>ADDRESS: </label></div> 
                <textarea
                rows={5} 
                cols={72}
                type='text'
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                required/>
                </div>
                <div>
                {getButton()}
                < button className='add' onClick={handleCancel}>CANCEL</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default AddOrUpdateLoc;

