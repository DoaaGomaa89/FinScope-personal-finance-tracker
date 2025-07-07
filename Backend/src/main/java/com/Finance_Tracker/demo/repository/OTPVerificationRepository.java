package com.Finance_Tracker.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Finance_Tracker.demo.entity.OTPVerification;

@Repository
public interface OTPVerificationRepository extends JpaRepository<OTPVerification,Long> {
	Optional<OTPVerification> findByEmail(String email);
	Optional<OTPVerification> findByEmailAndOtp(String email,String otp);
	Optional<OTPVerification> findTopByEmailOrderByExpiryTimeDesc(String email);
}
