import axios from "axios";
const url = "http://localhost:8080/api/v1";

export const getEmployee=()=>{
    return axios.get(url+"/employee");
}

export const getEmployeeById = (empId)=>{
    return axios.get(url+"/employee/?id="+empId);
}

export const addEmployee = (adId, employee)=>{
    return axios.post(url+`/admin-${adId}/employee`, employee);
}

export const getAllManager = ()=>{
    return axios.get(url+"/employee/role=Manager");
}

export const getEmpByRole = (role)=>{
    return axios.get(url+"/employee/role="+role);
}

export const getAllEmployee = ()=>{
    return axios.get(url+"/employee/role=Employee");
}

export const deleteEmployee = (adId,id)=>{
    return axios.delete(url+`/admin-${adId}/employee/${id}`);
}


export const updateEmployee = (adId, id, employee)=>{
    return axios.put(url+`/admin-${adId}/employee/${id}`,employee)
}