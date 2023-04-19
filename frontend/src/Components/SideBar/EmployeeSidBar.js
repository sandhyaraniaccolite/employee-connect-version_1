import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Authentication';
import { FiHome } from 'react-icons/fi';
import { SiGooglemeet} from 'react-icons/si';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MdSchedule } from 'react-icons/md';

function EmployeeSidBar(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const role = "Employee";
    const blocks = [
        {name:"Home", path:`/`,icon:<FiHome style={{marginRight:"5px"}}/>},
        {name:"Meeting Scheduled", path:`/employee/${id}/meet-sch`,icon:<SiGooglemeet style={{marginRight:"5px"}}/>},
        {name:"Closed Meetings", path:`/employee/${id}/closed-meet`,icon:< AiOutlineSchedule style={{marginRight:"5px"}}/>},
        {name:"Pending Task", path:`/employee/${id}/pending-task`,icon:< MdSchedule style={{marginRight:"5px"}}/>}
    ]
    return (
        <div className='sidebarContainer'>
            {blocks.map((v)=>{
                return(
                    <Link to={v.path}><button>{v.icon} {v.name}</button></Link>
                )
            })}
            
        </div>
    );
}

export default EmployeeSidBar;