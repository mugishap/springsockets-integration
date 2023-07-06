import React, { useEffect } from 'react'
import { handleSockets } from './utils/sockets'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [isConnected, setIsConnected] = React.useState(false)
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([])
  const [user, setUser] = React.useState<string>("")
  useEffect(() => {
    handleSockets({ setIsConnected, setOnlineUsers, user, onlineUsers, setUser })
  }, [])
  return (
    <div className='w-screen min-h-screen flex flex-col'>
      <ToastContainer position='top-right' autoClose={5000} />
      <span className='font-bold text-lg'>{isConnected && `Online as ${user}`}</span>
      <ul>
        {
          onlineUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App