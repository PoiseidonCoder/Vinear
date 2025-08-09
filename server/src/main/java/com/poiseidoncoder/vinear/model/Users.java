package com.poiseidoncoder.vinear.model;

import com.poiseidoncoder.vinear.model.enums.CallPreference;
import com.poiseidoncoder.vinear.model.enums.Gender;
import com.poiseidoncoder.vinear.model.enums.OnlineStatus;
import com.poiseidoncoder.vinear.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Data
@Entity
@Table(name = "users")
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true, length = 30, nullable = false)
    String username;

    @Column(nullable = false)
    String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    Role role;

    @Column(length = 2000)
    String avatarUrl;

    @Column(length = 2000)
    String coverImage;

    @Column(length = 500)
    String bio;

    @Enumerated(EnumType.STRING)
    Gender gender;

    @Enumerated(EnumType.STRING)
    OnlineStatus onlineStatus;

    @Column(length = 10)
    String language;

    @Temporal(TemporalType.DATE)
    Date dateOfBirth;

    Double rating;

    Integer maxDistanceKm;

    Integer ageMin;

    Integer ageMax;

    @Enumerated(EnumType.STRING)
    Gender genderPreference;

    @Enumerated(EnumType.STRING)
    CallPreference callPreference;

    Boolean isProfileVisible;

    Boolean showContactInfo;

    @ManyToMany
    @JoinTable(
            name = "user_favorite_games",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "game_id")
    )
    Set<Game> favoriteGames = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    Set<Users> friends = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_blocked",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "blocked_id")
    )
    Set<Users> blockedUsers = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    UserLocation location;

    @ManyToMany(mappedBy = "participants")
    Set<Conversation> conversations = ConcurrentHashMap.newKeySet();















    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new SimpleGrantedAuthority(Objects.requireNonNullElse(role, Role.ROLE_USER).name())
        );
    }
}
