import { useEffect, useRef, useState } from "react";


const useSocket = () => {
    const ws = useRef<WebSocket | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState<any>(null);
    useEffect(() => {
        const socket = new WebSocket("wss://prices.algotest.xyz/mock/updates");

        socket.onopen = () => {setIsReady(true)};
        socket.onclose = () => {setIsReady(false)};
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setVal(data);
        };

        ws.current = socket;

        return () => {
            socket.close()
        }

    }, [])

    return {
        isReady,
        sendMessage: (message: unknown) => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify(message));
            }
        },
        close: () => {
            if (ws.current) {
                ws.current.close();
            }
        }
    }
}

export default useSocket;