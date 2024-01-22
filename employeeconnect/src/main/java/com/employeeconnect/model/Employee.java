package com.employeeconnect.model;



import javax.persistence.*;

@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "emp_id")
	private Long employeeId;
	@Column(name="emp_name")
	private String employeeName;
	@Column(name="emp_email")
	private String employeeEmail;
	@Column(name="emp_number")
	private String employeeNumber;
	@Column(name="active")
	private boolean active=true;
	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}
	@ManyToOne
	@JoinColumn(name = "manager_id", referencedColumnName = "emp_id")
	private Employee manager;
	
	@ManyToOne
	@JoinColumn(name = "loc_id", referencedColumnName = "loc_id")
	private Location employeeLocation;
	
	@ManyToOne
	@JoinColumn(name = "role_id", referencedColumnName = "role_id")
	private Role employeeRole;
	
	
	public Employee() {}
	
	
	public Employee(String employeeName, String employeeEmail, String employeeNumber) {
		super();
		this.employeeName = employeeName;
		this.employeeEmail = employeeEmail;
		this.employeeNumber = employeeNumber;
	}

	
	
	


	public Employee getManager() {
		return manager;
	}


	public void setManager(Employee manager) {
		this.manager = manager;
	}


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

	public Location getEmployeeLocation() {
		return employeeLocation;
	}

	public void setEmployeeLocation(Location employeeLocation) {
		this.employeeLocation = employeeLocation;
	}

	public Role getEmployeeRole() {
		return employeeRole;
	}

	public void setEmployeeRole(Role employeeRole) {
		this.employeeRole = employeeRole;
	}
	
	
	
}

