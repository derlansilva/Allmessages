package com.allMessages.allMessages.service;

import com.allMessages.allMessages.model.Conversation;
import com.allMessages.allMessages.model.Message;
import com.allMessages.allMessages.model.User;
import com.allMessages.allMessages.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;

    public Message createMessage(String msg, User sender, User receiver, Conversation conversation) {
        Message message = new Message(msg, sender, receiver, conversation) ;

        messageRepository.save(message);

        return message;
    }
}
