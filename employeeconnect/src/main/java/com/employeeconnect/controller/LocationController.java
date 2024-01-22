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

import com.employeeconnect.model.Location;
import com.employeeconnect.service.LocationService;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class LocationController {
	@Autowired
	private LocationService service;

	
	@GetMapping("/location")
	public ResponseEntity<List<Location>> getAllLocationsDefault(){
		return service.getAllLocation();
	}
	
	@PostMapping("/admin-{adId}/location")
	public ResponseEntity<Location> addLocation(@PathVariable Long adId,@RequestBody Location location) {
		
		return service.addLocation(adId, location);
	}
	
	@PostMapping("/location")
	public ResponseEntity<Location> defAddLoc(@RequestBody Location location) {
		return service.addLocation((long)-1,location);
	}
	
	@PutMapping("/admin-{adId}/location/{id}")
	public ResponseEntity<Location> updateLocationById(@PathVariable Long adId,@PathVariable Long id, @RequestBody Location location){
		return service.updateLocation(adId,id,location);
		
	}
	
	@GetMapping("/location/")
	public ResponseEntity<Location> getById(@RequestParam("id") Long id){
		ResponseEntity<Location> location = service.findById(id);
		return location;
	}
	
	@DeleteMapping("/admin-{adId}/location/{id}")
	public ResponseEntity<Boolean> deleteById(@PathVariable Long adId,@PathVariable Long id) {
		return service.deleteById(adId, id);
	}
}
