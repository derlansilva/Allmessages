import api from "./api";


const apiServices = {

    loginWithGoogle: async (googleToken) => {
        const response = await api.post('auth/google', { token: googleToken })
    },
    searchUserByEmail: async (email) => {
        const response = await api.get(`/users/search?email=${email}`);
        return response.data;
    },

    // Verifica se já existe uma conversa ativa entre dois usuários específicos
    checkExistingChat: async (senderId, receiverId) => {
        const response = await api.get(`/conversations/check?senderId=${senderId}&receiverId=${receiverId}`);
        return response.data;
    },

    getConversation: async (userId) => {
        const response = await api.get(`/conversations/user/${userId}`)
        return response.data;
    },

    createConversation: async (senderId, receiverId) => {
        const response = await api.post('/conversations', { senderId, receiverId });

        return response.data;
    },

    sendMessage: async (conversatinId, senderId , textMessage) => {
        const response = await api.post(`/messages`, {
            conversationId: conversatinId,
            senderId: senderId,
            message: textMessage
        });

        return response.data;
    }
}



export default apiServices;