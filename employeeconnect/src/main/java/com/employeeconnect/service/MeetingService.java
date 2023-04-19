package com.employeeconnect.service;

import java.time.LocalDate;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.employeeconnect.dao.MeetingDAO;
import com.employeeconnect.exception.ResourceNotFoundException;
import com.employeeconnect.model.Employee;
import com.employeeconnect.model.Meeting;
import com.employeeconnect.request.MeetingRequest;
import com.employeeconnect.util.EmployeeUtil;


@Service
public class MeetingService {
	@Autowired
	private MeetingDAO repository;
	
	@Autowired
	private EmployeeUtil empUtil;
	
	@Autowired
	private EmailService emailService;
	
	public ResponseEntity<Meeting> addMeeting(Long hrId, MeetingRequest meetingReq) {
		Employee employee = empUtil.checkByRole(meetingReq.getEmployee(),"Employee");
		Employee manager = empUtil.checkByRole(meetingReq.getEmployee(),"Manager");
		Employee hr = empUtil.checkByRole(hrId,"HR");
		System.out.println(manager);
		if(hr==null || (employee==null&&manager==null)) {
			return new ResponseEntity<Meeting>((Meeting)null,HttpStatus.BAD_REQUEST);
		}
		if(employee==null) {
			employee=manager;
		}
		Meeting meeting = new Meeting(meetingReq.getMeetDate(), meetingReq.getMeetTime(),meetingReq.getLink(),hr, employee);
		Meeting saved = repository.save(meeting);
		return new ResponseEntity<Meeting>(saved, HttpStatus.CREATED);
	}
	
	public ResponseEntity<List<Meeting>> getAllMeeting() {
		return new ResponseEntity<List<Meeting>>(repository.findAll(), HttpStatus.OK);
	}
	
	
	public ResponseEntity<Meeting> updateMeetingHr(Long hrId, Long id, MeetingRequest meetingRequest){
		if(empUtil.checkByRole(hrId,"HR")==null) {
			return new ResponseEntity<Meeting>((Meeting)null,HttpStatus.BAD_REQUEST);
		}
		
		
		
		try {
			Meeting oldMeet = findById(id).getBody();
			oldMeet.setMeetDate(meetingRequest.getMeetDate());
			oldMeet.setMeetTime(meetingRequest.getMeetTime());
			oldMeet.setMeetStatus(meetingRequest.isMeetStatus());
			oldMeet.setMeetNotes(meetingRequest.getMeetNotes());
			oldMeet.setLink(meetingRequest.getLink());
			Meeting updatedMeet = repository.save(oldMeet);
			return new ResponseEntity<Meeting>(updatedMeet, HttpStatus.CREATED);
		}catch(Exception e) {
			
			return new ResponseEntity<Meeting>((Meeting)null,HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<Meeting> updateMeetingEmployee(Long empId, Long id, MeetingRequest meetingRequest){
		Employee employee = empUtil.checkByRole(empId,"Employee");
		Employee manager = empUtil.checkByRole(empId,"Manager");
		if(employee==null&&manager==null) {
			return new ResponseEntity<Meeting>((Meeting)null,HttpStatus.BAD_REQUEST);
		}
		if(employee==null) {
			employee=manager;
		}
		
		try {
			Meeting oldMeet = findById(id).getBody();
			oldMeet.setNotesAprooveStatus(meetingRequest.isNotesAprooveStatus());
			oldMeet.setEmployeeRemarks(meetingRequest.getEmployeeRemarks());
			oldMeet.setResponseStatus(meetingRequest.isResponseStatus());
			Meeting updatedMeet = repository.save(oldMeet);
			return new ResponseEntity<Meeting>(updatedMeet, HttpStatus.CREATED);
		}catch(Exception e) {
			return new ResponseEntity<Meeting>((Meeting)null,HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<Meeting> findById(Long id){
		try {
			Meeting meeting = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Meeting not exist with id: "+id));
			return new ResponseEntity<Meeting>(meeting,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<Meeting>((Meeting)null,HttpStatus.BAD_REQUEST);
		}
		
	}
	
	public ResponseEntity<Boolean> deleteById(Long hrId, Long id) {
		if(empUtil.checkByRole(hrId,"HR")==null) {
			return new ResponseEntity<Boolean>(Boolean.FALSE,HttpStatus.BAD_REQUEST);
		}
		try {
			Meeting meeting = findById(id).getBody();
			repository.delete(meeting);
			return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			return new ResponseEntity<Boolean>(Boolean.FALSE,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	public ResponseEntity<List<Meeting>> employeeSheduledMeet(Long empId){
		Employee employee = empUtil.checkByRole(empId,"Employee");
		Employee manager = empUtil.checkByRole(empId,"Manager");
		if(employee==null&&manager==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		if(employee==null) {
			employee=manager;
		}
		List<Meeting> meetings = repository.findByEmployeeAndMeetStatusAndNotesAprooveStatus(employee,false,false);
		return new ResponseEntity<List<Meeting>>(meetings, HttpStatus.OK);
	}
	
	public ResponseEntity<List<Meeting>> employeePendingMeet(Long empId){
		Employee employee = empUtil.checkByRole(empId,"Employee");
		Employee manager = empUtil.checkByRole(empId,"Manager");
		if(employee==null&&manager==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		if(employee==null) {
			employee=manager;
		}
		
		List<Meeting> meetings = repository.findByEmployeeAndMeetStatusAndNotesAprooveStatus(employee,true,false);
		return new ResponseEntity<List<Meeting>>(meetings, HttpStatus.OK);
	}
	
	public ResponseEntity<List<Meeting>> employeeClosedMeet(Long empId){
		Employee employee = empUtil.checkByRole(empId,"Employee");
		Employee manager = empUtil.checkByRole(empId,"Manager");
		if(employee==null&&manager==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		if(employee==null) {
			employee=manager;
		}
		
		List<Meeting> meetings = repository.findByEmployeeAndMeetStatusAndNotesAprooveStatus(employee,true,true);
		return new ResponseEntity<List<Meeting>>(meetings, HttpStatus.OK);
	}
	
	public ResponseEntity<List<Meeting>> employeeAllMeet(Long empId){
		Employee employee = empUtil.checkByRole(empId,"Employee");
		Employee manager = empUtil.checkByRole(empId,"Manager");
		if(employee==null&&manager==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		if(employee==null) {
			employee=manager;
		}
		List<Meeting> meetings = repository.findByEmployee(employee);
		return new ResponseEntity<List<Meeting>>(meetings, HttpStatus.OK);
	}
	
	public ResponseEntity<List<Meeting>> hrSheduledMeet(Long hrId){
		Employee hr = empUtil.checkByRole(hrId,"HR");
		if(hr==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		
		List<Meeting> meetings = repository.findByHrEmployeeAndMeetStatusAndNotesAprooveStatus(hr,false,false);
		return new ResponseEntity<List<Meeting>>(meetings, HttpStatus.OK);
	}
	
	public ResponseEntity<List<Meeting>> hrPendingMeet(Long hrId){
		Employee hr = empUtil.checkByRole(hrId,"HR");
		if(hr==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		
		List<Meeting> meetings = repository.findByHrEmployeeAndMeetStatusAndNotesAprooveStatus(hr,true,false);
		return new ResponseEntity<List<Meeting>>(meetings, HttpStatus.OK);
	}
	
	public ResponseEntity<List<Meeting>> hrClosedMeet(Long hrId){
		Employee hr = empUtil.checkByRole(hrId,"HR");
		if(hr==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		
		List<Meeting> meetings = repository.findByHrEmployeeAndMeetStatusAndNotesAprooveStatus(hr,true,true);
		return new ResponseEntity<List<Meeting>>(meetings, HttpStatus.OK);
	}
	
	public ResponseEntity<List<Meeting>> hrAllMeet(Long hrId){
		Employee hr = empUtil.checkByRole(hrId,"HR");
		if(hr==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		List<Meeting> meetings = repository.findByHrEmployee(hr);
		return new ResponseEntity<List<Meeting>>(meetings, HttpStatus.OK);
		
	}
	
	public ResponseEntity<List<Meeting>> employeeMissedMeet(Long empId){
		Employee employee = empUtil.checkByRole(empId,"Employee");
		Employee manager = empUtil.checkByRole(empId,"Manager");
		if(employee==null&&manager==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		if(employee==null) {
			employee=manager;
		}
		List<Meeting> meets = employeeAllMeet(empId).getBody();
		if(meets==null) return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		List<Meeting> out = new ArrayList<>();
		for(Meeting x:meets) {
			LocalDate deadLine = x.getDeadLine();
			if(deadLine==null) {
				continue;
			}
			LocalDate today = LocalDate.now();
			if(deadLine.isBefore(today) && !x.isResponseStatus()) {
				out.add(x);
			}
		}
		return new ResponseEntity<List<Meeting>>(out, HttpStatus.OK);
		
	}
	
	
	public ResponseEntity<List<Meeting>> hrMissedMeet(Long hrId){
		Employee employee = empUtil.checkByRole(hrId,"HR");
		if(employee==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		List<Meeting> meets = employeeAllMeet(hrId).getBody();
		if(meets==null) return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		List<Meeting> out = new ArrayList<>();
		for(Meeting x:meets) {
			LocalDate deadLine = x.getDeadLine();
			if(deadLine==null) {
				continue;
			}
			LocalDate today = LocalDate.now();
			if(deadLine.isBefore(today) && !x.isResponseStatus()) {
				out.add(x);
			}
		}
		return new ResponseEntity<List<Meeting>>(out, HttpStatus.OK);
		
	}

	public ResponseEntity<List<Meeting>> managerEmployee(Long manId){
		Employee employee = empUtil.checkByRole(manId,"Manager");
		if(employee==null) {
			return new ResponseEntity<List<Meeting>>((List<Meeting>)null,HttpStatus.BAD_REQUEST);
		}
		List<Meeting> meet = repository.findByEmployeeManagerEmployeeId(manId);
		return new ResponseEntity<List<Meeting>>(meet, HttpStatus.OK);
	}
	
	
	public void sendEmail(String to, String cc) {
        String subject = "Employee";
        String body = "Employee please respond to the pending task";

        emailService.sendEmail(to, subject, body,cc);
    }
	
	@Scheduled(cron = "0 0 10 * * *")
	public void sendDailyEmailToPTEmployee() {
		List<Meeting> meets = repository.findByMeetStatusAndResponseStatus(true,false);
		for(Meeting x:meets) {
			if(x.getCounter()<4) {
				sendEmail(x.getEmployee().getEmployeeEmail(),"");
			}else if(x.getCounter()>=4) {
				if(x.getEmployee().getManager()!=null) {
					sendEmail(x.getEmployee().getEmployeeEmail(),x.getEmployee().getManager().getEmployeeEmail());
				}else {
					sendEmail(x.getEmployee().getEmployeeEmail(),"");
				}
			}
		}
	}

}
