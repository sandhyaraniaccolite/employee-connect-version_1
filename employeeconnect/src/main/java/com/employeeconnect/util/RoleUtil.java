package com.employeeconnect.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.employeeconnect.dao.RoleDAO;
import com.employeeconnect.model.Role;

@Controller
public class RoleUtil {
	@Autowired
	private RoleDAO roleRepo;
	
	public Role checkById(Long id) {
		return roleRepo.findById(id).orElse(null);
	}
}
