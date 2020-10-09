import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <>
            <input
                type="text"
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                onChange={e => setRoom(e.target.value)}
            />
            <Link 
                onClick={event => (!name || !room) ? event.preventDefault() : null}
                to={`/chat?name=${name}&room=${room}`}>
                <button type="submit">Sign in</button>
            </Link>
        </>
    )
}

export default Join
