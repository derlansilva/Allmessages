package com.allMessages.allMessages.dto;

public record MessageRequest(Long conversationId, Long senderId, String message) {}