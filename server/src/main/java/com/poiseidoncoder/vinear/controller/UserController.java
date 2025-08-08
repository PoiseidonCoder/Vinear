package com.poiseidoncoder.vinear.controller;

import com.poiseidoncoder.vinear.dto.request.AuthRequestDto;
import com.poiseidoncoder.vinear.dto.AuthResponseDto;
import com.poiseidoncoder.vinear.service.userService.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/")
public class UserController {

    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody AuthRequestDto authRequestDto) {
        AuthResponseDto response = userService.register(authRequestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto authRequestDto) {
        AuthResponseDto response = userService.verify(authRequestDto);
        return ResponseEntity.ok(response);
    }
}
