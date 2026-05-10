

export default function Header() {
    return (
        <header className="h-16 border-b flex items-center px-4 justify-between bg-white z-10">
            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-blue-600"> All-Messages</span>
            </div>

            <div className="flex-1 max-w-2xl px-8">
                <input
                    type="text"
                    placeholder="Pesquisar mensagens e contatos..."
                    className="w-full bg-google-gray px-4 py-2.5 rounded-lg outline-none focus:bg-white focus:shadow-md border border-transparent focus:border-gray-200 transition-all"
                />
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">Atendente : João</p>
                    <p className="text-xs text-green-500"></p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 border"></div>
            </div>
        </header>
    )
}