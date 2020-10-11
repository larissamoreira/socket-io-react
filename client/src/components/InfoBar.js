import React from 'react'

const InfoBar = ({roomName, users}) => {
    return (
        <div>
            <div><strong>Room:</strong> {roomName}</div>
            <div><strong>Users in the room:</strong> {users ? users.map((user) => (<span>{user.name} </span>)) : ''}</div>
            <a href="/">Close room</a>
        </div>
    )
}

export default InfoBar
