import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Context from './Authentication';
import acco from "../accoliteimage-removebg.png"
function Login(props) {
    const reader = useContext(Context);
    const {id,setId,mail,setMail,updateId,updateMail,handleLogin} = reader;
    const handle = (e)=>{
        const x = handleLogin(e);
    }
    return (
        <div className='contentContainerLogin'>
            <div className='cardLogin'>
            <img src={acco} width="370px" height="100px"/>
            <h2>LOGIN</h2>
            <form>
                <div>
                <label>ID: </label>
                <input 
                type='text'
                value={id}
                onChange={(e)=>updateId(e.target.value)}
                required/>
                </div>

                <div>
                <label>EMAIL-ID: </label>
                <input 
                type='mail'
                value={mail}
                onChange={(e)=>updateMail(e.target.value)}
                required/>
                </div>
                
                <div>
                < button className='login' onClick={(e)=>handle(e)}>LOGIN</button>
                </div>
                 
            </form>
            </div>
        </div>
    );
}

export default Login;