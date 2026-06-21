import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// Cole aqui o ID enorme que você gerou na imagem anterior do Google Cloud
const CLIENT_ID = "624792272686-87v0fg371tqpv6q65dn613epb63qe31f.apps.googleusercontent.com";

export default function Login({ onLoginSuccess }) {

    const handleSuccess = async (credentialResponse) => {
        // Esse token (JWT) contém a foto, nome e e-mail criptografados pelo Google
        const googleToken = credentialResponse.credential;

        try {
            // Envia o token para o seu servidor Java validar e liberar a sessão
            const response = await axios.post('http://localhost:8081/v1/auth/google', {
                token: googleToken
            });

            if (response.status === 200) {
                // Passa os dados recebidos do Java (nome, foto, email) de volta para o App.jsx
                onLoginSuccess(response.data);
            }
        } catch (error) {
            console.error("Erro ao autenticar no backend Java:", error);
            alert("Não foi possível conectar ao servidor de chat. Verifique se o Java está rodando.");
        }
    };

    return (
        // Provedor oficial do Google que ativa a API de login na página
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 font-sans">
                
                {/* Caixa Branca de Login */}
                <div className="bg-white p-10 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center max-w-sm w-full mx-4">
                    
                    {/* Logo/Nome do Sistema combinando com seu Header */}
                    <h1 className="text-3xl font-bold text-blue-600 tracking-tight mb-2">
                        All-Messages
                    </h1>
                    
                    <p className="text-sm text-gray-500 mb-8">
                        Gerencie suas mensagens em um só lugar. <br />
                        Entre com sua conta para continuar.
                    </p>

                    {/* Botão Oficial do Google customizado */}
                    <div className="w-full flex justify-center">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => {
                                console.log('Falha na autenticação do Google');
                                alert('Erro ao autenticar com o Google.');
                            }}
                            useOneTap // Ativa aquela caixinha flutuante elegante no canto da tela
                            theme="outline"
                            size="large"
                            shape="pill"
                            locale="pt-BR"
                        />
                    </div>

                    {/* Rodapé da caixinha */}
                    <div className="mt-8 text-xs text-gray-400">
                        ALLMESSAGES V1.0 • 2026
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}