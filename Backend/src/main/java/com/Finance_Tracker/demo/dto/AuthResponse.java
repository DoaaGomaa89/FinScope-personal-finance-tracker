package com.Finance_Tracker.demo.dto;

import java.util.Set;

import com.Finance_Tracker.demo.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private Set<Role> roles;
}

