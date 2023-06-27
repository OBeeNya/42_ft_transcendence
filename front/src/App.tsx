import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { MessageContext, SocketContext } from "./contexts";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute , ProtectedRouteProps } from "./components/protectedRoutes";
import SignupPage from './scenes/SignUp/SignupPage';
import SigninPage from './scenes/SignIn/SigninPage';
import AuthPage from './scenes/Auth/AuthPage';
import HomePage from './scenes/HomePage/HomePage';
import EditProfilePage from './scenes/EditProfile/EditProfilePage';
import ProfilePage from './scenes/Profile/ProfilePage';
import Callback42 from './scenes/CallBack42/Callback42';
import PongPage from './scenes/Pong/PongPage';
import PongPageGame from './scenes/Pong/PongPageGame';
import OnlinePage from './scenes/Online/OnlinePage';
import Social from './scenes/Social/Social';
import MainPage from './scenes/Chat/MainPage/MainPage';
import TfaPage from './scenes/Tfa/TfaPage';
import { Message } from './scenes/Chat/ChatBox/ChatBox';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> =
{
	authenticationPath: '/',
};

function App()
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

				if(socket)
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
			console.log('WebSocket connected');
		});

		newSocket.on('disconnect', (reason: string) =>
		{
			console.log('WebSocket disconnected, reason:', reason);
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
					<Route path="/" element={<AuthPage/>} />
					<Route path="/signup" element={<SignupPage/>} />
					<Route path="/signin" element={<SigninPage/>} />
					<Route path="/callback42" element={<Callback42/>} />
					<Route path="/tfa" element={<TfaPage/>} />
					<Route path="/home" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage/>} />} />
					<Route path="/profile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ProfilePage/>} />} />
					<Route path="/editprofile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<EditProfilePage/>} />} />
					<Route path="/pong" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPage/>} />} />
					<Route path="/pongGame" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPageGame/>} />} />
					<Route path="/chat" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MainPage/>} />} />
					<Route path="/online" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<OnlinePage/>} />} />
					<Route path="/social" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Social/>} />} />
				</Routes>
			</MessageContext.Provider>
		</SocketContext.Provider>
	);
}

export default App;
