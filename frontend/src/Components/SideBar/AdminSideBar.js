import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Authentication';
import { FiHome } from 'react-icons/fi';
import {BsPersonWorkspace} from 'react-icons/bs';
import {MdLocationCity} from 'react-icons/md';
import { AiOutlineApartment } from "react-icons/ai";

const AdminSideBar = () => {
    const role = "Admin";
    const reader = useContext(Context);
    const {id} = reader;
    const blocks = [
        {name:"Home", path:`/`,icon:<FiHome style={{marginRight:"5px"}}/>},
        {name:"Employee", path:`/admin/${id}/employee`,icon:<BsPersonWorkspace style={{marginRight:"5px"}}/>},
        {name:"Location", path:`/admin/${id}/location`,icon:<MdLocationCity style={{marginRight:"5px"}}/>},
        {name:"Role", path:`/admin/${id}/role`,icon:<AiOutlineApartment style={{marginRight:"5px"}}/>}
    ]
    //
    return (
        <div className='sidebarContainer'>
            {blocks.map((v)=>{
                return(
                    <Link  to={v.path}><button id={window.location.pathname===v.link?"active":"inactive"}>{v.icon}{v.name}</button></Link>
            )})} 
            
        </div>
    );
}

export default AdminSideBar;