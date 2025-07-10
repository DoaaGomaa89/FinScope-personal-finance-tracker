package com.Finance_Tracker.demo.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Finance_Tracker.demo.dto.userProfileDto;
import com.Finance_Tracker.demo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService userservice;
	
	@GetMapping("/profile")
	public ResponseEntity<userProfileDto> getProfile(Principal principal)
	{
		return ResponseEntity.ok(userservice.getUserProfile(principal.getName())) ;
	}
	
	@PutMapping("/profile/complition")
	public ResponseEntity<String> updateProfile(@RequestBody userProfileDto dto, Principal principal)
	{
		userservice.updateUserProfile(principal.getName(), dto);
		return ResponseEntity.ok("Profile Update Sucessfully");
	}
	
}
