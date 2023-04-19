
import axios from "axios";
const url = "http://localhost:8080/api/v1";
//get

export const getMeetById = (id)=>{
    return axios.get(url+`/meeting/?id=${id}`);
}

// Employee-Meeting
export const getMeetScheduledEmployee = (id)=>{
    return axios.get(url+`/emp-${id}/meeting-scheduled`);
}

export const getEmployeePT=(id)=>{
    return axios.get(url+`/emp-${id}/meeting-pending`);
}

export const updateByEmployee = (empId,id,meeting)=>{
    return axios.put(url+`/emp-${empId}/meeting/${id}`,meeting);
}

export const getEmployeeClosedMeet = (empId)=>{
    return axios.get(url+`/emp-${empId}/meeting-closed`);
}

export const getEmployeeMissedMeet = (empId)=>{
    return axios.get(url+`/emp-${empId}/missed-meeting`);
}

//HR meet

export const scheduleMeet = (hrId, meet)=>{
    return axios.post(url+`/hr-${hrId}/meeting`, meet)
}

export const getMeetScheduledHR = (id)=>{
    return axios.get(url+`/hr-${id}/meeting-scheduled`);
}

export const updateByHR = (hrId,id,meeting)=>{
    return axios.put(url+`/hr-${hrId}/meeting/${id}`,meeting);
}

export const getHRClosedMeet = (hrId)=>{
    return axios.get(url+`/hr-${hrId}/meeting-closed`);
}

export const getHRPT=(id)=>{
    return axios.get(url+`/hr-${id}/meeting-pending`);
}

export const getHRMissedMeet = (hrId)=>{
    return axios.get(url+`/hr-${hrId}/missed-meeting`);
}

export const deleteMeet = (hrId,meet_id)=>{
    return axios.delete(url+`/hr-${hrId}/meeting/${meet_id}`);
}

// Manager
export const managerEmployeeCon = (manId)=>{
    return axios.get(url+`/manager-${manId}/repotees`)
}