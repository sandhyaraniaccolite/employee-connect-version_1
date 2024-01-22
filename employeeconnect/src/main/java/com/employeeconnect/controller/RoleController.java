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

import com.employeeconnect.model.Role;
import com.employeeconnect.service.RoleService;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class RoleController {
	@Autowired
	private RoleService service;
	
	
	@GetMapping("/role")
	public ResponseEntity<List<Role>> getAllRolesDefault(){
		return service.getAllRole();
	}
	
	@PostMapping("/admin-{adId}/role")
	public ResponseEntity<Role> addRole(@PathVariable Long adId,@RequestBody Role role) {
		return service.addRole(adId, role);
	}
	
	@PostMapping("/role")
	public ResponseEntity<Role> defAddRole(@RequestBody Role role) {
		return service.addRole((long)-1,role);
	}
	
	@PutMapping("/admin-{adId}/role/{id}")
	public ResponseEntity<Role> updateRoleById(@PathVariable Long adId,@PathVariable Long id, @RequestBody Role role){
		return service.updateRole(adId,id,role);
	}
	
	@GetMapping("/role/")
	public ResponseEntity<Role> getById(@RequestParam("id") Long id){
		return service.findById(id);
	}
	
	@DeleteMapping("/admin-{adId}/role/{id}")
	public ResponseEntity<Boolean> deleteById(@PathVariable Long adId,@PathVariable Long id) {
		return service.deleteById(adId, id);
	}
}
