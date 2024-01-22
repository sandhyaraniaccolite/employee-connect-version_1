import React, { useEffect, useState } from 'react';
import { getMeetById } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../Authentication';
function EmployeeMeetDetails(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const path = window.location.pathname;
    const arr = path.split('/');
    const meet_id = arr[arr.length-1];
    const [hrName, setHrName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleBack = ()=>{
        history(`/employee/${id}/pending-task`);
    }

    const handleNotes = ()=>{
        history(`/employee/${id}/hr-notes/${meet_id}`);
    }

    useEffect(()=>{
        getMeetById(meet_id).then((res)=>{
            const meet = res.data;
            setHrName(meet.hrEmployee.employeeName);
            setDate(meet.meetDate);
            setTime(meet.meetTime);
        })
    })
    return (
        <div className='contentContainer'>
            <div className='card'>
            <h2>Meet Details</h2>
            <div className='details'>
                <p>HR-Name: {hrName}</p>
                <p>Date: {date}</p>
                <p>Time: {time}</p>
            </div>
            <button className='det' onClick={handleNotes}>NOTES</button>
            <button className='det' onClick={handleBack}>BACK</button>
            </div>
        </div>
    );
}

export default EmployeeMeetDetails;