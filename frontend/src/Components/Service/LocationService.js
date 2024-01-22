import axios from "axios";
const url = "http://localhost:8080/api/v1";

export const getLocation=()=>{
    return axios.get(url+"/location");
}

export const getLocationById=(id)=>{
    return axios.get(url+"/location/?id="+id);
}

export const addLocation=(adId, location)=>{
    return axios.post(url+`/admin-${adId}/location`, location);
}

export const updateLocation=(adId, id, location)=>{
    return axios.put(url+`/admin-${adId}/location/${id}`,location);
}

export const deleteLocation = (adId, id)=>{
    return axios.delete(url+`/admin-${adId}/location/${id}`)
}