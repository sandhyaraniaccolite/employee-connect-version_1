import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Authentication';
import { FiHome } from 'react-icons/fi';
import { SiGooglemeet} from 'react-icons/si';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MdSchedule } from 'react-icons/md';
import {BsPeople} from 'react-icons/bs';
function HRSideBar(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const blocks = [
        {name:"Home", path:`/`,icon:<FiHome style={{marginRight:"5px"}}/>},
        {name:"Schedule Meet", path:`/hr/${id}/sch-meet/-1`,icon:<SiGooglemeet style={{marginRight:"5px"}}/>},
        {name:"Meeting Scheduled", path:`/hr/${id}/meet-sch`,icon:<BsPeople style={{marginRight:"5px"}}/>},
        {name:"Closed Meetings", path:`/hr/${id}/closed-meet`,icon:< AiOutlineSchedule style={{marginRight:"5px"}}/>},
        {name:"Pending Task", path:`/hr/${id}/pending-task`,icon:< MdSchedule style={{marginRight:"5px"}}/>}
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

export default HRSideBar;
