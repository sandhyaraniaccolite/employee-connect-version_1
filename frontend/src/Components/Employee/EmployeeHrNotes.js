import React, { useEffect, useState } from 'react';
import { getMeetById, updateByEmployee } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../Authentication';
function EmployeeHrNotes(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const path = window.location.pathname;
    const arr = path.split('/');
    const meet_id = arr[arr.length-1];
    const [meetNotes, setNotes] = useState("");
    const [notesAprooveStatus, setNAS] = useState("");
    const [empRemarks,setRemarks] = useState("");
    const [responseStatus, setResStatus] = useState("");
	

    useEffect(()=>{
        getMeetById(meet_id).then((res)=>{
            const meet = res.data;
            setNAS(meet.notesAprooveStatus);
            setRemarks(meet.empRemarks);
            setResStatus(meet.responseStatus);
            setNotes(meet.meetNotes);
        })
    })



    const handleAccept=()=>{
        
        const meet = {
            notesAprooveStatus:true,
            responseStatus:true,
            empRemarks:empRemarks
        }
        updateByEmployee(id,meet_id,meet);
        history(`/employee/${id}/pending-task`);
    }
    const handleReject=(meet_id)=>{
        history(`/employee/${id}/emp-remarks/${meet_id}`);
    }
    return (
        <div className='contentContainer'>
            <div className='card'>
            <h2>HR Notes</h2>
            <div className='details'>
                <p>{meetNotes}</p>
            </div>
            <button className='det' onClick={handleAccept}>ACCEPT</button>
            <button className='det' onClick={()=>handleReject(meet_id)}>REJECT</button>
            </div>
        </div>
    );
}

export default EmployeeHrNotes;