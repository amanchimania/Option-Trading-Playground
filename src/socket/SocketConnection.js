import { useEffect, useRef, useState } from "react";


const useSocket = () => {
    const ws = useRef(null);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        const socket = new WebSocket("wss://prices.algotest.xyz/mock/updates");

        socket.onopen = () => {setIsReady(true)};
        socket.onClose = () => {setIsReady(false)};
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        };

        ws.current = socket;

        return () => {
            socket.close()
        }

    }, [])

    return {
        isReady,
        sendMessage: (message) => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(message);
            }
        },
        close: () => {
            if (ws.current) {
                ws.current.close();
            }
        }
    }
}