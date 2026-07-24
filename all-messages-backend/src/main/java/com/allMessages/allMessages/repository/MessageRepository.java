package com.allMessages.allMessages.repository;

import com.allMessages.allMessages.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
