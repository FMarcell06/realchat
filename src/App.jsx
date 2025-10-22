import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Chatroom } from './components/ChatRoom'
import { SignIn } from './components/SignIn'
import { useEffect } from 'react'
import { auth } from './firebaseApp'
import { signOut } from 'firebase/auth'

function App() {
  const [user,setUser]=useState(null)

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged(setUser)
    return unsub
  },[])
  user&& console.log(user);

  return (
    <div className='container'>
      <h1>Realchat</h1>
      {user ? 
        <>
        <div className='user-info'>
          <img src={user.photoURL} alt="image" />
          <span>{user.displayName}</span>
          <button onClick={()=>signOut(auth)}>Kijelentkezés</button>
        </div>
        <Chatroom user={user}/>
        </> :
        <SignIn/>
      }
    </div>
  )
}

export default App
