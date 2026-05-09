package com.allMessages.allMessages.controller;


import com.allMessages.allMessages.dto.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class WhatsAppWebhookController {

    @Autowired
    private KafkaTemplate<String, MessageDTO> kafkaTemplate;

    @PostMapping("/webhook")
    public ResponseEntity<Void> handleWhatsAppWebhook(@RequestBody Map<String, Object> payload) {
        try {
            MessageDTO messageDTO = new MessageDTO();
            messageDTO.setContent("Mensagem vinda do WhatsApp");
            messageDTO.setStatus("RECEIVED");
            messageDTO.setTimestamp(System.currentTimeMillis());

            kafkaTemplate.send("whatsapp-incoming", messageDTO.getClientId() , messageDTO);

            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
