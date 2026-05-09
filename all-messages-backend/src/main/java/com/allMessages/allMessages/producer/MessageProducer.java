package com.allMessages.allMessages.producer;


import com.allMessages.allMessages.dto.MessageDTO;
import com.allMessages.allMessages.model.ChatSession;
import com.allMessages.allMessages.repository.ChatSessionRepository;
import com.allMessages.allMessages.service.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageProducer {
    @Autowired
    private KafkaTemplate<String,Object> kafkaTemplate;
    @Autowired
    private ChatBotService chatBotService;
    @Autowired
    private ChatSessionRepository sessionRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void sendToCustomer(MessageDTO message){
        kafkaTemplate.send("whatsapp-outgoing",message.getCustomerId() , message);
    }

    @KafkaListener(topics = "incoming-messages" , groupId = "allmessages-group")
    public void consume(MessageDTO message){
        ChatSession session  = sessionRepository.findById(message.getCustomerId())
                .orElse(new ChatSession(message.getCustomerId(), "START" , message.getCustomerName() , null));

        if(!"HUMAN_SUPPORT".equals(session.getCurrentStep())){
            chatBotService.processAutoReply(message , session);
            sessionRepository.save(session);
        }

        simpMessagingTemplate.convertAndSend("incoming-messages" , message);
    }
}
