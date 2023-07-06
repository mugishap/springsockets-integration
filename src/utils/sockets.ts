import { v4 } from "uuid"


const socket = new WebSocket("ws://localhost:8088/socket")
export const handleSockets = ({ setIsConnected, user, setOnlineUsers, onlineUsers, setUser }: { user: string, onlineUsers: string[], setIsConnected: Function, setOnlineUsers: Function, setUser: Function }) => {
    socket.onopen = () => {
        console.log("Connected to server")
        setIsConnected(true)
        const id = v4()
        socket.send(JSON.stringify({ event: "identity", id }))
        setUser(id)
    }
    socket.onclose = () => {
        console.log("Disconnected from server")
        setIsConnected(false)
        setUser("")
        setOnlineUsers([])
    }
    socket.onmessage = (message) => {
        const data = JSON.parse(message.data)
        console.log(data)
        const event = data.event
        switch (event) {
            case "verified-identity":
                setOnlineUsers([...data.data])
                break;
            case "new-identity":
                console.log(onlineUsers)
                setOnlineUsers([...onlineUsers, data.data])
                console.log("New identity")
                break;
            case "remove-identity":
                setOnlineUsers(onlineUsers.filter((user) => user !== data.data))
                console.log("Removed identity")
                break;
        }
    }
}

export const sendMessage = ({ message, receiver, sender }: { message: string, receiver: string, sender: string }) => {
    socket.send(JSON.stringify({
        event: "new-message", message: {
            content: message,
            receiver,
            sender
        }
    }))
}