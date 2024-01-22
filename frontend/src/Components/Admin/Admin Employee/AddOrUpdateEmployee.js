import React, { useState, useEffect } from 'react';
import { getLocation } from '../../Service/LocationService';
import { getRole } from '../../Service/RoleService';
import { addEmployee, getAllManager, getEmployeeById, updateEmployee} from '../../Service/EmployeeService';
import { useNavigate } from 'react-router-dom';
import Context from '../../Authentication';
import { useContext } from 'react';

function AddOrUpdateEmployee(props) {

    

    const reader = useContext(Context);
    const {id} = reader;

    const path = window.location.pathname;
    const arr = path.split('/');
    const employee_id = arr[arr.length-1];

    const [name,setName] = useState("")
    const [mail,setMail] = useState("")
    const [number,setNumber] = useState("")
    const [location, setLocation] = useState(-1)
    const [role,setRole] = useState(-1)
    const [manager,setManager] = useState(-1)
    const [availableLoc, setAvLoc] = useState([])
    const [availableRole, setAvRole] = useState([])
    const [employeeRoleId, setEmployeeRoleId] = useState(-1);
    const [managerId, setManagerId] = useState(-1);
    const [availableMan, setAvlMan] = useState([]);
    const history = useNavigate();
    const getManager = ()=>{
        if(employeeRoleId==role || managerId==role){
            return(<>
            <label>MANAGER: </label>
                <select  value={manager}
                onChange={(e)=>setManager(e.target.value)} required>
                    <option value="" select hidden>--SELECT--</option>
                    {availableMan.map((x)=>{
                        return <option value={x.employeeId}>{x.employeeName}</option>
                    })}
                </select>
            </>)
        }
                
                
        
    }
    useEffect(()=>{
        if(employee_id!=-1){
            getEmployeeById(employee_id).then((res)=>{
                const employee = res.data;
                setName(employee.employeeName);
                setMail(employee.employeeEmail);
                setNumber(employee.employeeNumber);
                setLocation(employee.employeeLocation.locationId);
                setRole(employee.employeeRole.roleId);
                if(employee.manager!=null){
                    setManager(employee.manager.employeeId);
                }else{
                    manager=null;
                }
            })
        }
        getLocation().then((res)=>{
            
            setAvLoc(res.data);
        });
        getRole().then((res)=>{
            
            setAvRole(res.data);
            res.data.map((v)=>{
                if(v.roleName==="Employee"){
                    setEmployeeRoleId(v.roleId);
                }else if(v.roleName==="Manager"){
                    setManagerId(v.roleId);
                }
            })
        })

        getAllManager().then((res)=>{
            setAvlMan(res.data);
        })
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(name!=="" && mail!=="" && role!=="" && location!==-1 && number!==-1){
            if(employeeRoleId==role && manager===-1){
                console.log(" NOT ADDED")
                return;
            }else{
                const employee = {
                    employeeName:name,
                    employeeEmail:mail,
                    employeeNumber:number,
                    manager:manager,
                    employeeLocation:location,
                    employeeRole:role,
                    active:true
                }
                if(employee_id==-1){
                    addEmployee(id,employee);
                }else{
                    updateEmployee(id,employee_id,employee);
                }
                
                history(`/admin/${id}/employee`);

                return;
            }
        }
        console.log("NOT ADDED")
    }

    const handleCancel = ()=>{
        setName("");
        setMail("");
        setNumber("");
        setLocation(-1);
        setRole(-1);
        setManager(-1);
        history(`/admin/${id}/employee`);
        
    }

    const getTitle=()=>{
        if(employee_id==-1){
            return <h2>ADD EMPLOYEE</h2>
        }
        return <h2>UPDATE EMPLOYEE</h2>
    }

    const getButton=()=>{
        if(employee_id==-1){
            return < button className='add' onClick={handleSubmit}>ADD</button>
        }
        return < button className='add' onClick={handleSubmit}>UPDATE</button>
    }
    
    return (
        <div className='contentContainer'>
            <div className='card'>
            {getTitle()}
            <form>
                <div>
                <label>NAME: </label>
                <input 
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required/>
                </div>
               <div>
               <label>E-MAIL ID: </label>
                <input 
                type='mail'
                value={mail}
                onChange={(e)=>setMail(e.target.value)}
                required/>

               </div>

                <div>
                    
                <label>MOBILE-NUMBER: </label>
                <input 
                type='text'
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
                required/>

                </div>

                <div>
                <label>ROLE: </label>
                <select value={role}
                onChange={(e)=>setRole(e.target.value)} required> 
                    <option value="" select hidden>--SELECT--</option>
                    {availableRole.map((x)=>{
                        return <option value={x.roleId}>{x.roleName}</option>
                    })}
                </select>
                </div>
                
                
                <div> 
                {getManager()}
                </div>
                

                <div>
                <label>LOCATION: </label>
                <select value={location}
                onChange={(e)=>setLocation(e.target.value)} required>
                    <option value="" select hidden>--SELECT--</option>
                    {availableLoc.map((loc)=>{
                        return <option value={loc.locationId}>{loc.locationName}</option>
                    })}
                </select>
                </div>
                
                <div>
                {getButton()}
                < button className='add' onClick={handleCancel}>CANCEL</button>
                </div>
                
                 
            </form>
            </div>
        </div>
    );
}

export default AddOrUpdateEmployee;