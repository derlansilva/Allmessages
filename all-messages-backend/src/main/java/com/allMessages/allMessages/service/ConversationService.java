package com.allMessages.allMessages.service;


import com.allMessages.allMessages.model.Conversation;
import com.allMessages.allMessages.model.User;
import com.allMessages.allMessages.repository.ConversationRepository;
import com.allMessages.allMessages.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationService {
    @Autowired
    ConversationRepository conversationRepository;



    public Conversation createConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }


    public Conversation findById(Long id) {
        return conversationRepository.findById(id)
                .orElse(null);


    }

    public Conversation findExistingConversation(User user1, User user2) {
        return conversationRepository.findExistingChat(user1, user2).orElse(null);
    }

    public List<Conversation> findAllConversations(User user ) {
        return conversationRepository.findBySenderOrReceiver(user , user);
    }
}
