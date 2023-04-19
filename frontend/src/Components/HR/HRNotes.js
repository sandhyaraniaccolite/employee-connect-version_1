import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getMeetById, updateByHR } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import Context from '../Authentication';
import { useContext } from 'react';
function HRNotes(props) {
    const history = useNavigate();
    const reader = useContext(Context);
    const {id} = reader;
    const path = window.location.pathname;
    const arr = path.split('/');
    const meet_id = arr[arr.length-1];
    const [date,setDate] = useState("");
    const [time,setTime] = useState("");
    const [status,setStatus] = useState(false);
    const [notes, setNotes] = useState("");
    const [link,setLink] = useState("");
    useEffect(()=>{
        getMeetById(meet_id).then((res)=>{
            const meet = res.data;
            setDate(meet.meetDate);
            setTime(meet.meetTime);
            setStatus(meet.meetStatus);
            setNotes(meet.meetNotes);
            setLink(meet.link);
        })
    },[]);
    const handleSend = ()=>{
        if(notes!=""){
            const meet = {
                meetDate:date,
                meetTime:time,
                meetStatus:true,
                meetNotes:notes,
                link:link
            }
            updateByHR(id,meet_id,meet);
            history(`/hr/${id}/meet-sch`);
        }
        
    }
    return (
        <div className='contentContainer'>
            <div className='card'>
            
            <div className='details'>
            <h2>HR NOTES</h2>
                <textarea className='xx'
                rows={10} 
                cols={60}
                type='text'
                value={notes}
                onChange={(e)=>setNotes(e.target.value)}
                required/>
                
            </div>
            <button className='det' onClick={handleSend}>SEND</button>
            </div>
        </div>
    );
}

export default HRNotes;