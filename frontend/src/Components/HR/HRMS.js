import React, { useEffect, useState } from 'react';
import { deleteMeet, getMeetScheduledHR } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../Authentication';
function HRMS(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const[ms, setMs] = useState([]);
    useEffect(()=>{
        getMeetScheduledHR(id).then((res)=>{
            setMs(res.data);
        })
    });
    const handleNotes=(meet_id)=>{
        history(`/hr/${id}/notes/${meet_id}`)
    } 

    const handleDelete = (meet_id)=>{
        deleteMeet(id,meet_id);
    }

    const handleUpdate = (meet_id)=>{
        history(`/hr/${id}/sch-meet/${meet_id}`)
    }
    return (
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px",marginBottom:"30px",color:"white"}}>MEETING SCHEDULED</h2>
            <div  className='tableContainer'>
            <table className='center'>
                <thead>
                    <tr>
                        <th>EMPLOYEE-NAME</th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {ms.map((x)=>{
                        return(
                            <tr>
                        <td>{x.employee.employeeName}</td>
                        <td>{x.meetDate}</td>
                        <td>{x.meetTime}</td>
                        <td>
                            <button onClick={()=>handleNotes(x.meetingId)}>NOTES</button>
                            <button style={{width:"100px", marginLeft:"5px", marginRight:"5px"}} onClick={()=>handleUpdate(x.meetingId)}>RESCHEDULE</button>
                            <button onClick={()=>handleDelete(x.meetingId)}>CANCEL</button>
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

export default HRMS;