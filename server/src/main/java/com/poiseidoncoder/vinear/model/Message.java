package com.poiseidoncoder.vinear.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Entity
@Table(name = "messages")
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "conversation_id")
    Conversation conversation;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sender_id")
    Users sender;

    @Column(length = 4000, nullable = false)
    String content;

    Instant sentAt;

    Boolean isRead;
}