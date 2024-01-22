package com.employeeconnect.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employeeconnect.model.Employee;
import com.employeeconnect.model.Meeting;

@Repository
public interface MeetingDAO extends JpaRepository<Meeting, Long>{
	List<Meeting> findByEmployeeAndMeetStatusAndNotesAprooveStatus(Employee employee, boolean meetStatus,boolean noteStatus);
	List<Meeting> findByHrEmployeeAndMeetStatusAndNotesAprooveStatus(Employee employee, boolean meetStatus,boolean noteStatus);
	List<Meeting> findByHrEmployee(Employee employee);
	List<Meeting> findByEmployee(Employee employee);
	List<Meeting> findByEmployeeManagerEmployeeId(Long manId);
	List<Meeting> findByMeetStatusAndResponseStatus(boolean ms, boolean rs);
}
