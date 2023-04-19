package com.employeeconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.employeeconnect.model.Employee;
import com.employeeconnect.model.Location;
import com.employeeconnect.model.Role;
import com.employeeconnect.request.EmployeeRequest;
import com.employeeconnect.util.EmployeeUtil;
import com.employeeconnect.util.LocationUtil;
import com.employeeconnect.util.RoleUtil;
import com.employeeconnect.exception.ResourceNotFoundException;
import com.employeeconnect.dao.EmployeeDAO;
@Service
public class EmployeeService {
	@Autowired
	private EmployeeDAO repository;
	@Autowired
	private EmployeeUtil empUtil;
	@Autowired
	private LocationUtil locUtil;
	@Autowired
	private RoleUtil roleUtil;
	
	public ResponseEntity<Employee> addEmployee(Long adminId, EmployeeRequest employeeReq) {
		
		if(adminId!=-1 && empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Employee>((Employee)null, HttpStatus.BAD_REQUEST);
		}
		
		Employee employee = new Employee();
		Location location = locUtil.checkById(employeeReq.getEmployeeLocation());
		Role role = roleUtil.checkById(employeeReq.getEmployeeRole());
		
		if(location==null || role==null) {
			return new ResponseEntity<Employee>((Employee)null, HttpStatus.BAD_REQUEST);
		}
		
		Employee manager = null;
		if(role.getRoleName().equals("Employee")) {
			if(employeeReq.getManager()==null) {
				return new ResponseEntity<Employee>((Employee)null, HttpStatus.BAD_REQUEST);
			}
			manager = empUtil.checkByRole(employeeReq.getManager(),"Manager");
			if(manager==null) {
				return new ResponseEntity<Employee>((Employee)null, HttpStatus.BAD_REQUEST);
			}
		}
		
		employee.setEmployeeName(employeeReq.getEmployeeName());
		employee.setEmployeeEmail(employeeReq.getEmployeeEmail());
		employee.setEmployeeNumber(employeeReq.getEmployeeNumber());
		employee.setManager(manager);
		employee.setEmployeeLocation(location);
		employee.setEmployeeRole(role);
		
		Employee saved = repository.save(employee);
		return new ResponseEntity<Employee>(saved, HttpStatus.CREATED);
	}
	
	public ResponseEntity<List<Employee>> getAllEmployee() {
		return new ResponseEntity<List<Employee>>(repository.findAll(), HttpStatus.OK);
	}
	
	public ResponseEntity<Employee> updateEmployee(Long adminId, Long id, EmployeeRequest newEmployeeReq){
		if(empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Employee>((Employee)null, HttpStatus.BAD_REQUEST);
		}
		Location location = locUtil.checkById(newEmployeeReq.getEmployeeLocation());
		Role role = roleUtil.checkById(newEmployeeReq.getEmployeeRole());
		if(location==null || role==null) {
			return new ResponseEntity<Employee>((Employee)null, HttpStatus.BAD_REQUEST);
		}
		Employee manager = null;
		if(role.getRoleName().equals("Employee")) {
			if(newEmployeeReq.getManager()==null) {
				return new ResponseEntity<Employee>((Employee)null, HttpStatus.BAD_REQUEST);
			}
			manager = empUtil.checkByRole(newEmployeeReq.getManager(),"Manager");
			if(manager==null) {
				return new ResponseEntity<Employee>((Employee)null, HttpStatus.BAD_REQUEST);
			}
		}
		Employee oldEmployee = findById(id).getBody();
		oldEmployee.setEmployeeName(newEmployeeReq.getEmployeeName());
		oldEmployee.setEmployeeEmail(newEmployeeReq.getEmployeeEmail());
		oldEmployee.setEmployeeNumber(newEmployeeReq.getEmployeeNumber());
		oldEmployee.setEmployeeLocation(location);
		oldEmployee.setManager(manager);
		oldEmployee.setEmployeeRole(role);
		oldEmployee.setActive(newEmployeeReq.isActive());
		Employee updatedEmployee = repository.save(oldEmployee);
		return new ResponseEntity<Employee>(updatedEmployee, HttpStatus.CREATED);
		
	}
	
	public ResponseEntity<Employee> findById(Long id){
		try {
			Employee employee = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Employee not exist with id: "+id));
			return new ResponseEntity<Employee>(employee,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<Employee>((Employee)null,HttpStatus.OK);
		}
	}
	
	public ResponseEntity<Boolean> deleteById(Long adminId, Long id) {
		if(empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.NO_CONTENT);
		}
		try {
			Employee employee = findById(id).getBody();
			repository.delete(employee);
			return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.NO_CONTENT);
		}
		
	}
	
	public ResponseEntity<List<Employee>> findByLocation(String name){
		return new ResponseEntity<List<Employee>>(repository.findByEmployeeLocationLocationName(name),HttpStatus.OK);
	}
	
	public ResponseEntity<List<Employee>> findByRole(String name){
		return new ResponseEntity<List<Employee>>(repository.findByEmployeeRoleRoleName(name),HttpStatus.OK);
	}
	
	public ResponseEntity<List<Employee>> findByName(String name){
		return new ResponseEntity<List<Employee>>(repository.findByEmployeeNameStartsWith(name),HttpStatus.OK);
	}
	
	public Employee customFindById(Long id) {
		Employee employee = repository.findById(id).orElse(null);
		System.out.println(id);
		return employee;
	}
	
}
