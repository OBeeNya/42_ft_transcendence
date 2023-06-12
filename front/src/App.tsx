import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./socketContext";
import { Route, Routes } from 'react-router-dom';
import SignupPage from './scenes/SignUp/SignupPage';
import SigninPage from './scenes/SignIn/SigninPage';
import AuthPage from './scenes/Auth/AuthPage';
import HomePage from './scenes/HomePage/HomePage';
import EditProfilePage from './scenes/EditProfile/EditProfilePage';
import ProfilePage from './scenes/Profile/ProfilePage';
import Callback42 from './scenes/CallBack42/Callback42';
import PongPage from './scenes/Pong/PongPage';
import PongPageGame from './scenes/Pong/PongPageGame';
import { ProtectedRoute , ProtectedRouteProps } from "./components/protectedRoutes";
import OnlinePage from './scenes/Online/OnlinePage';
import Leaderboard from './scenes/Leaderboard/Leaderboard';
import OtherUserProfilePage from './scenes/OtherUserProfilePage/OtherUserProfilePage';
import MainPage from './scenes/Chat/MainPage/MainPage';
import TfaPage from './scenes/Tfa/TfaPage';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> =
{
  authenticationPath: '/',
};

function App()
{
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() =>
	{
		const newSocket = io('http://localhost:3000');

		newSocket.on('connect', () =>
		{
			console.log('WebSocket connecté');
		});
	
		newSocket.on('disconnect', (reason: string) =>
		{
			console.log('WebSocket déconnecté, raison:', reason);
		});

		setSocket(newSocket);

		return () =>
		{
			newSocket.off('connect');
			newSocket.off('disconnect');
			newSocket.close();
		};
	}, []);

  return (
	// tous les composants enfants peuvent accéder à une instance de socket grâce au context
	<SocketContext.Provider value={socket}> 
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
			<Route path="/leaderboard" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Leaderboard/>} />} />
		</Routes>
	</SocketContext.Provider>
  );
}

export default App;
