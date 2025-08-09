package com.poiseidoncoder.vinear.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.awt.*;
import java.time.Instant;

@Data
@Entity
@Table(name = "user_locations")
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    Users user;

    Double latitude;

    Double longitude;

    @Column(columnDefinition = "geography(Point,4326)")
    Point geog;

    Integer accuracyMeters;

    String city;

    String admin1;

    String countryCode;

    String timezone;

    String locationVisibility;

    Instant lastLocatedAt;

    String geohash;
}