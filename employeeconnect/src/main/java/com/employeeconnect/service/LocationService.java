package com.employeeconnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.employeeconnect.dao.LocationDAO;
import com.employeeconnect.model.Location;
import com.employeeconnect.util.EmployeeUtil;
import com.employeeconnect.exception.ResourceNotFoundException;

@Service
public class LocationService {
	@Autowired
	private LocationDAO repository;
	
	@Autowired
	private EmployeeUtil empUtil;
	
	public ResponseEntity<Location> addLocation(Long adminId, Location location) {
		if(adminId!=-1 && empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Location>((Location)null, HttpStatus.BAD_REQUEST);
		}
		Location saved = repository.save(location);
		return new ResponseEntity<Location>(saved, HttpStatus.CREATED);
	}
	
	public ResponseEntity<List<Location>> getAllLocation() {
		return new ResponseEntity<List<Location>>(repository.findAll(), HttpStatus.OK);
	}
	
	public ResponseEntity<Location> updateLocation(Long adminId, Long id, Location newLoc){
		if(empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Location>((Location)null, HttpStatus.BAD_REQUEST);
		}
		try {
			Location oldLocation = findById(id).getBody();
			oldLocation.setLocationName(newLoc.getLocationName());
			oldLocation.setLocationAddress(newLoc.getLocationAddress());
			oldLocation.setActive(newLoc.isActive());
			Location updatedLocation = repository.save(oldLocation);
			return new ResponseEntity<Location>(updatedLocation, HttpStatus.CREATED);
		}catch(Exception e) {
			return new ResponseEntity<Location>((Location)null, HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<Location> findById(Long id){
		try {
			Location location = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Location not exist with id: "+id));
			return new ResponseEntity<Location>(location,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<Location>((Location)null, HttpStatus.BAD_REQUEST);
		}
		
	}
	
	public ResponseEntity<Boolean> deleteById(Long adminId, Long id) {
		if(empUtil.checkByRole(adminId,"Admin")==null) {
			return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
		}
		try {
			Location location = findById(id).getBody();
			repository.delete(location);
			return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			return new ResponseEntity<Boolean>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
		}
	}
	
	public Location customFindById(Long id) {
		Optional<Location> location = repository.findById(id);
		if (location.isEmpty()) {
			return null;
		}
		return location.get();
	}

}
