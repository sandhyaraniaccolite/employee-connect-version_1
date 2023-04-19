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

import com.employeeconnect.model.Employee;
import com.employeeconnect.request.EmployeeRequest;
import com.employeeconnect.service.EmployeeService;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
	@Autowired
	private EmployeeService service;
	@GetMapping("/employee")
	public ResponseEntity<List<Employee>> getAllEmployeesDefault(){
		return service.getAllEmployee();
	}
	
	@PostMapping("/admin-{adId}/employee")
	public ResponseEntity<Employee> addEmployee(@PathVariable Long adId,@RequestBody EmployeeRequest employeeRequest) {
		return service.addEmployee(adId,employeeRequest);
	}
	
	@PostMapping("/employee")
	public ResponseEntity<Employee> defaultAddEmployee(@RequestBody EmployeeRequest employeeRequest) {
		return service.addEmployee((long)-1, employeeRequest);		
	}
	
	@PutMapping("/admin-{adId}/employee/{id}")
	public ResponseEntity<Employee> updateEmployeeById(@PathVariable Long adId,@PathVariable Long id, @RequestBody EmployeeRequest employeeRequest){
		return service.updateEmployee(adId,id,employeeRequest);
		
	}
	
	@GetMapping("/employee/")
	public ResponseEntity<Employee> getById(@RequestParam("id") Long id){
		ResponseEntity<Employee> employee = service.findById(id);
		return employee;
	}
	
	
	@DeleteMapping("/admin-{adId}/employee/{id}")
	public ResponseEntity<Boolean> deleteById(@PathVariable Long adId,@PathVariable Long id) {
		return service.deleteById(adId,id);
	}
	
	
	@GetMapping("/employee/loc={name}")
	public ResponseEntity<List<Employee>> findByLocation(@PathVariable String name){
		return service.findByLocation(name);
	}
	
	@GetMapping("/employee/role={name}")
	public ResponseEntity<List<Employee>> findByRole(@PathVariable String name){
		return service.findByRole(name);
	}
	
	@GetMapping("/employee/{name}")
	public ResponseEntity<List<Employee>> findByName(@PathVariable String name){
		return service.findByName(name);
	}
}