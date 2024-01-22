import React, { useEffect, useState } from 'react';
import { getEmployeeMissedMeet } from '../Service/MeetingService';
import { useContext } from 'react';
import Context from '../Authentication';
function EmployeeMissedMeet(props) {
    const[missed, setMissed] = useState([]);
    const reader = useContext(Context);
    const {id} = reader;
    useEffect(()=>{
        getEmployeeMissedMeet(id).then((res)=>{
            setMissed(res.data);
        })
    });
    return (
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px",marginBottom:"30px",color:"white"}}>MISSED MEETS</h2>
            <div  className='tableContainer'>
            <table className='center'>
                <thead>
                    <tr>
                        <th>HR-NAME</th>
                        <th>DATE</th>
                        <th>TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {missed.map((x)=>{
                        return(
                            <tr>
                        <td>{x.hrEmployee.employeeName}</td>
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

export default EmployeeMissedMeet;
