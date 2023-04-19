import React, { useEffect, useState } from 'react';
import { getEmployeeById } from './Service/EmployeeService';
import { useContext } from 'react';
import Context from './Authentication';

function Profile(props) {
    const reader = useContext(Context);
    const {handleLogOut} = reader;
    const path = window.location.pathname;
    const arr = path.split('/');
    const id = arr[arr.length-1];
    const [name,setName] = useState("");
    const [mail,setMail] = useState("");
    const [number,setNumber] = useState("");
    const [manager,setManager] = useState("");
    const [location,setLocation] = useState("");
    const [role,setRole] = useState("");

    useEffect(()=>{
        getEmployeeById(id).then((res)=>{
            const employee = res.data;
            setName(employee.employeeName);
            setMail(employee.employeeEmail);
            setNumber(employee.employeeNumber);
            setLocation(employee.employeeLocation.locationName);
            setRole(employee.employeeRole.roleName);
            if(employee.manager!=null){
                setManager(employee.manager.employeeName);
            }else{
                manager=null;
            }
        })
    },[]);
    return (
        <div className='contentContainer'>
            <div className='card'>
            <h2>PROFILE</h2>
            <div className='details'>
                <p>Name: {name}</p>
                <p>ID: {id}</p>
                <p>E-mail: {mail}</p>
                <p>Number: {number}</p>
                {manager&&<p>Manager: {manager}</p>}
                <p>Role: {role}</p>
                <p>Location: {location}</p>
            </div>
            <button className='det' onClick={handleLogOut}>LOGOUT</button>
            </div>
        </div>
    );
}

export default Profile;