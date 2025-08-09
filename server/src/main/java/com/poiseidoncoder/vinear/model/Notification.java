package com.poiseidoncoder.vinear.model;

import com.poiseidoncoder.vinear.model.enums.NotificationType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Entity
@Table(name = "notifications")
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "recipient_id")
    Users recipient;

    @ManyToOne
    @JoinColumn(name = "actor_id")
    Users actor;

    @Enumerated(EnumType.STRING)
    NotificationType type;

    @Column(length = 1000)
    String message;

    Boolean isRead;

    Instant createdAt;

    Long relatedEntityId;
}