import React, { useEffect, useState } from 'react';
import { getHRMissedMeet } from '../Service/MeetingService';
import { useContext } from 'react';
import Context from "../Authentication";
function HRMissedMeet(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const[missed, setMissed] = useState([]);
    useEffect(()=>{
        getHRMissedMeet(id).then((res)=>{
            setMissed(res.data);
        })
    });
    return (
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px",marginBottom:"30px",color:"white"}}>EMPLOYEE'S MISSED MEETS</h2>
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
                    {missed.map((x)=>{
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

export default HRMissedMeet;

