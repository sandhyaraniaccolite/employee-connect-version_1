import React, { useEffect, useState } from 'react';
import { getHRClosedMeet } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from "../Authentication";
function HRClosedMeet(props) {
    const history = useNavigate();
    const reader = useContext(Context);
    const {id} = reader;
    const[closed, setClosed] = useState([]);
    useEffect(()=>{
        getHRClosedMeet(id).then((res)=>{
            setClosed(res.data);
        })
    });
    return (
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px",marginBottom:"30px",color:"white"}}>CLOSED MEETS</h2>
            <div  className='tableContainer'>
            <table className='center'>
                <thead>
                    <tr>
                        <th>EMPLOYEE-NAME</th>
                        <th>DATE</th>
                        <th>TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {closed.map((x)=>{
                        return(
                            <tr>
                        <td>{x.employee.employeeName}</td>
                        <td>{x.meetDate}</td>
                        <td>{x.meetTime}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default HRClosedMeet;