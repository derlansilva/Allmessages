package com.allMessages.allMessages.service;


import com.allMessages.allMessages.dto.MessageDTO;
import com.allMessages.allMessages.model.ChatSession;
import com.allMessages.allMessages.producer.MessageProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChatBotService {

    @Autowired
    MessageProducer messageProducer ;

    public void processAutoReply(MessageDTO message , ChatSession session){
        String step = session.getCurrentStep();

        if("START".equals(step)){
            sendResponse(message.getCustomerId() , "Olá! Sou seu atendente virtual da AllMessages. 🤖\nComo posso te ajudar hoje?");

            sendResponse(message.getCustomerId() , "Digite uma opção:\n1. Financeiro\n2. Suporte\n3. Falar com um atendente");

            session.setCurrentStep("MENU");

        }else if("MENU".equals(step)){
            if (message.getContent().contains("3")) {
                sendResponse(message.getCustomerId(), "Certo! Por qual setor você deseja ser atendido?\n(Suporte, Vendas ou Financeiro)");
                session.setCurrentStep("AWAITING_SECTOR");
            } else {
                sendResponse(message.getCustomerId(), "Opção recebida! Aguarde um momento...");
            }
        }

        session.setLastInteraction(LocalDateTime.now());
    }


    private void sendResponse(String customerId, String text){
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setCustomerId(customerId);
        messageDTO.setContent(text);
        messageProducer.sendToCustomer( messageDTO );
    }


    private void handleSelection(String content, MessageDTO message, ChatSession session){

    }
}
