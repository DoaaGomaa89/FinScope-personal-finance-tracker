package com.Finance_Tracker.demo.service;

import org.springframework.stereotype.Service;

import com.Finance_Tracker.demo.dto.userProfileDto;
import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepo;
	
	public userProfileDto getUserProfile(String email)
	{
		User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
		
		userProfileDto userdto = new userProfileDto();
		userdto.setFirstName(user.getFirstName());
		userdto.setLastName(user.getLastName());
		userdto.setDateofBirth(user.getDateofBirth());
		userdto.setGender(user.getGender());
		userdto.setPhone(user.getPhone());
		
		return userdto;
	}
	
	public void updateUserProfile(String email, userProfileDto dto) 
	{
		User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setDateofBirth(dto.getDateofBirth());
		user.setGender(dto.getGender());
		user.setPhone(dto.getPhone());
		
		
		userRepo.save(user);
	}
}
