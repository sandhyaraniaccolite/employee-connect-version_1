import React, { useContext, useEffect, useState } from 'react';
import Context from '../Authentication';
import { managerEmployeeCon } from '../Service/MeetingService';
function MyRepotees(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const[repotees, setRepotees] = useState([]);
    useEffect(()=>{
        managerEmployeeCon(id).then((res)=>{
            setRepotees(res.data);
        })
    });
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
            <h2 style={{textAlign:'center', marginTop:"30px",marginBottom:"30px",color:"white"}}>REPORTEES INFO</h2>
            <div  className='tableContainer'>
            <table className='center'>
                <thead>
                    <tr>
                        <th>EMPLOYEE-NAME</th>
                        <th>HR NAME</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {repotees.map((x)=>{
                        return(
                            <tr>
                        <td>{x.employee.employeeName}</td>
                        <td>{x.hrEmployee.employeeName}</td>
                        <td>{x.meetDate}</td>
                        <td>
                            {!x.meetStatus && <button style={{width:"100px",backgroundColor:"#636aea",color: "white",border:"none"}}>SCHEDULED</button>}
                            {x.notesAprooveStatus && <button style={{width:"100px",backgroundColor:"#28a745",color: "white",border:"none"}}>CLOSED</button>}
                            {(crossedDeadLine(x.deadLine)&& x.meetStatus&&!x.notesAprooveStatus) && <button style={{width:"100px",backgroundColor:"lightGrey",color:"black",border:"none", height:"40px"}}>PENDING CLOSURE</button>}
                            {(x.meetStatus&&!crossedDeadLine(x.deadLine))&&<button style={{width:"100px",backgroundColor:"#dc3545",color: "white",border:"none", height:"40px"}}>ACTION OVER DUE</button>}
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

export default MyRepotees;



// import React, { useEffect, useState } from 'react';
// import { deleteMeet, getMeetScheduledHR } from '../Service/MeetingService';
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import Context from '../Authentication';
// function HRMS(props) {
    // const reader = useContext(Context);
    // const {id} = reader;
//     const history = useNavigate();
    // const[ms, setMs] = useState([]);
    // useEffect(()=>{
    //     getMeetScheduledHR(id).then((res)=>{
    //         setMs(res.data);
    //     })
    // });
//     const handleNotes=(meet_id)=>{
//         history(`/hr/${id}/notes/${meet_id}`)
//     } 

//     const handleDelete = (meet_id)=>{
//         deleteMeet(id,meet_id);
//     }

//     const handleUpdate = (meet_id)=>{
//         history(`/hr/${id}/sch-meet/${meet_id}`)
//     }
    // return (
    //     <div className='contentContainer'>
    //         <h2 style={{textAlign:'center', marginTop:"30px",marginBottom:"30px"}}>MEETING SCHEDULED</h2>
    //         <div  className='tableContainer'>
    //         <table className='center'>
    //             <thead>
    //                 <tr>
    //                     <th>EMPLOYEE-NAME</th>
    //                     <th>DATE</th>
    //                     <th>TIME</th>
    //                     <th>ACTION</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {ms.map((x)=>{
    //                     return(
    //                         <tr>
    //                     <td>{x.employee.employeeName}</td>
    //                     <td>{x.meetDate}</td>
    //                     <td>{x.meetTime}</td>
    //                     <td>
    //                         <button onClick={()=>handleNotes(x.meetingId)}>NOTES</button>
    //                         <button style={{width:"100px", marginLeft:"5px", marginRight:"5px"}} onClick={()=>handleUpdate(x.meetingId)}>RESCHEDULE</button>
    //                         <button onClick={()=>handleDelete(x.meetingId)}>CANCEL</button>
    //                     </td>
    //                     </tr>
    //                     )
    //                 })}
    //             </tbody>
    //         </table>
    //         </div>
    //     </div>
    // );
// }

// export default HRMS;