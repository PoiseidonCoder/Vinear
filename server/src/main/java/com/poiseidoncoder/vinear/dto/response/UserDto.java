package com.poiseidoncoder.vinear.dto.response;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String role;
    private String avatarUrl;
}
