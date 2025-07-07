package com.Finance_Tracker.demo.security;

import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserdetailService implements UserDetailsService {

	private final UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) {
		
		User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

		   return new org.springframework.security.core.userdetails.User(
	                user.getEmail(),
	                user.getPassword(),
	                user.getRoles().stream()
	                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
	                        .collect(Collectors.toList())
	        );     
	}

}
