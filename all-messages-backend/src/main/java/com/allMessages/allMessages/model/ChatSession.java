package com.allMessages.allMessages.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatSession {
    @Id
    private String customerId;
    private String currentStep;
    private String customerName;
    private LocalDateTime lastInteraction;
}
