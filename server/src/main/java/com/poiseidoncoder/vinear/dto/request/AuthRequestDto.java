package com.poiseidoncoder.vinear.dto.request;

import lombok.Data;

@Data
public class AuthRequestDto {
    private String username;
    private String password;
    private String role;
}
