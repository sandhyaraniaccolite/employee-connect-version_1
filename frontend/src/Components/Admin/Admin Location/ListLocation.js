
import React, { useEffect, useState } from 'react';
import { deleteLocation, getLocation, getLocationById, updateLocation } from '../../Service/LocationService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Authentication';
function ListLocation(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const [locations, setLocations] = useState([]);
    const history = useNavigate();
    useEffect(()=>{
        getLocation().then((res)=>{
            setLocations(res.data);
        })
    })

    const handleAddUpdate = (loc_id)=>{
        if(loc_id==-1){
            history(`/admin/${id}/addLocation/-1`);
        }else{
            history(`/admin/${id}/addLocation/${loc_id}`);
        }
        
    }
    const handleDelete = (loc_id)=>{
        getLocationById(loc_id).then((res)=>{
            const x = res.data;
            const loc = {
                locationName:x.locationName,
                locationAddress:x.locationAddress,
                active:false
            }
            updateLocation(id,loc_id,loc);
        })
        
    }
    const handleView=(loc_id)=>{
        history(`/admin/${id}/viewLocation/`+loc_id);
    }
    return (
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px",color:"white"}}>LIST LOCATION</h2>
            <button className='addEmp' onClick={()=>handleAddUpdate(-1)}>ADD LOCATION</button>
            <div className='tableContainer'>
            <table className='center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>LOCATION-NAME</th>
                        <th>ACIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location)=>{
                        if(!location.active){
                            return;
                        }
                        return(
                            <tr>
                        <td>{location.locationId}</td>
                        <td>{location.locationName}</td>
                        <td>
                            <button className='update_btn' onClick={()=>handleAddUpdate(location.locationId)}>UPDATE</button>
                            <button className='delete_btn' onClick={()=>handleDelete(location.locationId)}>DELETE</button>
                            <button className='view_btn' onClick={()=>handleView(location.locationId)}>VIEW</button>
                        </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default ListLocation;
