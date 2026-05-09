
import React from "react";


export default function Sidebar() {

    const menuItems = [
        { label: 'Entrada', icon: '📥', count: 12, active: true },
        { label: 'Atendendo', icon: '👤', count: 3, active: false },
        { label: 'Fila de Espera', icon: '⏳', count: 5, active: false },
        { label: 'Resolvidos', icon: '✅', count: 0, active: false },
    ];

    const setores = [
        { name: 'Suporte', color: 'bg-blue-400' },
        { name: 'Vendas', color: 'bg-green-400' },
        { name: 'Financeiro', color: 'bg-orange-400' }
    ];

    return (
        <aside className="w-64 flex flex-col bg-white h-full border-r border-gray-100 py-2">
            {/* Botão Nova Mensagem - O "Compose" do Gmail */}
            <div className="px-4 mb-4">
                <button className="flex items-center gap-3 px-6 py-4 bg-white shadow-md hover:shadow-lg border border-gray-100 rounded-2xl transition-all group">
                    <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium text-gray-700">Nova Mensagem</span>
                </button>
            </div>


            {/* Menu Principal */}
            <nav className="flex-1 pr-4">
                {menuItems.map((item) => (
                    <div
                        key={item.label}
                        className={`
              flex items-center justify-between px-6 py-2 rounded-r-full cursor-pointer group transition-colors
              ${item.active
                                ? 'bg-red-50 text-red-700 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'}
            `}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm">{item.label}</span>
                        </div>
                        {item.count > 0 && (
                            <span className={`text-xs ${item.active ? 'text-red-700' : 'text-gray-500'}`}>
                                {item.count}
                            </span>
                        )}
                    </div>
                ))}

                {/* Divisor e Setores */}
                <div className="mt-8">
                    <h3 className="px-8 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                        Equipes / Setores
                    </h3>

                    {setores.map((setor) => (
                        <div
                            key={setor.name}
                            className="flex items-center gap-4 px-8 py-2 text-gray-600 hover:bg-gray-100 rounded-r-full cursor-pointer text-sm"
                        >
                            <span className={`w-2 h-2 rounded-full ${setor.color}`}></span>
                            {setor.name}
                        </div>
                    ))}
                </div>
            </nav>

            {/* Rodapé do Sidebar */}
            <div className="p-4 border-t border-gray-50 text-[10px] text-gray-400 text-center uppercase tracking-tighter">
                allMessages v1.0 • 2026
            </div>


        </aside>
    )

}