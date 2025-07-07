package com.Finance_Tracker.demo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class userProfileDto 
{
	private String firstName;
	private String lastName;
	private String gender;
	private String phone;
	private LocalDate dateofBirth;
}
