package com.employeeconnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.employeeconnect.dao.RoleDAO;
import com.employeeconnect.exception.ResourceNotFoundException;
import com.employeeconnect.model.Role;
import com.employeeconnect.util.EmployeeUtil;

@Service
public class RoleService {
	@Autowired
	private RoleDAO repository;

	@Autowired
	private EmployeeUtil empUtil;
	
	public ResponseEntity<Role> addRole(Long adminId, Role role) {
		if(adminId!=-1 && empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Role>((Role)null, HttpStatus.BAD_REQUEST);
		}
		Role saved = repository.save(role);
		return new ResponseEntity<Role>(saved, HttpStatus.CREATED);
	}
	
	public ResponseEntity<List<Role>> getAllRole() {
		return new ResponseEntity<List<Role>>(repository.findAll(), HttpStatus.OK);
	}
	
	public ResponseEntity<Role> updateRole(Long adminId, Long id, Role newRole){
		if(empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Role>((Role)null, HttpStatus.BAD_REQUEST);
		}
		try {
			Role oldRole = findById(id).getBody();
			oldRole.setRoleName(newRole.getRoleName());
			oldRole.setActive(newRole.isActive());
			Role updatedRole = repository.save(oldRole);
			return new ResponseEntity<Role>(updatedRole, HttpStatus.CREATED);
		}catch(Exception e) {
			return new ResponseEntity<Role>((Role)null, HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<Role> findById(Long id){
		try {
			Role role = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Role not exist with id: "+id));
			return new ResponseEntity<Role>(role,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<Role>((Role)null, HttpStatus.BAD_REQUEST);
		}
		
	}
	
	public ResponseEntity<Boolean> deleteById(Long adminId, Long id) {
		if(empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
		}
		try {
			Role role = findById(id).getBody();
			repository.delete(role);
			return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
		}
	}
	
	public Role customFindById(Long id) {
		Optional<Role> role = repository.findById(id);
		if (role.isEmpty()) {
			return null;
		}
		return role.get();
	}

}
