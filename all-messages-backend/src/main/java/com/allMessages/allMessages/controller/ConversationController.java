package com.allMessages.allMessages.controller;


import com.allMessages.allMessages.dto.MessageRequest;
import com.allMessages.allMessages.model.Conversation;
import com.allMessages.allMessages.model.Message;
import com.allMessages.allMessages.model.User;
import com.allMessages.allMessages.service.ConversationService;
import com.allMessages.allMessages.service.MessageService;
import com.allMessages.allMessages.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/v1/message")
public class ConversationController {
    @Autowired
    private ConversationService conversationService;
    @Autowired private MessageService messageService;
    @Autowired private UserService userService;


    @PostMapping("/conversations")
    public ResponseEntity<?> createConversation(@RequestBody Map<String, Object> playload){

        String userIdString = (String) playload.get("userId");
        String receiverIdStr = (String) playload.get("receivedId");

        User userSender = getUserById(Long.parseLong(userIdString));
        User userReceiver = getUserById(Long.parseLong(receiverIdStr));

        Conversation conversation = new Conversation(userSender , userReceiver);

        conversationService.createConversation(conversation);

        return ResponseEntity.ok(conversation);

    }

    @PostMapping("/messages")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest message){

        Conversation conversation = conversationService.findById(message.conversationId());

        User  userSender = getUserById(message.senderId());
        User  userReceiver = getUserById(message.senderId());

        Message msg = messageService.createMessage(message.message() , userSender , userReceiver , conversation);

        return ResponseEntity.ok(msg);
    }

    
    public User getUserById(Long id){
        User user = userService.findById(id);
        return user;
    }
}
