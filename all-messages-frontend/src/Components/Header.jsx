import React from 'react';

export default function Header({ user, onLogout }) {
    return (
        <header className="h-16 border-b flex items-center px-4 justify-between bg-white z-10">
            {/* Lado Esquerdo: Logo */}
            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-blue-600">All-Messages</span>
            </div>

            {/* Centro: Barra de Pesquisa */}
            <div className="flex-1 max-w-2xl px-8">
                <input
                    type="text"
                    placeholder="Pesquisar mensagens e contatos..."
                    className="w-full bg-gray-100 px-4 py-2.5 rounded-lg outline-none focus:bg-white focus:shadow-md border border-transparent focus:border-gray-200 transition-all"
                />
            </div>

            {/* Lado Direito: Perfil do Usuário unificado */}
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    {/* CORRIGIDO: O Java envia os dados mapeados. Certifique-se se no Java 
                        você colocou "nome" ou "name" no Map de resposta. Ajustei para coincidir com seu código */}
                    <p className="text-sm font-medium">{user.nome || user.name}</p>
                  
                </div>

                {/* CORRIGIDO: Usando 'user.foto' em vez de 'usuarioLogado.foto' */}
                {user.picture ? (
                    <img 
                        src={user.picture} 
                        alt="Foto de Perfil" 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 border flex items-center justify-center text-sm font-bold text-gray-600">
                        {/* Pega a primeira letra do nome caso não tenha foto */}
                        {(user.nome || user.name || "U").charAt(0).toUpperCase()}
                    </div>
                )}

                {/* Botão de Sair embutido no bloco do perfil */}
                <button 
                    onClick={onLogout} 
                    className="text-xs text-red-500 hover:underline ml-2"
                >
                    Sair
                </button>
            </div>
        </header>
    );
}