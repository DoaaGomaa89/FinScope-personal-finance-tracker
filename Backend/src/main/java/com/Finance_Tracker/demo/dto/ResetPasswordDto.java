package com.Finance_Tracker.demo.dto;

import lombok.Data;

@Data
public class ResetPasswordDto {
	private String email;
	private String otp;
	private String newPassword;
}
