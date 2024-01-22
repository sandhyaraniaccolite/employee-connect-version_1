import axios from "axios";
const url = "http://localhost:8080/api/v1";

export const getRole=()=>{
    return axios.get(url+"/role");
}

export const deleteRole=(adId,id)=>{
    return axios.delete(url+`/admin-${adId}/role/${id}`);
}

export const getRoleById=(id)=>{
    return axios.get(url+`/role/?id=${id}`);
}

export const addRole=(adId,role)=>{
    return axios.post(url+`/admin-${adId}/role`,role);
}

export const updateRole=(adId,id,role)=>{
    return axios.put(url+`/admin-${adId}/role/${id}`,role);
}
