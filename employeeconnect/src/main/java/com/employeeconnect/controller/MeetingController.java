package com.employeeconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employeeconnect.model.Meeting;
import com.employeeconnect.request.MeetingRequest;
import com.employeeconnect.service.MeetingService;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class MeetingController {
	
	@Autowired
	private MeetingService service; 
	
	@GetMapping("/meeting")
	public ResponseEntity<List<Meeting>> getAllMeeting(){
		return service.getAllMeeting();
	}
	
	@PostMapping("/hr-{hrId}/meeting")
	public ResponseEntity<Meeting> addMeeting(@PathVariable Long hrId, @RequestBody MeetingRequest meetingRequest) {
		return service.addMeeting(hrId,meetingRequest);
	}
	
	@PutMapping("/hr-{hrId}/meeting/{id}")
	public ResponseEntity<Meeting> updateMeetingByHrId(@PathVariable Long hrId, @PathVariable Long id, @RequestBody MeetingRequest meetingRequest){
		System.out.println(1);
		return service.updateMeetingHr(hrId,id,meetingRequest);
		
	}
	
	@PutMapping("/emp-{empId}/meeting/{id}")
	public ResponseEntity<Meeting> updateMeetingByEmpId(@PathVariable Long empId, @PathVariable Long id, @RequestBody MeetingRequest meetingRequest){
		return service.updateMeetingEmployee(empId,id,meetingRequest);
	}
	
	@GetMapping("/meeting/")
	public ResponseEntity<Meeting> getById(@RequestParam("id") Long id){
		ResponseEntity<Meeting> meeting = service.findById(id);
		return meeting;
	}
	
	
	@DeleteMapping("/hr-{hrId}/meeting/{id}")
	public ResponseEntity<Boolean> deleteById(@PathVariable Long hrId, @PathVariable Long id) {
		return service.deleteById(hrId,id);
	}
	
	@GetMapping("/emp-{empId}/meeting-scheduled")
	public ResponseEntity<List<Meeting>> employeeSheduledMeet(@PathVariable Long empId){
		return service.employeeSheduledMeet(empId);
	}
	
	@GetMapping("/emp-{empId}/meeting-pending")
	public ResponseEntity<List<Meeting>> employeePendingMeet(@PathVariable Long empId){
		return service.employeePendingMeet(empId);
	}
	
	@GetMapping("/emp-{empId}/meeting-closed")
	public ResponseEntity<List<Meeting>> employeeClosedMeet(@PathVariable Long empId){
		return service.employeeClosedMeet(empId);
	}
	
	@GetMapping("/emp-{empId}/meeting-all")
	public ResponseEntity<List<Meeting>> employeeAllMeet(@PathVariable Long empId){
		return service.employeeAllMeet(empId);
	}
	
	@GetMapping("/hr-{hrId}/meeting-scheduled")
	public ResponseEntity<List<Meeting>> hrSheduledMeet(@PathVariable Long hrId){
		return service.hrSheduledMeet(hrId);
	}
	
	@GetMapping("/hr-{hrId}/meeting-pending")
	public ResponseEntity<List<Meeting>> hrPendingMeet(@PathVariable Long hrId){
		return service.hrPendingMeet(hrId);
	}
	
	@GetMapping("/hr-{hrId}/meeting-closed")
	public ResponseEntity<List<Meeting>> hrClosedMeet(@PathVariable Long hrId){
		return service.hrClosedMeet(hrId);
	}
	
	@GetMapping("/hr-{hrId}/meeting-all")
	public ResponseEntity<List<Meeting>> hrAllMeet(@PathVariable Long hrId){
		return service.hrAllMeet(hrId);
	}
	
	@GetMapping("/emp-{empId}/missed-meeting")
	public ResponseEntity<List<Meeting>> employeeMissedMeet(@PathVariable Long empId){
		return service.employeeMissedMeet(empId);
	}
	
	@GetMapping("/hr-{hrId}/missed-meeting")
	public ResponseEntity<List<Meeting>> hrMissedMeet(@PathVariable Long hrId){
		return service.hrMissedMeet(hrId);
	}
	
	@GetMapping("/manager-{manId}/repotees")
	public ResponseEntity<List<Meeting>> manRepotees(@PathVariable Long manId){
		return service.managerEmployee(manId);
	}
}


