import { io } from "socket.io-client";

// Aponta para a porta do Java
const SOCKET_URL = "http://localhost:8085";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  // Remova a restrição de 'transports' temporariamente para deixar o Socket.IO negociar a conexão estável
  transports: ["polling", "websocket"], 
});