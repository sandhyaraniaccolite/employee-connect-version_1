import React, { useEffect, useState } from 'react';
import { getMeetById } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import Context from '../Authentication';
import { useContext } from 'react';
function HRRemarks(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const path = window.location.pathname;
    const arr = path.split('/');
    const meet_id = arr[arr.length-1];
    const [empRemarks,setRemarks] = useState("");


    useEffect(()=>{
        getMeetById(meet_id).then((res)=>{
            const meet = res.data;
            setRemarks(meet.employeeRemarks);
        })
    });
    const handleBack = ()=>{
        history(`/hr/${id}/pending-task`);
    }

    return (
        <div className='contentContainer'>
            <div className='card'>
            <h2>EMPLOYEE REMARKS</h2>
            <div className='details'>
                <p>{empRemarks}</p>
            </div>
            <button className='det' onClick={handleBack}>BACK</button>
            </div>
        </div>
    );
}

export default HRRemarks;
