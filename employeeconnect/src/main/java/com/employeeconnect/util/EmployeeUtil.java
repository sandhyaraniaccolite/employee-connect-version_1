package com.employeeconnect.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.employeeconnect.dao.EmployeeDAO;
import com.employeeconnect.model.Employee;

@Controller
public class EmployeeUtil {
	@Autowired
	private EmployeeDAO empRepo;
	
	public Employee checkById(Long id) {
		return empRepo.findById(id).orElse(null);
	}
	
	public Employee checkByRole(Long id, String role) {
		Employee employee = checkById(id);
		if(employee==null)return null;
		if(employee.getEmployeeRole().getRoleName().equals(role))return employee;
		return null;
	}
}
