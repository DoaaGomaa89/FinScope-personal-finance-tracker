package com.Finance_Tracker.demo.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Finance_Tracker.demo.entity.OTPVerification;
import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.OTPVerificationRepository;
import com.Finance_Tracker.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResetPasswordService {

	private final UserRepository userRepo;
	private final OTPVerificationRepository OtpRepo;
	private final JavaMailSender mailSender;
	private final PasswordEncoder passwordEncoder;

	
	public String requestOtp(String email) {
		Optional<User> user = userRepo.findByEmail(email);
		if(user.isEmpty()) {
			throw new RuntimeException("Email is not found");
		}
		String name = user.get().getFirstName();
		
		String otp = String.valueOf(new Random().nextInt(900000) + 100000);
		
		OTPVerification otpVerification = OTPVerification.builder()
				.email(email)
				.otp(otp)
				.expiryTime(LocalDateTime.now().plusMinutes(10))
				.verified(false)
				.build();
		
		OtpRepo.save(otpVerification);
		
		SimpleMailMessage  message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("🔐 Your OTP for Password Reset");
		
		message.setText(
			    "Dear " + name + ",\n\n"
			  + "We received a request to reset your password.\n"
			  + "🔑 Your One-Time Password (OTP) is: " + otp + "\n"
			  + "This code is valid for the next 10 minutes.\n\n"
			  + "If you did not request this, please ignore this message.\n\n"
			  + "Thanks,\n"
			  + "Team Finance Tracker\n"
			);
        
        mailSender.send(message);
		
		return "✅ OTP sent to your email.";
	}
	
	public String verifyOtp(String email, String otp) {
		Optional<OTPVerification> otpRecord = OtpRepo.findTopByEmailOrderByExpiryTimeDesc(email);
		
		if(otpRecord.isEmpty() || !otpRecord.get().getOtp().equals(otp)) {
			throw new RuntimeException("Invalid OTP");
		}
		
		if(otpRecord.get().getExpiryTime().isBefore(LocalDateTime.now())) {
			throw new RuntimeException("OTP has expired");
		}
		return "✅ OTP is valid.";
		
	}
	
	public String resetPassword(String email, String otp, String newPassword) {
		Optional<OTPVerification> otpRecord = OtpRepo.findTopByEmailOrderByExpiryTimeDesc(email);
		
		if(otpRecord.isEmpty() || !otpRecord.get().getOtp().equals(otp)) {
			throw new RuntimeException("Invalid OTP");
		}
		
		if(otpRecord.get().getExpiryTime().isBefore(LocalDateTime.now())) {
			throw new RuntimeException("OTP has expired");
		}
		
		otpRecord.get().setVerified(true);
		OtpRepo.save(otpRecord.get());
		
		Optional<User> user = userRepo.findByEmail(email);
		if(user.isPresent()) {
			user.get().setPassword(passwordEncoder.encode(newPassword));
			userRepo.save(user.get());
			return "✅ Password updated successfully.";
		}
		else {
	        throw new RuntimeException("User not found.");
	    }
	}
}
