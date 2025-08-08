package com.poiseidoncoder.vinear.mapper;

import com.poiseidoncoder.vinear.dto.response.AuthResponseDto;
import com.poiseidoncoder.vinear.model.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "sessionToken", ignore = true)
    AuthResponseDto userToAuthResponseDto(Users user);
}
