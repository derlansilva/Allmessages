package com.allMessages.allMessages.config;

import com.allMessages.allMessages.dto.MessagePayload;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class SocketServerRunner  implements CommandLineRunner {
    private final SocketIOServer server;

    public SocketServerRunner(SocketIOServer server) {
        this.server = server;
    }

    @Override
    public void run(String... args) throws Exception {
        server.addConnectListener(client -> {
            System.out.println("client connected: " + client.getSessionId());
        });


        server.addDisconnectListener(client -> {
            System.out.println("client disconnected: " + client.getSessionId());
        });

        server.addEventListener("send_message" , MessagePayload.class , (client, data, ackSender) -> {
            System.out.println("client received message: " + data.getSenderId() + " : " + data.getText() );

            server.getBroadcastOperations().sendEvent("received_message", data);
        });

        server.start();
    }
}
