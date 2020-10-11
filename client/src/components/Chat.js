import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from './InfoBar'

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        })
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', ({ user, text }) => {
            const message = { user, text }
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users)
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()

        socket.emit('sendMessage', { message }, () => { setMessage('') })
    }

    return (
        <>
            <h1>Chat</h1>
            <InfoBar roomName={room} users={users}/>
            {messages ? messages.map((msg) => (<div>{msg.text} by {msg.user}</div>)) : ''}
            <form action="" onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>

        </>
    )
}

export default Chat
