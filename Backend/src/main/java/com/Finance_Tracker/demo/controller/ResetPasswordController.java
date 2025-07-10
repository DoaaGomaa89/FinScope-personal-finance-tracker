package com.Finance_Tracker.demo.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Finance_Tracker.demo.dto.ResetPasswordDto;
import com.Finance_Tracker.demo.service.ResetPasswordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class ResetPasswordController {

	private final ResetPasswordService resetPasswordService;
	
	@PostMapping("/request-otp")
	public ResponseEntity<?> requestOtp(@RequestBody Map<String, String> request){
		String email = request.get("email");
		String response = resetPasswordService.requestOtp(email);
		return ResponseEntity.ok(Map.of("message", response));
	}
	
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String otp = request.get("otp");
		String response = resetPasswordService.verifyOtp(email, otp);
		return ResponseEntity.ok(Map.of("message", response));
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<Map<String, String>> resetPassword(@RequestBody ResetPasswordDto dto) {
	    String response = resetPasswordService.resetPassword(dto.getEmail(), dto.getOtp(), dto.getNewPassword());
	    return ResponseEntity.ok(Map.of("message", response)); 
	}
}
	

