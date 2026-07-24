import React, { useState } from 'react';
import apiServices from '../service/apiServices';

export default function Header({ user, onLogout, onSelectChat }) {

    const [searchEmail, setSearchEmail] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        if (!e || !e.target) return;

        const query = e.target.value;
        setSearchEmail(query)

        if (query.trim().lenght < 5) {
            searchResult(null);
            return;
        }

        try {
            setLoading(true)

            const userdata = await apiServices.searchUserByEmail(query);

            console.log(userdata)


            setSearchResult(userdata);
        } catch (error) {
            setSearchResult(null);
        } finally {
            setLoading(false);
        }
    }

    const handleStartChat = (foundUser) => {
        if (!foundUser) return;

        const newChatPayload = {
            id: `PENDING-${foundUser.id}`, // Marcamos como pendente usando o ID do destinatário
            recipientId: foundUser.id,     // Guardamos o ID de quem vai receber
            name: foundUser.name,
            picture: foundUser.picture,
            messages: []
        }

        onSelectChat(newChatPayload);

        setSearchEmail("")
        setSearchResult("")
    }
    return (
        <header className="h-16 border-b flex items-center px-4 justify-between bg-white z-10">
            {/* Lado Esquerdo: Logo */}
            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-blue-600">All-Messages</span>
            </div>

            {/* Centro: Barra de Pesquisa */}
            <div className="flex-1 max-w-2xl px-8 relative">
                <input
                    type="text"
                    value={searchEmail}
                    onChange={handleSearch}
                    placeholder="Pesquisar mensagens e contatos..."
                    className="w-full bg-gray-100 px-4 py-2.5 rounded-lg outline-none focus:bg-white focus:shadow-md border border-transparent focus:border-gray-200 transition-all"
                />
            </div>

            {/* Dropdown flutuante de resultados*/}
            {searchEmail.trim().length >= 5 && (
                <div className="absolute left-8 right-8 top-14 bg-white border border-gray-100 shadow-xl rounded-xl z-50 p-2 max-h-48 overflow-y-auto">
                    {loading && <p className="text-xs text-gray-400 p-2">Buscando usuário...</p>}

                    {!loading && searchResult && (
                        <div
                            onClick={() => handleStartChat(searchResult)}
                            className="flex items-center gap-3 p-2 hover:bg-blue-50/60 rounded-lg cursor-pointer transition-all border border-transparent hover:border-blue-100"
                        >
                            {searchResult.picture ? (
                                <img src={searchResult.picture} className="w-9 h-9 rounded-full object-cover" />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                    {searchResult.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">{searchResult.name}</p>
                                <p className="text-xs text-gray-400 truncate">{searchResult.email}</p>
                            </div>
                            <span className="text-[10px] bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full">Conversar</span>
                        </div>
                    )}

                    {!loading && !searchResult && (
                        <p className="text-xs text-gray-400 p-2">Nenhum usuário encontrado com esse e-mail.</p>
                    )}
                </div>
            )}

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