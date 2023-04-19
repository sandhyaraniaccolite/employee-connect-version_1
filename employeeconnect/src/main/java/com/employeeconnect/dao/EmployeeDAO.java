package com.employeeconnect.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employeeconnect.model.Employee;

@Repository
public interface EmployeeDAO extends JpaRepository<Employee, Long>{
	public List<Employee> findByEmployeeLocationLocationName(String name);
	public List<Employee> findByEmployeeRoleRoleName(String name);
	public List<Employee> findByEmployeeNameStartsWith(String name);
}