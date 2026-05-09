package com.allMessages.allMessages.repository;


import com.allMessages.allMessages.model.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession,String> {
}
