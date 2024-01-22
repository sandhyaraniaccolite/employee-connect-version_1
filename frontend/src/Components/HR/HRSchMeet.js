import React, { useState, useEffect } from 'react';
import { getAllEmployee, getAllManager } from '../Service/EmployeeService';
import { getMeetById, scheduleMeet, updateByHR } from '../Service/MeetingService';
import { useNavigate } from 'react-router-dom';
import Context from '../Authentication';
import { useContext } from 'react';
function HRSchMeet(props) {
    const x = window.location.pathname;
    const arr = x.split("/");
    const meet_id = arr[arr.length-1];
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(-1);
    const [managers, setManagers] = useState([]);
    const [manager, setManager] = useState(-1);
    const [date, setDate] = useState(-1);
    const [time, setTime] = useState(-1);
    const [link, setLink] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(date==-1 || time==-1 || link==""){
            return;
        }
        if(employee==-1 && manager==-1){
            return;
        }
        const meet = {
            meetDate:date,
            meetTime:time,
            link:link
        }
        if(employee!=-1){
            meet['employee']=employee;
        }else{
            meet['employee']=manager;
        }
        if(meet_id==-1){
            console.log(JSON.stringify(meet));
            scheduleMeet(id,meet);
        }else{
            const up_meet = {
                meetDate:date,
                meetTime:time,
                link:link,
                meetStatue:false,
                meetNotes:""
            }
            updateByHR(id,meet_id, up_meet)
        }
        
        history(`/hr/${id}/meet-sch`);
    }
    const handleCancel=()=>{
        setDate(-1);
        setTime(-1);
        setLink("");
        setEmployee(-1);
        history(`/hr/${id}/meet-sch`);
    }
    useEffect(()=>{
        if(meet_id!=-1){
            getMeetById(meet_id).then((res)=>{
                const meet = res.data;
                setEmployee(meet.employee);
                setDate(meet.meetDate);
                setTime(meet.meetTime);
                setLink(meet.link);
            })
        }
        getAllEmployee().then((res)=>{
            setEmployees(res.data);
        });
        getAllManager().then((res)=>{
            setManagers(res.data);
        })

    },[])
    return (
        
        <div className='contentContainer'>
            <div className='card'>
            <h2 style={{marginBottom:"20px"}}>SCHEDULE MEET</h2>
            <form>
                {meet_id==-1 && <div>
                <label>EMPLOYEE: </label>
                <select value={employee}
                onChange={(e)=>setEmployee(e.target.value)} required> 
                    <option value="" select hidden>--SELECT--</option>
                    {employees.map((x)=>{
                        return <option value={x.employeeId}>{x.employeeName}-{x.employeeId}</option>
                    })}
                </select>
                </div>}


                {meet_id==-1 && <div>
                <label>MANAGER: </label>
                <select value={manager}
                onChange={(e)=>setManager(e.target.value)} required> 
                    <option value="" select hidden>--SELECT--</option>
                    {managers.map((x)=>{
                        return <option value={x.employeeId}>{x.employeeName}-{x.employeeId}</option>
                    })}
                </select>
                </div>}

                <div>
                    <label>DATE: </label>
                    <input value={date} type='date' onChange={(e)=>setDate(e.target.value)} required></input>
                </div>

                <div>
                    <label>TIME: </label>
                    <input value={time} type='time' onChange={(e)=>setTime(e.target.value)} required></input>
                </div>

                <div>
                    <label>LINK: </label>
                    <input value={link} type='link' onChange={(e)=>setLink(e.target.value)} required></input>
                </div>
                
                <div>
                < button className='add' onClick={handleSubmit}>SCHEDULE</button>
                < button className='add' onClick={handleCancel}>CANCEL</button>
                </div>
                
                 
            </form>
            </div>
        </div>
    );
}

export default HRSchMeet;
