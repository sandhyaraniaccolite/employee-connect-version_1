package com.employeeconnect.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.employeeconnect.dao.LocationDAO;
import com.employeeconnect.model.Location;

@Controller
public class LocationUtil {
	@Autowired
	private LocationDAO locRepo;
	
	public Location checkById(Long id) {
		return locRepo.findById(id).orElse(null);
	}
}
