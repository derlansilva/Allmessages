import React from 'react';

export default function ChatWindow({ chat }) {
    // Simulando histórico de mensagens (Bot + Cliente + Atendente)
    if (!chat) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
                <div className="text-center">
                    
                    <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
          Selecione uma conversa para visualizar
                </div>
            </div>
        );
    }

    const mensagens = [
    { id: 1, sender: 'client', text: chat.ultimaMsg, time: chat.hora },
    { id: 2, sender: 'agent', text: 'Olá João! Sou o atendente humano. Como posso te ajudar hoje?', time: '14:32' },
    { id: 3, sender: 'client', text: 'Meu sistema não está carregando o CSS, pode me ajudar?', time: '14:33' },
    { id: 4, sender: 'client', text: 'Ola eu sou o derla , to tentando fazer upload do meu sistema ,mas não to conseguindo , infelizmente o servidor nãoe sta respondendo , Ola eu sou o derla , to tentando fazer upload do meu sistema ,mas não to conseguindo , infelizmente o servidor nãoe sta respondendo  ', time: '14:33' },
  ];

    return (
        <div className="flex-1 flex flex-col bg-gray-50 h-full relative">
      
      {/* Header do Chat - Info do Cliente - Estilo WhatsApp Web */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-inner">
            {chat.cliente.charAt(0)}
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800">{chat.cliente}</h2>
            <p className="text-[10px] text-green-500 font-medium">{chat.setor}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-all" title="Buscar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-all" title="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>
      </div>

      {/* Área de Mensagens (Scroll) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {mensagens.map((m) => (
          <div 
            key={m.id} 
            className={`flex flex-col ${m.sender === 'agent' ? 'items-end' : 'items-start'}`}
          >
            <div className={`
              max-w-[70%] p-3 rounded-2xl text-sm shadow-sm
              ${m.sender === 'agent' 
                ? 'bg-[#d9fdd3] text-gray-800 rounded-tr-none' // Bolha verde claro para o atendente
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'} // Bolha branca para o cliente
            `}>
              {m.text}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Input de Resposta (Estilo WhatsApp Web Reply) */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:bg-white focus-within:shadow-md transition-all">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </button>
          
          <textarea 
            rows="1"
            placeholder={`Responder a ${chat.cliente}...`}
            className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-gray-700 resize-none max-h-32"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />

          <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md">
            <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2 font-medium">Pressione Enter para enviar • Shift+Enter para quebrar linha</p>
      </div>
    </div>
    );
}