import React, { useEffect, useState } from "react";
import apiServices from "../service/apiServices";
import { socket } from "../service/socket"; // 🌟 1. IMPORTAÇÃO DO SEU ARQUIVO SOCKET

export default function ChatList({ onSelectChat, selectedChatId, userId }) {
    const [conversation, setConversation] = useState([]);
    
    // EFFECT 1: Carrega o histórico inicial de conversas via API HTTP REST
    useEffect(() => {
        if (!userId) return;

        const fetchMyChats = async () => {
            try {
                const data = await apiServices.getConversation(userId);
                if (Array.isArray(data)) {
                    setConversation([...data]);
                } else if (data && typeof data === 'object') {
                    setConversation([data]);
                } else {
                    setConversation([]);
                }
            } catch (error) {
                console.error("Erro ao listar conversas:", error);
            }
        };

        fetchMyChats();
    }, [userId]);

    // 🌟 EFFECT 2: Escuta mensagens em tempo real para atualizar o card na barra lateral
    // 🌟 CORREÇÃO DO LISTENER GLOBAL
    useEffect(() => {
        // Remove qualquer listener antigo duplicado antes de criar um novo
        socket.off("received_message");

        socket.on("received_message", (newMessage) => {
            console.log("=== CHATLIST CAPTUROU TEXTO NOVO ===", newMessage);

            // Tenta pegar o ID da conversa de dentro da mensagem vinda do Java
            // Se o Java estiver devolvendo o objeto completo, usamos o fallback correto
            const targetChatId = newMessage.conversationId || 
                                 newMessage.chatId || 
                                 newMessage.conversation?.id;

            if (targetChatId) {
                setConversation((prevConversations) => {
                    return prevConversations.map((chat) => {
                        if (chat.id === Number(targetChatId)) {
                            // Cria uma cópia profunda forçando o React a redesenhar o card
                            const currentMessages = chat.messages || [];
                            return {
                                ...chat,
                                messages: [...currentMessages, newMessage]
                            };
                        }
                        return chat;
                    });
                });
            }
        });

        return () => {
            socket.off("received_message");
        };
    }, []); // Deixe o array de dependências vazio para o listener não ficar reiniciando!

    return (
        <div className="w-80 flex flex-col bg-white h-full overflow-hidden border-r border-gray-100">

            {/* Filtros no topo */}
            <div className="flex items-center gap-1.5 p-3 border-b border-gray-50 overflow-x-auto no-scrollbar">
                <button className="px-3 py-1 bg-google-gray rounded-full text-[11px] font-medium hover:bg-gray-200 whitespace-nowrap text-gray-700">Todos</button>
                <button className="px-3 py-1 text-gray-500 rounded-full text-[11px] font-medium hover:bg-google-gray whitespace-nowrap">Não lidos</button>
                <button className="px-3 py-1 text-gray-500 rounded-full text-[11px] font-medium hover:bg-google-gray whitespace-nowrap">Aguardando</button>
            </div>

            {/* Lista de Conversas */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {conversation && conversation.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => {
                            console.log("Conversa selecionada:", chat);
                            onSelectChat(chat);
                        }}
                        className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${selectedChatId === chat.id
                            ? 'bg-blue-100 ring-1 ring-blue-200'
                            : 'hover:bg-gray-50'
                            }`}
                    >
                        {(() => {
                            const chatPartner = chat.sender?.id === userId ? chat.receiver : chat.sender;
                            const displayName = chatPartner?.name || chatPartner?.nome || "User";
                            const displayPicture = chatPartner?.picture || chatPartner?.foto || null;

                            // Captura a última mensagem de forma segura
                            const lastMessageObject = chat.messages && chat.messages.length > 0
                                ? chat.messages[chat.messages.length - 1]
                                : null;

                            const displayText = lastMessageObject 
                                ? (lastMessageObject.message || lastMessageObject.text || lastMessageObject.content) 
                                : "Nenhuma mensagem";
                            
                            const rawTime = lastMessageObject ? (lastMessageObject.time || lastMessageObject.timestamp || lastMessageObject.date) : "";

                            // Formatação rápida para manter a hora do card limpa (ex: 14:32)
                            const formatCardTime = (timeData) => {
                                if (!timeData) return "";
                                try {
                                    const date = new Date(timeData);
                                    return new Intl.DateTimeFormat('pt-BR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }).format(date);
                                } catch (e) {
                                    return timeData; // Caso já venha formatado do localState
                                }
                            };

                            return (
                                <>
                                    {/* Foto ou Inicial do contato correto */}
                                    {displayPicture ? (
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={displayPicture}
                                                className="w-10 h-10 rounded-full object-cover shadow-sm"
                                                alt="Perfil"
                                            />
                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold text-base flex-shrink-0 border border-transparent">
                                            {displayName.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    {/* Conteúdo do Card */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-[13px] font-semibold text-gray-700 truncate">
                                                {displayName}
                                            </span>
                                            <span className="text-[9px] text-gray-400 font-medium uppercase">
                                                {formatCardTime(rawTime)}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 truncate leading-relaxed">
                                            {displayText}
                                        </p>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                ))}
            </div>
        </div>
    );
}