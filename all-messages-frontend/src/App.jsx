import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


import Header from './components/Header';
import Sidebar from './Components/Sidebar'
import ChatList from './Components/ChatList'
import ChatWindow from './Components/ChatWindow'


function App() {
  const [ selectedChat , setSelectedChat] = useState(null);

  const [activeMenu , setActiveMenu] = useState("Entrada");

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden font-sans text-gray-900">

      <Header/>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <ChatList 
          onSelectChat={ setSelectedChat } 
          selectedChatId={selectedChat?.id} 
        />

        <ChatWindow chat={selectedChat}/>
      </div>
    </div>
  )
}

export default App
