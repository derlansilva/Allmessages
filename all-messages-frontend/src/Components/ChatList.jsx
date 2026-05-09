import React from "react";


export default function ChatList({ onSelectChat, selectedChatId }) {

    const conversas = [
        {
            id: 1,
            cliente: 'João Silva',
            ultimaMsg: 'Quero falar com o Suporte, por favor!',
            hora: '14:32',
            setor: 'Suporte',
            unread: true
        },
        {
            id: 2,
            cliente: 'Maria Santos',
            ultimaMsg: 'Obrigado pelo atendimento rápido.',
            hora: '12:10',
            setor: 'Vendas',
            unread: false
        },
        {
            id: 3,
            cliente: 'Carlos Ferreira',
            ultimaMsg: 'Meu boleto ainda não chegou no e-mail.',
            hora: 'Ontem',
            setor: 'Financeiro',
            unread: true
        },
    ];


    return (

        <div className="w-96 flex flex-col bg-white border-r border-gray-100 h-full overflow-hidden">

            {/* Filtros rápidos no topo da lista */}
            <div className="flex items-center gap-2 p-3 border-b border-gray-50 overflow-x-auto no-scrollbar">
                <button className="px-3 py-1 bg-google-gray rounded-md text-xs font-medium hover:bg-gray-200 whitespace-nowrap">Todos</button>
                <button className="px-3 py-1 text-gray-500 rounded-md text-xs font-medium hover:bg-google-gray whitespace-nowrap">Não lidos</button>
                <button className="px-3 py-1 text-gray-500 rounded-md text-xs font-medium hover:bg-google-gray whitespace-nowrap">Aguardando</button>
            </div>

            {/* Lista de Conversas */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {conversas.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => {
                            console.log("clicado no :" , chat.cliente)
                            onSelectChat(chat);
                        }}

                        className={
                            `
                    p-4 border-b border-gray-50 cursor-pointer transition-all
                    ${selectedChatId === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'}
                    `}
                    >

                        <div className="flex justify-between">
                            <span className={`text-sm ${chat.unread ? 'font-bold' : ''}`}>{chat.cliente}</span>
                            <span className="text-[10px] text-gray-400">{chat.hora}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{chat.ultimaMsg}</p>

                    </div>
                ))}
            </div>
        </div>
    )
}