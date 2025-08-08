package com.poiseidoncoder.vinear.model;

import com.poiseidoncoder.vinear.model.enums.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

@Data
@Entity
@Table(name = "users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true,length = 30)
    String username;

    String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    Role role;

    String avatarUrl;













    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(Objects.requireNonNullElse(role, Role.ROLE_USER).name()));
    }
}
