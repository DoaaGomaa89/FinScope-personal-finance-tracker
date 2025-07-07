package com.Finance_Tracker.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.Finance_Tracker.demo.entity.Role;

public class userDto {

	private Long id;
	private String name;
	private String email;
	private boolean active;
	private List<Role> roles;
	private LocalDateTime createdAt;;
}
