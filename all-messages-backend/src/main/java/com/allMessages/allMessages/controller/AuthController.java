package com.allMessages.allMessages.controller;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/v1/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final String  GOOGLE_CLIENT_ID = "624792272686-87v0fg371tqpv6q65dn613epb63qe31f.apps.googleusercontent.com";

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

                Map<String, Object> response = new HashMap<>();
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
}
