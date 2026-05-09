import React from 'react';

export default function ChatWindow({ chat }) {
    // Simulando histórico de mensagens (Bot + Cliente + Atendente)
    if (!chat) {
        return (
            <div className="flex-1 flex items-center justify-center bg-google-gray">
                <div className="text-center">
                    <div className="text-6xl mb-4">📥</div>
                    <h2 className="text-xl font-medium text-gray-500">Selecione uma conversa para visualizar</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-google-gray h-full ">

            {/* Header do Chat - Info do Cliente */}
            <div className="h-16 bg-white border-b flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {chat.cliente.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold">{chat.cliente}</h2>
                        <p className="text-[10px] text-green-500">{chat.setor}</p>
                    </div>
                </div>
            </div>

            {/* Área de Mensagens (Scroll) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-md self-start text-sm">
                    {chat.ultimaMsg}
                </div>

                <div className="bg-blue-600 text-white p-3 rounded-lg shadow-sm max-w-md self-end ml-auto text-sm">
                    Olá {chat.cliente}, como posso ajudar?
                </div>
            </div>

            {/* Input de Resposta (Estilo Gmail Reply) */}
            <div className="p-4 bg-white border-t">
                <input
                    type="text"
                    placeholder={`Responder a ${chat.cliente}...`}
                    className="w-full bg-gray-100 p-3 rounded-xl outline-none text-sm"
                />
            </div>
        </div>
    );
}