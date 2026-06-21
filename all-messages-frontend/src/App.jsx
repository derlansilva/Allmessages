import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


import Header from './components/Header';
import Sidebar from './Components/Sidebar'
import ChatList from './Components/ChatList'
import ChatWindow from './Components/ChatWindow'
import Login from './pages/Login'


function App() {
  const [ selectedChat , setSelectedChat] = useState(null);

  const [activeMenu , setActiveMenu] = useState("Entrada");
  const [user , setUser] = useState(null);

  useEffect(( ) => {
    const userSave = localStorage.getItem("all_messages_user");
    if(userSave){
      setUser(JSON.parse(userSave));
    }
  } , [])

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('all_messages_user', JSON.stringify(userData));
  };


  const handleLogout = ()=> {
    setUser(null);
    localStorage.removeItem('all_messages_user');
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden font-sans text-gray-900">

      <Header user={user} onLogout={handleLogout}/>
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
