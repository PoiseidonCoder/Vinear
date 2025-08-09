package com.poiseidoncoder.vinear.model;

import com.poiseidoncoder.vinear.model.enums.CallPreference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Entity
@Table(name = "call_history")
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CallHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "caller_id")
    Users caller;

    @ManyToOne(optional = false)
    @JoinColumn(name = "receiver_id")
    Users receiver;

    Instant startTime;

    Instant endTime;

    @Column(length = 30)
    String status;

    @Enumerated(EnumType.STRING)
    CallPreference modeUsed;

    Integer durationSeconds;
}