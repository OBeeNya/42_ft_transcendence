import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (serverPath: string): Socket | undefined =>
{
	const socketRef = useRef<Socket>();

	useEffect(() =>
	{
		socketRef.current = io(serverPath, {autoConnect: false});
		
		return () =>
		{
			socketRef.current?.disconnect();
		};
	}, [serverPath]);

	return (socketRef.current);
};

export default useSocket;
