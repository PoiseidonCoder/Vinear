package com.poiseidoncoder.vinear.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@Table(name = "games")
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true, nullable = false, length = 120)
    String name;

    @Column(length = 1000)
    String iconUrl;

    @Column(length = 120)
    String genre;

    @Column(length = 120)
    String publisher;
}
