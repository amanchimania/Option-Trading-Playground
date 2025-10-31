import React, { useEffect } from 'react'
import './App.css'
import useSocket from './socket/SocketConnection';

function App() {
  const { isReady, sendMessage, close } = useSocket();

  useEffect(() => {
    if (isReady) {
      // sendMessage("Hello, server!");
    }
  }, [isReady, sendMessage]);

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
