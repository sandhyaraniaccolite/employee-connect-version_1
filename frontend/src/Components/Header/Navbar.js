import React from 'react';
import { useContext } from 'react';
import {FaUser} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Context from '../Authentication';
import logo from './logo5.png';
const Navbar = () => {
   const reader = useContext(Context);
    const {id,isAuth} = reader;
   const history = useNavigate();
   
   const handleProfile=()=>{
      history(`/profile/${id}`);
   }
    return ( 
        <nav>
           <div className='title'>
            
           <img src={logo} alt="My Website Logo" width="300px" height="65px"/>
           </div>
           <div className='navProfile'>
                {isAuth&&<FaUser onClick={handleProfile} className='icons' color='white'/>}
           </div>
        </nav>
     );
}
 
export default Navbar;