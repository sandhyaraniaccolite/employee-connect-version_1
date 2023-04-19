import React, { useState, useEffect } from 'react';
import { addRole, getRole, getRoleById, updateRole } from '../../Service/RoleService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Authentication';
function AddOrUpdateRole(props) {
    const reader = useContext(Context);
    const {id} = reader;
    const history = useNavigate();
    const path = window.location.pathname;
    const arr = path.split('/');
    const role_id = arr[arr.length-1];
    const [name,setName] = useState("");
    useEffect(()=>{
        if(role_id!=-1){
            getRoleById(role_id).then((res)=>{
                const role = res.data;
                setName(role.roleName);
            })
        }
    },[]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(name!==""){   
            const role = {
                roleName:name,
                active:true
            }
            if(role_id==-1){
                addRole(id,role);
            }else{
                console.log(role);
                updateRole(id,role_id,role);
            }
            history(`/admin/${id}/role`);
            return;
        }
        console.log("NOT ADDED")
    }

    const handleCancel = ()=>{
        setName("");
        history(`/admin/${id}/role`);
    }

    const getTitle=()=>{
        if(role_id==-1){
            return <h2>ADD ROLE</h2>
        }
        return <h2>UPDATE ROLE</h2>
    }

    const getButton=()=>{
        if(role_id==-1){
            return < button className='add' onClick={handleSubmit}>ADD</button>
        }
        return < button className='add' onClick={handleSubmit}>UPDATE</button>
    }

    return (
        <div className='contentContainer'>
            <div className='card'>
            {getTitle()}
            <form>
                <div>
                <label>NAME: </label>
                <input 
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required/>
                </div>
                
                <div>
                {getButton()}
                < button className='add' onClick={handleCancel}>CANCEL</button>
                </div>
                 
            </form>
            </div>
        </div>
    );
}

export default AddOrUpdateRole;

