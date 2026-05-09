import React from "react";


export default function ChatList({ onSelectChat, selectedChatId }) {

    const conversas = [
        {
            id: 1,
            cliente: 'João Silva',
            ultimaMsg: 'Quero falar com o Suporte, por favor!',
            hora: '14:32',
            foto: null, // Simulando sem foto
            unread: true
        },
        {
            id: 2,
            cliente: 'Maria Santos',
            ultimaMsg: 'Obrigado pelo atendimento rápido, vocês são ótimos!', // Msg Longa
            hora: '12:10',
            foto: 'https://randomuser.me/api/portraits/women/44.jpg',
            unread: false
        },
        {
            id: 3,
            cliente: 'Carlos Ferreira',
            ultimaMsg: 'Meu boleto ainda não chegou no e-mail.',
            hora: 'Ontem',
            foto: 'https://randomuser.me/api/portraits/men/32.jpg',
            unread: true
        },
        
    ];


    return (

        <div className="w-80 flex flex-col bg-white h-full overflow-hidden border-r border-gray-100">

            {/* Filtros no topo (Menu menor) */}
            <div className="flex items-center gap-1.5 p-3 border-b border-gray-50 overflow-x-auto no-scrollbar">
                <button className="px-3 py-1 bg-google-gray rounded-full text-[11px] font-medium hover:bg-gray-200 whitespace-nowrap text-gray-700">Todos</button>
                <button className="px-3 py-1 text-gray-500 rounded-full text-[11px] font-medium hover:bg-google-gray whitespace-nowrap">Não lidos</button>
                <button className="px-3 py-1 text-gray-500 rounded-full text-[11px] font-medium hover:bg-google-gray whitespace-nowrap">Aguardando</button>
            </div>

            {/* Lista de Conversas */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {conversas.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => {
                            console.log("clicado no :", chat.cliente)
                            onSelectChat(chat);
                        }}

                        className={`
                        flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all
              ${selectedChatId === chat.id ? 'bg-blue-50/60' : 'hover:bg-gray-50'}
                        ${selectedChatId === chat.id
                                ? 'bg-blue-100 ring-1 ring-blue-200'
                                : 'hover:bg-blue-100/80'}
                        `}
                    >

                        {/* Foto ou Inicial */}
                        {chat.foto ? (
                            <div className="relative">
                            <img src={chat.foto} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                            {/* Ponto de status (online/offline) */}
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold text-xl flex-shrink-0 border-2 border-white">
                                {chat.cliente.charAt(0)}
                            </div>
                        )}


                        

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                                <span className="text-[13px] font-semibold text-gray-700 truncate">
                                    {chat.cliente}
                                </span>
                                <span className="text-[9px] text-gray-400 font-medium uppercase">
                                    {chat.hora}
                                </span>
                            </div>
                            <p className="text-[11px] text-gray-400 truncate leading-relaxed">
                                {chat.ultimaMsg}
                            </p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}