package com.Quiz_Backend.controller;

import com.Quiz_Backend.config.JwtUtil;
import com.Quiz_Backend.model.User;
import com.Quiz_Backend.repository.UserRepository;
import com.Quiz_Backend.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for user authentication (login and registration).
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new ValidationException("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
    	
        try {
        	System.out.println(user.getUsername());
        	System.out.println(user.getPassword());
           authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
          
            final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
          
          final String jwt = jwtUtil.generateToken(userDetails);
        
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", Map.of("username", userDetails.getUsername(), "role", userRepository.findByUsername(userDetails.getUsername()).getRole()));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new ValidationException("Invalid username or password");
        }
    }
}