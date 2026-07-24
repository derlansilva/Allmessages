package com.allMessages.allMessages.repository;

import com.allMessages.allMessages.model.Conversation;

import com.allMessages.allMessages.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findById(Long id);


    // 🌟 Certifique-se de usar aqui (c.sender ou c.userSender) o nome exato do campo do seu Conversation.java
    @Query("SELECT c FROM Conversation c WHERE " +
            "(c.sender = :u1 AND c.receiver = :u2) OR " +
            "(c.sender = :u2 AND c.receiver = :u1)")
    Optional<Conversation> findExistingChat(@Param("u1") User u1, @Param("u2") User u2);


    List<Conversation> findBySenderOrReceiver (User sender, User receiver);

}
