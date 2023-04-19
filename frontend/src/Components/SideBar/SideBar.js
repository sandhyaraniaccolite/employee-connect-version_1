import React from 'react';
import AdminSideBar from './AdminSideBar';
import EmployeeSidBar from './EmployeeSidBar';
import HRSideBar from './HRSideBar';
import { useContext } from 'react';
import Context from '../Authentication';
import ManagerSideBar from './ManagerSideBar';

function SideBar(props) {
    const reader = useContext(Context);
    const {role} = reader;
    const need = ()=>{
        if(role=="Admin"){
            return <AdminSideBar/>
        }else if(role=="Employee"){
            return <EmployeeSidBar/>
        }else if(role=="HR"){
            return <HRSideBar/>
        }else if(role=="Manager"){
            return <ManagerSideBar/>
        }
    }
    return (
        <div>
            {need()}
        </div>
    );
}


export default SideBar;