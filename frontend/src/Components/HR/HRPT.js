import React, { useEffect, useState } from 'react';
import { getHRPT, getMeetById } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import Context from '../Authentication';
import { useContext } from 'react';
function HRPT(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const [pt, setPt] = useState([]);
    const [responseStatus,setrs] = useState(false);
    useEffect(()=>{
        getHRPT(id).then((res)=>{
            setPt(res.data);
        })
    });
    const handleRemarks = (meet_id)=>{
        history(`/hr/${id}/hrRemarks/${meet_id}`);
    }
    const handleNotes = (meet_id)=>{
        history(`/hr/${id}/notes/${meet_id}`);
    }
    const crossedDeadLine = (deadLine)=>{
        const now = new Date();
        const dead = new Date(deadLine);
        if(dead.getTime()<now.getTime()){
            return false;
        }
        return true;
    }
    return (
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px",marginBottom:"30px",color:"white"}}>PENDING TASK</h2>
            <div  className='tableContainer'>
            <table className='center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>EMPLOYEE-NAME</th>
                        <th>DATE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {pt.map((x)=>{
                        return(
                            <tr>
                                <td>{x.meetingId}</td>
                        <td>{x.employee.employeeName}</td>
                        <td>{x.meetDate}</td>
                        <td>
                            {x.responseStatus && <button style={{width:"50%", marginBottom:"10px",color: "white",border:"none"}} onClick={()=>handleRemarks(x.meetingId)}>EMP REMARKS</button>}
                            {(!x.responseStatus && !crossedDeadLine(x.deadLine)) && <button style={{width:"50%", marginBottom:"10px",backgroundColor:"red", color:"#dc3545",color: "white",border:"none"}} disabled>ACTION OVERDUED</button>}
                            {(!x.responseStatus && crossedDeadLine(x.deadLine)) && <button style={{width:"50%", marginBottom:"10px",backgroundColor:"lightgray", color:"black",border:"none"}} disabled>EMP REMARKS</button>}
                            <button style={{width:"50%",color: "white",border:"none"}} onClick={()=>handleNotes(x.meetingId)}> EDIT NOTES</button>
                            
                        </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default HRPT;
