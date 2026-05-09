package com.allMessages.allMessages.consumer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatProcessorService {

    @Autowired
    private SimpMessagingTemplate template;
}
