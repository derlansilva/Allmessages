import React from "react";
// Importando os ícones (Certifique-se de que rodou: npm install lucide-react)
import { Inbox, User, Clock, CheckCircle2, Users, Plus } from 'lucide-react';

export default function Sidebar() {
    const menuItems = [
        { label: 'Entrada', icon: <Inbox size={18} />, count: 12, active: true },
        { label: 'Atendendo', icon: <User size={18} />, count: 3, active: false },
        { label: 'Fila de Espera', icon: <Clock size={18} />, count: 5, active: false },
        { label: 'Resolvidos', icon: <CheckCircle2 size={18} />, count: 0, active: false },
    ];

    const setores = [
        { name: 'Suporte', color: 'bg-blue-400' },
        { name: 'Vendas', color: 'bg-green-400' },
        { name: 'Financeiro', color: 'bg-orange-400' }
    ];

    return (
        <aside className="w-60 flex flex-col bg-white h-full border-r border-gray-100 py-2 transition-all">
            {/* Botão Nova Mensagem - Mais Slim */}
            <div className="px-4 mb-6 mt-2">
                <button className="flex items-center gap-3 px-5 py-3 bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl transition-all group w-full">
                    <Plus className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-sm text-gray-700">Nova Mensagem</span>
                </button>
            </div>

            {/* Menu Principal */}
            <nav className="flex-1 pr-4">
                {menuItems.map((item) => (
                    <div
                        key={item.label}
                        className={`
                            flex items-center justify-between px-6 py-2.5 rounded-r-full cursor-pointer group transition-colors mb-1
                            ${item.active
                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                : 'text-gray-500 hover:bg-gray-50'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`${item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                {item.icon}
                            </span>
                            <span className="text-sm">{item.label}</span>
                        </div>
                        {item.count > 0 && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
                                {item.count}
                            </span>
                        )}
                    </div>
                ))}

                {/* Divisor e Setores - Mantidos conforme você tinha */}
                <div className="mt-8">
                    <div className="px-8 flex items-center gap-2 mb-4">
                        <Users size={14} className="text-gray-400" />
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Equipes / Setores
                        </h3>
                    </div>

                    {setores.map((setor) => (
                        <div
                            key={setor.name}
                            className="flex items-center gap-4 px-8 py-2 text-gray-500 hover:bg-gray-50 rounded-r-full cursor-pointer text-sm group transition-all"
                        >
                            <span className={`w-2 h-2 rounded-full ${setor.color} ring-2 ring-white shadow-sm`}></span>
                            <span className="group-hover:text-gray-800">{setor.name}</span>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Rodapé - AllMessages */}
            <div className="p-4 border-t border-gray-50 text-[9px] text-gray-300 text-center uppercase tracking-widest font-medium">
                allMessages v1.0 • 2026
            </div>
        </aside>
    );
}