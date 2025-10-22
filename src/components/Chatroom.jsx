import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { addMessage, readMessages } from '../utljs'
import { Message } from './Message'
import { useEffect } from 'react'

export const Chatroom = ({user}) => {
    const [messages,setMessages]=useState([])
    const inputRef = useRef()

    useEffect(()=>{
        const unsubscribe = readMessages(setMessages)
        return unsubscribe
    },[])

    console.log(messages);
    

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const text = inputRef.current.value
        console.log(text);
        
        const message = {
            text,
            uid:user.uid,
            photoURL:user.photoURL,
            displayName:user.displayName,
            timestamp:Date.now(),
        }
        await addMessage(message)
    }
  return (
    <div className='chatroom'>
        Chatroom
        <form onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" placeholder='írj valamit'/>
            <button type='submit'>Küldés</button>
        </form>
        {messages&&messages.map(msg=><Message key={msg.id} msg={msg} currentUser={user.uid}/>)}
    </div>
  )
}
