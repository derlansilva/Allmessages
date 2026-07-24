import React, { useEffect, useState } from 'react';
import apiServices from '../service/apiServices';
import { socket } from '../service/socket';

export default function ChatWindow({ chat, currentUser }) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chat) {
      setMessages(chat.messages || []);
    }
  }, [chat?.id])

  useEffect(() => {
    socket.connect();

    socket.on("received_message", (newMessage) => {
      console.log("nova mensagem recebida via socket", newMessage)

      const isSameChat = newMessage.currentConversationId === chat?.id || newMessage.chatId === chat?.id || !newMessage.currentConversationId;

      if (isSameChat) {
        setMessages((prev) => [...prev, newMessage])
      }


    })

    return () => {
      socket.off("received_message");
      socket.disconnect();
    }

  }, [chat?.id]);



  // If no chat is selected, show the default empty state
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
        <div className="text-center">
          <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          Select a conversation to view
        </div>
      </div>
    );
  }

  // 🇬🇧 Dynamic chat partner detection based on backend structure
  const chatPartner = chat.sender?.id === currentUser?.id ? chat.receiver : chat.sender;

  // SAFE MAPPING: Fallback chain using the resolved chatPartner object
  const displayName = chatPartner?.name || chat.name || chat.cliente || "Unknown User";
  const displaySector = chatPartner?.sector || chat.sector || chat.setor || "No Sector";
  const displayPicture = chatPartner?.picture || chat.picture || chat.foto || null;

  const handleSendMessage = async () => {
    if (!messageText.trim() || !chat) return;

    const playload = {
      text: messageText.trim(),
      senderId: currentUser?.id
    }

    socket.emit("send_message", playload);
    setMessageText("");


    let currentConversationId = chat.id;
    const currentUserId = currentUser?.id || 1;
    const isNewChat = String(currentConversationId).startsWith('PENDING-') || !currentConversationId;

    try {
      if (isNewChat) {
        console.log("=== INICIANDO FLUXO DE VERIFICAÇÃO ===");

        const targetReceiverId = String(currentConversationId).includes('-')
          ? currentConversationId.split('-')[1]
          : (chat.recipientId || chat.id);

        if (!currentUserId || !targetReceiverId || targetReceiverId === "undefined") {
          alert("Não foi possível identificar os utilizadores. Verifique o console (F12).");
          return;
        }

        const existingChat = await apiServices.checkExistingChat(currentUserId, targetReceiverId);

        if (existingChat && existingChat.id) {
          currentConversationId = existingChat.id;
        } else {
          const response = await apiServices.createConversation(currentUserId, targetReceiverId);
          const savedConversation = response?.data ? response.data : response;

          if (!savedConversation || !savedConversation.id) {
            throw new Error("O Java gravou a conversa, mas não retornou um ID válido no JSON.");
          }

          currentConversationId = savedConversation.id;
        }

        chat.id = currentConversationId;
      }

      console.log("Disparando mensagem para a conversa ID:", currentConversationId);
      await apiServices.sendMessage(
        currentConversationId,
        currentUserId,
        messageText.trim()
      );

      const newMessage = {
        id: Date.now(),
        text: messageText.trim(),
        timestamp: new Date().toISOString(),
        sender: {
          id: currentUserId
        }
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessageText('');

    } catch (error) {
      console.error("Erro na execução do fluxo de mensagem:", error);
      alert("Erro ao processar mensagem. Verifica o terminal do Java.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full relative">

      {/* Chat Header - User Info */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          {displayPicture ? (
            <img
              src={displayPicture}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover shadow-inner"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-inner">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-sm font-bold text-gray-800">{displayName}</h2>
            <p className="text-[10px] text-green-500 font-medium">{displaySector}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-all" title="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-all" title="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>
      </div>

      {/* Messages Feed Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {messages.map((msg) => {
          const messageAuthorId = msg.sender ? msg.sender.id : msg.senderId;
          const messageAuthorEmail = msg.sender ? msg.sender.email : msg.senderEmail;
          const isMyMessage = messageAuthorId === currentUser?.id || messageAuthorEmail === currentUser?.email;

          const formatTime = (timeData) => {
            if (!timeData) return "";
            try {
              const date = new Date(timeData);
              return new Intl.DateTimeFormat('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              }).format(date);
            } catch (e) {
              return "";
            }
          };

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}
            >
              <div className={`
                max-w-[70%] p-3 rounded-2xl text-sm shadow-sm
                ${isMyMessage
                  ? 'bg-[#d9fdd3] text-gray-800 rounded-tr-none'
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}
              `}>
                {msg.text || msg.content || msg.message}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {formatTime(msg.time || msg.date || msg.timestamp)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Reply Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:bg-white focus-within:shadow-md transition-all">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </button>

          <textarea
            rows="1"
            placeholder={`Reply to ${displayName}...`}
            className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-gray-700 resize-none max-h-32"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />

          <button
            className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md"
            onClick={handleSendMessage}
          >
            <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2 font-medium">Press Enter to send • Shift+Enter for newline</p>
      </div>
    </div>
  );
}