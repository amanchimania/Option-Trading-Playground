import { useEffect } from 'react'
import './App.css'
import useSocket from "./socket/SocketConnection";

function App() {
  const { isReady, sendMessage } = useSocket();

  useEffect(() => {
    if (isReady) {
      sendMessage({
        msg : {
          type: 'subscribe',
          datatypes:['ltp'],
          underlyings: [
            {
              underlying: 'BANKNIFTY',
              cash: true,
              options: ['2025-12-20'],
            }
          ]
        }
      });
    }
  }, [isReady, sendMessage]);

  return (
    <>
      <h1>Hello World</h1>
      <button onClick={() => sendMessage({
        msg : {
          type: 'subscribe',
          datatypes:['ltp'],
          underlyings: [
            {
              underlying: 'BANKNIFTY',
              cash: true,
              options: ['2025-12-20'],
            }
          ]
        }
      })}>Subscribe</button>
    </>
  )
}

export default App
