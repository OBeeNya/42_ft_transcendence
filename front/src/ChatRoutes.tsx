import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, ProtectedRouteProps } from "./components/protectedRoutes";
import { SocketContext, MessageContext } from "./contexts";
import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import MainPage from "./scenes/Chat/MainPage/MainPage";
import { Message } from "./scenes/Chat/ChatBox/ChatBox";
import Friends from "./scenes/Friends/Friends";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> =
{
	authenticationPath: '/',
};

function ChatRoutes()
{
	const [socket, setSocket] = useState<Socket | null>(null);
	const [userId, setUserId] = useState<number | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);

	const token = localStorage.getItem("token");

	useEffect(() =>
	{
		if (!socket)
			return;

		const privateMessageListener = (newMessage: Message) =>
		{
			setMessages(oldMessages => [...oldMessages, newMessage]);
		};

		const conversationListener = (oldMessages: Message[]) =>
		{
			setMessages(oldMessages);
		};

		socket.on('privateMessage', privateMessageListener);
		socket.on('conversation', conversationListener);

		return () =>
		{
			socket.off('privateMessage', privateMessageListener);
			socket.off('conversation', conversationListener);
		};

	}, [socket]);

	useEffect(() =>
	{
		const fetchCurrentUser = async () =>
		{
			try
			{
				const response = await axios.get("http://localhost:8080/users/me",
				{
					headers:
					{
						Authorization: `Bearer ${token}`,
					},
				});

				setUserId(response.data.id);

				if (socket)
					socket.emit('userConnected', response.data.id);
			}

			catch (error)
			{
				console.error('Error fetching current user:', error);
			}
		};

		fetchCurrentUser();

	}, [token, socket]);

	useEffect(() =>
	{
		const newSocket = io('http://localhost:8080');

		newSocket.on('connect', () =>
		{
			// console.log('WebSocket connected');
		});

		newSocket.on('disconnect', (reason: string) =>
		{
			// console.log('WebSocket disconnected, reason:', reason);
		});

		setSocket(newSocket);

		return () =>
		{
			newSocket.off('connect');
			newSocket.off('disconnect');
			newSocket.close();
		};

	}, [userId]);

	return (
		<SocketContext.Provider value={socket}>
			<MessageContext.Provider value={messages}>
				<Routes>
					<Route path="/chat" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MainPage/>} />} />
					<Route path="/friends" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Friends/>} />} />
				</Routes>
			</MessageContext.Provider>
		</SocketContext.Provider>
	);
}

export default ChatRoutes;