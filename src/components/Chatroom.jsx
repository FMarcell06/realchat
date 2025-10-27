import React, { useRef, useState, useEffect } from 'react';
import { addMessage, readMessages } from '../utljs';
import { Message } from './Message';
import { FiSend } from "react-icons/fi";

export const Chatroom = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const chatRef = useRef(null);

  useEffect(() => {
    const unsubscribe = readMessages(setMessages);
    return unsubscribe;
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    const chat = chatRef.current;
    if (chat) {
      chat.scrollTo({
        top: chat.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = inputRef.current.value.trim();
    if (!text) return;

    const message = {
      text,
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      timestamp: Date.now(),
    };

    await addMessage(message);
    inputRef.current.value = '';
  };

  return (
    <div>
      <div className="chatroom" ref={chatRef}>
        {messages &&
          messages.map((msg) => (
            <Message key={msg.id} msg={msg} currentUser={user.uid} />
          ))}
      </div>

      <div className="msgType">
        <form onSubmit={handleSubmit}>
          <input ref={inputRef} type="text" placeholder="Írj valamit..." />
          <button type="submit">Küldés <FiSend style={{margin:"auto",paddingTop:"3px",scale:"1.2"}} /></button>
        </form>
      </div>
    </div>
  );
};
