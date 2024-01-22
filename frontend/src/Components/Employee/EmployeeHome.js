import React, { useContext } from 'react';
import Context from '../Authentication';

function EmployeeHome(props) {
    const reader = useContext(Context);
    const {role} = reader;
    const get = ()=>{
        if(role=="Manager"){
            return <h1 style={{textAlign:"center",marginTop:"40px",color:"white"}}>Manager Home</h1>
        }else{
            return <h1 style={{textAlign:"center",marginTop:"40px",color:"white"}}>Employee Home</h1>
        }
    }
    return (
        <div className='contentContainer'>
            {get()}
        </div>
    );
}

export default EmployeeHome;