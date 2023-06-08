import { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { UserInfos } from "../../../services/interfaces/userInfos.interface"
import axios from "axios";
import PrivateMessageForm from "../PrivateMessageForm/PrivateMessageForm";
import useSocket from "../PrivateMessageForm/useSocket";
import './ChatUsersList.css';

interface ClientDirectMessage
{
	senderId: number;
	receiverId: number;
	content: string;
}

const ChatUsersList = () => 
{
	const navigate = useNavigate();
	const [privateMessageUserId, setPrivateMessageUserId] = useState<number | null>(null);
	const [users, setUsers] = useState([]);
	const [clickedUser, setClickedUser] = useState(-1); 
	const token = localStorage.getItem("token");
	const socket = useSocket('http://localhost:8080');
	const [messages, setMessages] = useState<ClientDirectMessage[]>([]);

	// gère la connexion du socket et écoute les events provenant du serveur
	useEffect(() =>
	{
		if (!socket) return;
	  
		socket.connect();

		// Lors de la réception d'un nouveau message du serveur, ajoutez-le à l'état local
		socket.on('dmToClient', (newMessage) =>
		{
			setMessages([...messages, newMessage]);
		});

		// socket.on('dmToClient', (payload) =>
		// {
		// 	if (payload.receiverId === privateMessageUserId || payload.senderId === privateMessageUserId)
		// 	setMessages(prevMessages => [...prevMessages, payload]);
		// });

		socket.on('history', (history) =>
		{
			setMessages(history);
		});

		socket.on('error', (error) =>
		{
			console.error('There was an error with the socket connection:', error);
		});

		return () =>
		{
			socket.off('dmToClient');
			socket.off('history');
			socket.off('error');
		};

	}, [socket, privateMessageUserId]);

	useEffect(() =>
	{
		if (!socket || privateMessageUserId === null)
			return;
	
		const senderId = parseInt(localStorage.getItem("userId") || '0');
		socket.emit('getHistory', { senderId, receiverId: privateMessageUserId });
	  
	}, [socket, privateMessageUserId]);

	useEffect(() =>
	{
		const fetchUsers = async () =>
		{
			try
			{
				const response = await axios.get("http://localhost:8080/users",
				{
					headers:
					{
						Authorization: `Bearer ${token}`,
					},
				});

				setUsers(response.data);
			}
			catch (error)
			{
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();

	}, [token]);

	useEffect(() =>
	{
		const clickHandler = () => setClickedUser(-1);
		window.addEventListener('click', clickHandler);

		return () => window.removeEventListener('click', clickHandler);
	}, []);

	return (
		<div className="users-list">
			{users.map((user: UserInfos, index) =>
			(
				<User 
					user={user} 
					isActive={clickedUser === index}

					onClick={(event: MouseEvent<HTMLElement>) =>
						{event.stopPropagation(); setClickedUser(index);}}

					onDirectMessageClick={() => setPrivateMessageUserId(user.id)} 
					navigate={navigate}
				/>
			))}
			{privateMessageUserId !== null &&
			<PrivateMessageForm receiverId={privateMessageUserId} />}

			<div className="messages">
				{messages.map((message, index) =>
				(
					<p key={index} className={message.senderId === privateMessageUserId ? 'incoming' : 'outgoing'}>
						{message.senderId === privateMessageUserId ?
							`${message.senderId}: ${message.content}` : `You: ${message.content}`}
					</p>
				))}

			</div>
		</div>
	);
};

const User = ({user, isActive, onClick, onDirectMessageClick, navigate}:
			  {user: UserInfos, isActive: boolean, onClick: (event: MouseEvent<HTMLElement>) =>
			  void, onDirectMessageClick: () => void, navigate: (path: string) => void}) =>
{
	return (
		<div key={user.id} className={`user ${isActive ? 'show-menu' : ''}`}>
			<img src={`/avatar/${user.id}.png`} alt="avatar" className="avatar" 
				onError={(event) =>
				{
					const target = event.target as HTMLImageElement;
					target.src = '/avatar/auto.png';
				}}
			/>
			<p className="username" onClick={onClick}>{user.name}</p>
			{isActive &&
			(
				<ul className="dropdown-menu">
					<li className="dropdown-item" onClick={() => navigate(`/profile/${user.id}`)}>
						Profile
					</li>

					<li className="dropdown-item" onClick={onDirectMessageClick}>
  						Direct Message
					</li>

					<li className="dropdown-item" onClick={() => console.log('Profile clicked')}>
						Add friend
					</li>

					<li className="dropdown-item" onClick={() => console.log('Block clicked')}>
						Block
					</li>

					<li className="dropdown-item" onClick={() => console.log('Invite to Pong clicked')}>
						Invite to Pong
					</li>
				</ul>
			)}
			<p className={user.connected ? 'online' : 'offline'}>
				{user.isPlaying ?
					<>
						<div className="playing-indicator" />
						<span>Playing</span>
					</> :
					(user.connected ?
					<>
						<div className="online-indicator" />
						<span>Online</span>
					</> :
					<>
						<div className="offline-indicator" />
						<span>Offline</span>
					</>)
				}
			</p>
		</div>
	);
};

export default ChatUsersList;
