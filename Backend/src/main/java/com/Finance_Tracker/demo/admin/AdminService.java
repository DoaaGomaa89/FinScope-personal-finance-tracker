package com.Finance_Tracker.demo.admin;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.Finance_Tracker.demo.entity.Role;
import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

	private final UserRepository userRepo;
	
	public List<User> getAllUsers(String email,Boolean active)
	{
		return userRepo.findFilterUsers(email, active);
	}
	
	public void activateUser(long userId)
	{
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		user.setActive(true);
		userRepo.save(user);
	}
	
	public void deactivateUser(long userId)
	{
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		user.setActive(false);
		userRepo.save(user);
	}
	
	public Map<String, Long> getAdminSummary() {
		long totalUsers = userRepo.count();
		long activeUsers = userRepo.countByActive(true);
		long inActiveUsers = userRepo.countByActive(false);
		long adminUsers = userRepo.countByRolesContaining(Role.ADMIN);
		long newThisMonth = userRepo.countByCreatedAtBetween(LocalDate.now().withDayOfMonth(1).atStartOfDay(),
		        LocalDateTime.now());
	
		Map<String, Long> stats = new HashMap<>();
		stats.put("totalUsers", totalUsers);
		stats.put("activeUsers", activeUsers);
		stats.put("inActiveUsers", inActiveUsers);
		stats.put("adminValue", adminUsers);
		stats.put("newThisMonth", newThisMonth);
		return stats;
	}
	
	public void makeUserAsAdmin(Long userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		
		if(!user.getRoles().contains(Role.ADMIN)) {
			user.getRoles().add(Role.ADMIN);
			userRepo.save(user);
		}
		
	}
	
	public void removeUserAdmin(Long userId) {
		
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		
		if(user.getRoles().contains(Role.ADMIN)) {
			user.getRoles().remove(Role.ADMIN);
			userRepo.save(user);
		}
	}
}
