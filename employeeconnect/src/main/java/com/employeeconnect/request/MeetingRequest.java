package com.employeeconnect.request;

import java.time.LocalDate;
import java.time.LocalTime;

public class MeetingRequest {
	private Long meetingId;
	private String meetDate;
	private String meetTime;
	private Long hrEmployee;
	private Long employee;
	private boolean meetStatus=false;
	private String meetNotes="";
	private boolean notesAprooveStatus=false;
	private String employeeRemarks="";
	private boolean responseStatus=false;
	private String link;
	
	
	

	public MeetingRequest() {}
	
	
	public Long getMeetingId() {
		return meetingId;
	}


	public void setMeetingId(Long meetingId) {
		this.meetingId = meetingId;
	}


	public boolean isMeetStatus() {
		return meetStatus;
	}


	public void setMeetStatus(boolean meetStatus) {
		this.meetStatus = meetStatus;
	}


	public String getMeetNotes() {
		return meetNotes;
	}


	public void setMeetNotes(String meetNotes) {
		this.meetNotes = meetNotes;
	}


	public boolean isNotesAprooveStatus() {
		return notesAprooveStatus;
	}


	public void setNotesAprooveStatus(boolean notesAprooveStatus) {
		this.notesAprooveStatus = notesAprooveStatus;
	}


	public String getEmployeeRemarks() {
		return employeeRemarks;
	}


	public void setEmployeeRemarks(String employeeRemarks) {
		this.employeeRemarks = employeeRemarks;
	}


	public boolean isResponseStatus() {
		return responseStatus;
	}


	public void setResponseStatus(boolean responseStatus) {
		this.responseStatus = responseStatus;
	}


	public MeetingRequest(String meetDate, String meetTime, Long employee, String link) {
		super();
		this.meetDate = meetDate;
		this.meetTime = meetTime;
		this.employee = employee;
		this.link = link;
	}


	public LocalDate getMeetDate() {
		String[] arr = this.meetDate.split("-");
		int year = Integer.parseInt(arr[0]);
		int month = Integer.parseInt(arr[1]);
		int date = Integer.parseInt(arr[2]);
		return LocalDate.of(year, month, date);
	}

	public void setMeetDate(String meetDate) {
		this.meetDate = meetDate;
	}

	public LocalTime getMeetTime() {
		String[] arr = this.meetTime.split(":");
		int hours = Integer.parseInt(arr[0]);
		int minutes = Integer.parseInt(arr[1]);
		return LocalTime.of(hours, minutes);
	}

	public void setMeetTime(String meetTime) {
		this.meetTime = meetTime;
	}

	
	
	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Long getHrEmployee() {
		return hrEmployee;
	}

	public void setHrEmployee(Long hrEmployee) {
		this.hrEmployee = hrEmployee;
	}

	public Long getEmployee() {
		return employee;
	}

	public void setEmployee(Long employee) {
		this.employee = employee;
	}
	
	
}