import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { getEmployeeById } from './Service/EmployeeService';

const Context = createContext();
export const Authentication = (props)=>{
    const [id,setId] = useState("");
    const [mail, setMail] = useState("");
    const [isAuth, setAuth] = useState(false);
    const [role, setRole] = useState("");
    const updateId = (id)=>{
        setId(id);
    }

    const updateMail = (mail)=>{
        setMail(mail);
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        
        getEmployeeById(id).then((res)=>{
            if(id==-1 || mail==""){
                return false;
            }
            const employee = res.data;
            if(employee===""){
               return false;
                
            }
            if(mail!==employee.employeeEmail){
                return false;
            }
            setRole(employee.employeeRole.roleName);
            setAuth(true);
            return true;
            
        })
    }

    const handleLogOut=()=>{
        setAuth(false);
        setMail("");
        setId("");

        window.location.pathname =`/`;
    }
    
    return (
        <Context.Provider value={{id,setId,mail,setMail,updateId,updateMail,handleLogin,role,isAuth,handleLogOut}}>{props.children}</Context.Provider>
    );
}

export default Context;