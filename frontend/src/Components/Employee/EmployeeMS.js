import React, { useEffect, useState } from 'react';
import { getMeetScheduledEmployee } from '../Service/MeetingService';
import { useContext } from 'react';
import Context from '../Authentication';

function EmployeeMS(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const[ms, setMs] = useState([]);
    useEffect(()=>{
        getMeetScheduledEmployee(id).then((res)=>{
            setMs(res.data);
        })
    });
    return (
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px",marginBottom:"30px",color:"white"}}>MEETING SCHEDULED</h2>
            <div  className='tableContainer'>
            <table className='center'>
                <thead>
                    <tr>
                        <th>HR-NAME</th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>LINK</th>
                    </tr>
                </thead>
                <tbody>
                    {ms.map((x)=>{
                        return(
                            <tr>
                        <td>{x.hrEmployee.employeeName}</td>
                        <td>{x.meetDate}</td>
                        <td>{x.meetTime}</td>
                        <td>
                            <a href={x.link}><button>LINK</button></a>
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

export default EmployeeMS;

