import React, { useEffect, useState } from 'react';
import { getEmployeePT } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../Authentication';
function EmployeePT(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const [pt, setPt] = useState([]);
    useEffect(()=>{
        getEmployeePT(id).then((res)=>{
            setPt(res.data);
        })
    });
    const handleView = (meet_id)=>{
        history(`/employee/${id}/meetDetails/${meet_id}`);
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
                        <th>HR-NAME</th>
                        <th>DATE</th>
                        <th>DEAD LINE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {pt.map((x)=>{
                        return(
                            <tr>
                        <td>{x.hrEmployee.employeeName}</td>
                        <td>{x.meetDate}</td>
                        {crossedDeadLine(x.deadLine)? <td>{x.deadLine}</td>:<td><button style={{width:"100px", marginBottom:"10px",backgroundColor:"#dc3545", color:"black",color: "white",border:"none"}} disabled>DUE PASSED</button></td> }
                        
                        <td>
                            <button onClick={()=>handleView(x.meetingId)}>VIEW</button>
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

export default EmployeePT;
