package com.allMessages.allMessages.controller;


import com.allMessages.allMessages.dto.ConversationRequest;
import com.allMessages.allMessages.dto.MessageRequest;
import com.allMessages.allMessages.model.Conversation;
import com.allMessages.allMessages.model.Message;
import com.allMessages.allMessages.model.User;
import com.allMessages.allMessages.repository.ConversationRepository;
import com.allMessages.allMessages.service.ConversationService;
import com.allMessages.allMessages.service.MessageService;
import com.allMessages.allMessages.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/v1/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final String  GOOGLE_CLIENT_ID = "624792272686-87v0fg371tqpv6q65dn613epb63qe31f.apps.googleusercontent.com";
    @Autowired private UserService userService;
    @Autowired private ConversationService  conversationService;
    @Autowired private MessageService messageService;

    @PostMapping("/google")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody Map<String, String> playload) {
        String frontToken = playload.get("token");

        System.out.println("frontToken: " + frontToken);
        try{
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport() , new GsonFactory())
                    .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID)).build();

            GoogleIdToken idToken = verifier.verify(frontToken);

            System.out.println(playload.get("idToken"));

            if(idToken != null){
                GoogleIdToken.Payload payload = idToken.getPayload();

                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String picture = (String) payload.get("picture");

                User userloginIn = userService.loginProcessGmail(name , email , picture);

                Map<String, Object> response = new HashMap<>();
                response.put("id", userloginIn.getId());
                response.put("email", email);
                response.put("name", name);

                response.put("picture", picture);


                return ResponseEntity.ok(response);
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid token");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar login: " + e.getMessage());
        }
    }

    @GetMapping("/users/search")
    public ResponseEntity<User> findUserByEmail(@RequestParam("email") String email) {

        System.out.println("email: " + email);
        User user =  userService.findByEmail(email);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/conversations")
    public ResponseEntity<?> createConversation(@RequestBody Map<String, Object> playload) {



// Extrai os valores de dentro do objeto JSON que o Axios enviou
        String userIdStr = playload.get("senderId").toString();
        String receiverIdStr = playload.get("receiverId").toString();

        System.out.println("Mapeado com sucesso -> Sender: " + userIdStr + " | Receiver: " + receiverIdStr);

        // Agora sim, faz o parse dos números limpos com segurança
        User userSender = getUserById(Long.parseLong(userIdStr));
        User userReceived = getUserById(Long.parseLong(receiverIdStr));
        Conversation conversation = new Conversation( userSender , userReceived );

        conversationService.createConversation(conversation);

        return ResponseEntity.ok(conversation);
    }


    @PostMapping("/messages")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest request) {

        System.out.println("message: " + request.message());
        Conversation  conversation = conversationService.findById(request.conversationId());

        User userSender = getUserById(request.senderId());
        User receiver = conversation.getReceiver().getId() == request.senderId() ? conversation.getSender() : conversation.getReceiver() ;

        System.out.println("sender: " + conversation.getSender().getName());
        System.out.println("receiver: " + conversation.getReceiver().getName());

        Message msg = messageService.createMessage(request.message() ,userSender,receiver, conversation );


        return ResponseEntity.ok(msg);
    }

    @GetMapping("/conversations/check")
    public ResponseEntity<?> checkConversation(@RequestParam String senderId, @RequestParam String receiverId) {
        System.out.println("=== CHECANDO EXISTENCIA DE CONVERSA ===");

        User sender = getUserById(Long.parseLong(senderId));
        User receiver = getUserById(Long.parseLong(receiverId));

        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body("Usuários inválidos.");
        }

        // Chama o serviço para buscar a conversa
        Conversation conversation = conversationService.findExistingConversation(sender, receiver);

        if (conversation != null) {
            // Se existir, devolve a conversa com o ID real dela pro React
            return ResponseEntity.ok(conversation);
        }

        // Se não existir, devolve um 204 No Content (indica sucesso, mas vazio) ou objeto nulo
        return ResponseEntity.ok().body(null);
    }


    @GetMapping("/conversations/user/{userId}")
    public ResponseEntity<?> getConversationsByUser(@PathVariable("userId") Long userId) {

        System.out.println("getConversationsByUser: " + userId);
        System.out.println("=== BUSCANDO LISTA DE CONVERSAS DO USUARIO ID: " + userId + " ===");

        User user = getUserById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().body("Usuário inválido.");
        }

        // Busca a lista de conversas do usuário
        List<Conversation> conversations = conversationService.findAllConversations(user);

        // Retorna a lista completa para o React popular o ChatList
        return ResponseEntity.ok(conversations);

    }

    public User getUserById( Long id ) {
        User user = userService.findById(id);
        return user;
    }
}
