package com.Finance_Tracker.demo.controller;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Finance_Tracker.demo.dto.AuthResponse;
import com.Finance_Tracker.demo.dto.LoginRequest;
import com.Finance_Tracker.demo.dto.RegisterRequest;
import com.Finance_Tracker.demo.entity.Role;
import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.UserRepository;
import com.Finance_Tracker.demo.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController 
{

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req) 
    {
        if (userRepo.existsByEmail(req.getEmail()))
        {
        	return ResponseEntity.badRequest().body(new AuthResponse(null,"Email already exists!!", null));
        }

        Set<Role> roles;
        
        if(req.getEmail().equalsIgnoreCase("Vidhi23agrawal@gmail.com")) {
        	roles = Set.of(Role.ADMIN);
        }else {
        	roles = Set.of(Role.USER);
        }
        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword())) 
                .roles(roles)
                .build();


        user.setActive(true);
        userRepo.save(user);
        String token = jwtUtil.generateToken(req.getEmail(), roles);
        String email = user.getEmail();
        return ResponseEntity.ok(new AuthResponse(token, email,roles));
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) 
    {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        User user = userRepo.findByEmail(req.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRoles() // your JwtUtil expects Set<Role>
        );
        String email = user.getEmail();

        return new AuthResponse(token, email,user.getRoles());
    }

 
}
