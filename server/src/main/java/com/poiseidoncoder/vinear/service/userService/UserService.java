package com.poiseidoncoder.vinear.service.userService;

import com.poiseidoncoder.vinear.model.enums.Role;
import com.poiseidoncoder.vinear.model.Users;
import com.poiseidoncoder.vinear.dto.request.AuthRequestDto;
import com.poiseidoncoder.vinear.dto.response.AuthResponseDto;
import com.poiseidoncoder.vinear.mapper.UserMapper;
import com.poiseidoncoder.vinear.repository.UserRepository;
import com.poiseidoncoder.vinear.exception.ConflictException;
import com.poiseidoncoder.vinear.exception.NotFoundException;
import com.poiseidoncoder.vinear.exception.UnauthorizedException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    JwtService jwtService;
    UserMapper userMapper;

    public AuthResponseDto register(AuthRequestDto authRequestDto) {
        if (userRepository.findByUsername(authRequestDto.getUsername()).isPresent())
            throw new ConflictException("Username already exists");

        Users user = new Users();
        user.setUsername(authRequestDto.getUsername());
        user.setPassword(authRequestDto.getPassword());
        user.setRole(Role.valueOf(authRequestDto.getRole() != null ? authRequestDto.getRole() : Role.ROLE_USER.name()));

        String encoded = passwordEncoder.encode(user.getPassword());
        user.setPassword(encoded);

        Users savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser.getUsername());
        
        AuthResponseDto response = userMapper.userToAuthResponseDto(savedUser);
        response.setSessionToken(token);
        return response;
    }

    public AuthResponseDto login(AuthRequestDto authRequestDto) {
        Users existing = userRepository.findByUsername(authRequestDto.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (!passwordEncoder.matches(authRequestDto.getPassword(), existing.getPassword()))
            throw new UnauthorizedException("Invalid credentials");

        String token = jwtService.generateToken(existing.getUsername());
        
        AuthResponseDto response = userMapper.userToAuthResponseDto(existing);
        response.setSessionToken(token);
        return response;
    }
}
