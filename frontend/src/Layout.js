import React from 'react';
import { useContext } from 'react';
import Context from './Components/Authentication';
import Navbar from './Components/Header/Navbar';
import Login from './Components/Login';
import SideBar from './Components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

function Layout(props) {
    const reader = useContext(Context);
    const {isAuth,role,id} = reader;
    
    return(
        <div className='homeContainer'>
          <Navbar/>
          {!isAuth&&<Login/>}
          <div className='bodyContainer'>
            {isAuth&&<><SideBar/>
            <Outlet /></>}
          </div>
        </div>
        
      );
}

export default Layout;