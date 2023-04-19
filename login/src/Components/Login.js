import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useState } from 'react';
import acc from './accoliteimage-removebg.png';
import logo from './logo5-removebg.png';
// import './App.css';
function Login() {
    useEffect(()=>{
        if(window.localStorage.getItem('name')!==null){
            setName(window.localStorage.getItem('name'));
        }
    })
    const logout = ()=>{
        window.localStorage.clear('mail');
        window.localStorage.clear('id');
        window.localStorage.clear('name');
        setName("");
    }
    const [name,setName] = useState("");
    const login = useGoogleLogin({
        
        onSuccess: async response => {
            await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            }).then((res)=>{
                window.localStorage.setItem('mail',res.data.email);
                window.localStorage.setItem('name',res.data.name);
                window.localStorage.setItem('id',res.data.sub);
                setName(window.localStorage.getItem('name'));
            })
                
        }
    });

    
   
    return (
        <div className='loginContainer'>
            <img src={acc} width="300px" height="80px"/>
           <div><img className="logo" src={logo} alt="My Website Logo" width="900px" height="200px"/></div> 
           <div className='logincard'>
            <h1>Login</h1>
            <div className='loginButton'>            
                <button onClick={login}>
                    Continue with GOOGLE
                </button>
            </div>
            </div>

            {/* <div>
                <button onClick={logout}>
                    LOGOUT
                </button>
            </div> */}
            {/* {window.localStorage.getItem('name')!==null &&<h2>WELCOME {name}!</h2>} */}
      
        </div>
    );
}

export default Login;

