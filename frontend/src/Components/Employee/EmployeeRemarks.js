import React, { useEffect, useState } from 'react';
import { getMeetById, updateByEmployee } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../Authentication';
function EmployeeRemarks(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const path = window.location.pathname;
    const arr = path.split('/');
    const meet_id = arr[arr.length-1];
    const history = useNavigate();
    const[test,setTest] = useState("");

    const [notesAprooveStatus, setNAS] = useState("");
    const [responseStatus, setResStatus] = useState("");
    const [employeeRemarks,setRemarks] = useState("");

    useEffect(()=>{
        getMeetById(meet_id).then((res)=>{
            const meet = res.data;
            setNAS(meet.notesAprooveStatus);
            setResStatus(meet.responseStatus);
        })
    });

    const handleSend=()=>{
        if(employeeRemarks!=""){
            const meet = {
                notesAprooveStatus:notesAprooveStatus,
                responseStatus:true,
                employeeRemarks:employeeRemarks
            }
            updateByEmployee(id,meet_id,meet);
            history(`/employee/${id}/pending-task`);
        }
    }

    return (
        <div className='contentContainer'>
            <div className='card'>
                <h2>REMARKS</h2>
                <textarea className='xx'
                rows={10} 
                cols={60}
                type='text'
                value={employeeRemarks}
                onChange={(e)=>setRemarks(e.target.value)}
                required/>
                <button className='det' onClick={handleSend}>SEND</button>
            </div>

        </div>
    );
}

export default EmployeeRemarks;