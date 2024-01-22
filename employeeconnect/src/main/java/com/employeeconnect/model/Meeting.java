package com.employeeconnect.model;

import java.time.LocalDate;
import java.time.LocalTime;


import javax.persistence.*;

@Entity
public class Meeting {
	
	@Id
	@Column(name = "meet_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long meetingId;
	@Column(name = "meet_date")
	private LocalDate meetDate;
	@Column(name = "meet_time")
	private LocalTime meetTime;
	@Column(name = "meet_status")
	private boolean meetStatus=false;
	@Column(name = "meet_notes")
	private String meetNotes="";
	@Column(name = "meet_aproove_status")
	private boolean notesAprooveStatus=false;
	@Column(name = "meet_remarks")
	private String employeeRemarks="";
	@Column(name = "response_status")
	private boolean responseStatus=false;
	@Column(name = "meet_link")
	private String link;
	@Column(name="meet_deadline")
	private LocalDate deadLine;
	@Column(name="counter")
	private int counter=0;
	
	@ManyToOne
	@JoinColumn(name = "hr_emp_id", referencedColumnName = "emp_id")
	private Employee hrEmployee;
	
	@ManyToOne
	@JoinColumn(name = "emp_id", referencedColumnName = "emp_id")
	private Employee employee;
	
	
	
	public int getCounter() {
		return counter;
	}

	public void setCounter(int counter) {
		this.counter = counter;
	}

	public void setDeadLine(LocalDate deadLine) {
		this.deadLine = deadLine;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
	
	public Meeting() {}
	
	public Meeting(LocalDate meetDate, LocalTime meetTime, String link, Employee hrEmployee, Employee employee) {
		super();
		this.meetDate = meetDate;
		this.meetTime = meetTime;
		this.link = link;
		this.hrEmployee = hrEmployee;
		this.employee = employee;
	}

	public boolean isResponseStatus() {
		return responseStatus;
	}

	public void setResponseStatus(boolean responseStatus) {
		this.responseStatus = responseStatus;
	}

	public Long getMeetingId() {
		return meetingId;
	}

	public void setMeetingId(Long meetingId) {
		this.meetingId = meetingId;
	}

	public LocalDate getMeetDate() {
		return meetDate;
	}

	public void setMeetDate(LocalDate meetDate) {
		this.meetDate = meetDate;
	}

	public LocalTime getMeetTime() {
		return meetTime;
	}

	public void setMeetTime(LocalTime meetTime) {
		this.meetTime = meetTime;
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
		setCounter(0);
		setDeadLine();
		setResponseStatus(false);
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
		setResponseStatus(true);
		this.employeeRemarks = employeeRemarks;
	}

	public Employee getHrEmployee() {
		return hrEmployee;
	}

	public void setHrEmployee(Employee hrEmployee) {
		this.hrEmployee = hrEmployee;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public LocalDate getDeadLine() {
		return deadLine;
	}

	public void setDeadLine() {
		LocalDate date = LocalDate.now();
		date=date.plusDays(4);
		this.deadLine = date;
	}
	
	
	
}
