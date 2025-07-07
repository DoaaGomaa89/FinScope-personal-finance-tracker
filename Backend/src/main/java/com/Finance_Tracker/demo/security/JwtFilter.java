package com.Finance_Tracker.demo.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter 
{
    private final JwtUtil jwtUtil;
    private final CustomUserdetailService userDetailsService;
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException, java.io.IOException {
		final String authHeader = request.getHeader("Authorization");
		final String jwtToken;
		final String userEmail;
		
		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
			  filterChain.doFilter(request, response);
	            return;
		}
		
		
		jwtToken = authHeader.substring(7);
		userEmail = jwtUtil.extractEmail(jwtToken);
		
		if(userEmail != null && SecurityContextHolder.getContext().getAuthentication()==null) 
		{
			var userdetails = userDetailsService.loadUserByUsername(userEmail);
			
		      if (jwtUtil.isTokenValid(jwtToken, userdetails)) 
		      {
	                var authToken = new UsernamePasswordAuthenticationToken
	                (
	                		userdetails,
	                        null,
	                        userdetails.getAuthorities()
	                );
	                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(authToken);
	            }
		}
		  filterChain.doFilter(request, response);
		
	}

}
