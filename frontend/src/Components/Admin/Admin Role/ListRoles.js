import React, { useEffect, useState } from 'react';
import { deleteRole, getRole, getRoleById, updateRole } from '../../Service/RoleService';
import { useNavigate } from 'react-router-dom';
import Context from '../../Authentication';
import { useContext } from 'react';
function ListRoles(props) {
    const history = useNavigate();
    const reader = useContext(Context);
    const {id} = reader;
    const [roles, setRoles] = useState([])
    useEffect(()=>{
        getRole().then((res)=>{
            setRoles(res.data);
        })
    })

    const handleAddUpdate = (role_id)=>{
        if(role_id==-1){
            history(`/admin/${id}/addRole/-1`);
        }else{
            history(`/admin/${id}/addRole/${role_id}`);
        }
        
    }
    const handleDelete = (role_id)=>{
        getRoleById(role_id).then((res)=>{
            const x = res.data;
            const role = {
                roleName:x.roleName,
                active:false
            }
            updateRole(id,role_id,role);
        })
        
    }


    return (
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px",color:"white"}}>LIST ROLES</h2>
            <button className='addEmp' onClick={()=>handleAddUpdate(-1)}>ADD ROLE</button>
            <div className='tableContainer'>
            <table className='center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ROLE-NAME</th>
                        <th>ACIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role)=>{
                        if(!role.active){
                            return;
                        }
                        return(
                            <tr>
                        <td>{role.roleId}</td>
                        <td>{role.roleName}</td>
                        <td>
                            <button className='update_btn'onClick={()=>handleAddUpdate(role.roleId)}>UPDATE</button>
                            <button className='delete_btn'onClick={()=>handleDelete(role.roleId)}>DELETE</button>
                        </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default ListRoles;