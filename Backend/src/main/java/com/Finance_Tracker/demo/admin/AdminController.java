package com.Finance_Tracker.demo.admin;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Finance_Tracker.demo.entity.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") 
public class AdminController {

	private final AdminService adminservice;
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Boolean active)
	{
		return ResponseEntity.ok(adminservice.getAllUsers(email, active));
	}
	
	@PutMapping("/activate/{id}")
	public ResponseEntity<String> activateUser(@PathVariable long id){
		adminservice.activateUser(id);
		return ResponseEntity.ok("User Activated Successfully");
	}
	
	@PutMapping("/deactivate/{id}")
	public ResponseEntity<String> deactivateUser(@PathVariable long id){
		adminservice.deactivateUser(id);
		return ResponseEntity.ok("User Deactivated Successfully");
	}
	
	@GetMapping("/summary")
	public ResponseEntity<Map<String, Long>> getAdminSummary() {
		return ResponseEntity.ok(adminservice.getAdminSummary());
	}
	
	@PutMapping("/make-admin/{id}")
	public ResponseEntity<String> makeAdmin(@PathVariable Long id){
		adminservice.makeUserAsAdmin(id);
		return ResponseEntity.ok("User promoted to admin successfully");
	}
	
	@PutMapping("/remove-admin/{id}")
	public ResponseEntity<String> removeAdmin(@PathVariable Long id){
		adminservice.removeUserAdmin(id);
		return ResponseEntity.ok("User promoted to admin successfully");
	}
	
}
