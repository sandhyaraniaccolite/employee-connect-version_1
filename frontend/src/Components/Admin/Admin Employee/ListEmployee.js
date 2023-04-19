import React, { useEffect, useState } from 'react';
import { getEmployee, deleteEmployee, getEmpByRole, getEmployeeById, updateEmployee } from '../../Service/EmployeeService';
import {Link, useNavigate } from 'react-router-dom';
import { getRole } from '../../Service/RoleService';
import { useContext } from 'react';
import Context from '../../Authentication';
function ListEmployee(props) {

    const reader = useContext(Context);
    const {id} = reader;
    
    const history = useNavigate();
    const [employees, setEmployees] = useState([]);
    const handleAddUpdate = (employye_id)=>{
        if(employye_id==-1){
            history(`/admin/${id}/addEmployee/-1`);
        }else{
            history(`/admin/${id}/addEmployee/${employye_id}`);
        }
        
    }
    const [curEmp, setCurEmp] = useState(-1);
    const handleDelete = (employee_id)=>{
        getEmployeeById(employee_id).then((res)=>{
            const x = res.data;
            const emp = {
                employeeName:x.employeeName,
                employeeEmail:x.employeeEmail,
                employeeNumber:x.employeeNumber,
                employeeLocation:x.employeeLocation.locationId,
                employeeRole:x.employeeRole.roleId,
                active:false
            }
            if(x.manager!=null){
                emp['manager']=emp.manager.employeeId;
            }updateEmployee(id,employee_id,emp);
        })
        
    }
    const handleView=(employye_id)=>{
        history(`/admin/${id}/viewEmployee/`+employye_id);
    }

    useEffect(()=>{
        
        getEmployee().then((res)=>{
            setEmployees(res.data);
        })
        
    })

    return(
        <div className='contentContainer'>
            <h2 style={{textAlign:'center', marginTop:"30px", color:"white"}}>LIST EMPLOYEE</h2>
            <button className='addEmp' onClick={()=>handleAddUpdate(-1)}>ADD EMPLOYEE</button>
            
            <div className='tableContainer'>
                <table className='center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>E-MAIL</th>
                        <th>ROLE</th>
                        <th>ACIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee)=>{
                        if(employee.active==false){
                            return;
                        }
                        return(
                            <tr>
                        <td>{employee.employeeId}</td>
                        <td>{employee.employeeName}</td>
                        <td>{employee.employeeEmail}</td>
                        <td>{employee.employeeRole.roleName}</td>
                        <td>
                            <button className='update_btn' onClick={()=>handleAddUpdate(employee.employeeId)}>UPDATE</button>
                            <button className='delete_btn' onClick={()=>handleDelete(employee.employeeId)}>DELETE</button>
                            <button className='view_btn' onClick={()=>handleView(employee.employeeId)}>VIEW</button>
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

export default ListEmployee;
