package com.employeeconnect.request;

public class EmployeeRequest {
	private Long employeeId;
	private String employeeName;
	private String employeeEmail;
	private String employeeNumber;
	private Long employeeLocation;
	private Long employeeRole;
	private Long manager;
	private boolean active=true;
	
	
	
	
	
	
	public Long getManager() {
		return manager;
	}

	public void setManager(Long manager) {
		this.manager = manager;
	}

	public EmployeeRequest(String employeeName, String employeeEmail, String employeeNumber,
			Long employeeLocation, Long employeeRole, Long manager) {
		super();
		this.employeeName = employeeName;
		this.employeeEmail = employeeEmail;
		this.employeeNumber = employeeNumber;
		this.employeeLocation = employeeLocation;
		this.employeeRole = employeeRole;
		this.manager=manager;
	}
	
	
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public EmployeeRequest() {}
	public Long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getEmployeeEmail() {
		return employeeEmail;
	}
	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}
	public String getEmployeeNumber() {
		return employeeNumber;
	}
	public void setEmployeeNumber(String employeeNumber) {
		this.employeeNumber = employeeNumber;
	}
	public Long getEmployeeLocation() {
		return employeeLocation;
	}
	public void setEmployeeLocation(Long employeeLocation) {
		this.employeeLocation = employeeLocation;
	}
	public Long getEmployeeRole() {
		return employeeRole;
	}
	public void setEmployeeRole(Long employeeRole) {
		this.employeeRole = employeeRole;
	}
	
	
}


