import axios from 'axios';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { UserInfos } from "../../../services/interfaces/userInfos.interface";
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { SocketContext } from '../../../contexts';

const User = ({user,isActive, onClick, onDirectMessageClick, navigate}:
			  {user: UserInfos;
			   isActive: boolean;
			   onClick: (event: MouseEvent<HTMLElement>) => void;
			   onDirectMessageClick: () => void;
			   navigate: (path: string) => void;}) =>
{
	const socket = useContext(SocketContext);
	const [currentUser, setCurrentUser] = useState<UserInfos | null>(null);
	const [isBlocked, setIsBlocked] = useState(false);
	const [blockedUsers, setBlockedUsers] = useState<number[]>([]);
	const token = localStorage.getItem("token");

	useEffect(() =>
	{
		const getCurrentUser = async () =>
		{
			try
			{
				const currentUserResponse = await axios.get("http://localhost:8080/users/me",
				{
					headers:
					{
						Authorization: `Bearer ${token}`,
					},
				});

				setCurrentUser(currentUserResponse.data);
			}
			catch (error)
			{
				console.error('Error fetching current user:', error);
			}
		};

		getCurrentUser();

	}, [token, setCurrentUser]);

	const handleAddFriend = async () =>
	{
		if (currentUser && socket)
			socket.emit('addFriend', {userId: currentUser.id, friendId: user.id});
		else 
			console.error('Current user is null or socket is not available');
	}

	const handleBlock = async () =>
	{
		if (currentUser && socket)
		{
			socket.emit('blockUser', {userId: currentUser.id, blockedId: user.id});
			setIsBlocked(true);
		}

		else
			console.error('Current user is null or socket is not available');
	};

	useEffect(() =>
	{
		if (socket) 
		{
			socket.on('userBlocked', ({userId, blockedId}) => 
			{
				if (currentUser && (blockedId === currentUser.id || userId === currentUser.id)) 
				{
					setBlockedUsers(oldBlockedUsers => [...oldBlockedUsers, blockedId]);
					setIsBlocked(true);
				}
			});
		}

		return () => 
		{
			if (socket) 
				socket.off('userBlocked');
		};

	});
	// }, [token, setCurrentUser, user.id, socket]);

	const handleInviteToPong = async () =>
	{
		if (currentUser && socket)
			socket.emit('sendPongInvitation', {userId: currentUser.id, invitedId: user.id});
		else
			console.error('Current user is null or socket is not available');
	}

	useEffect(() =>
	{
		if (currentUser && socket)
		{
			socket.on('pongInvitationReceived', ({invitedId}) =>
			{
				if (currentUser.id === invitedId)
					navigate('/matchmaking');
			});
		}

		return () =>
		{
			if (socket) 
				socket.off('pongInvitationReceived');
		};

	}, [currentUser, socket, navigate]);

	return (
		<div key={user.id} className={`user ${isActive ? 'show-menu' : ''}`}>
			<p className="username" onClick={onClick}>{user.name}</p>
			{isActive && !isBlocked && !blockedUsers.includes(user.id) && currentUser && !blockedUsers.includes(currentUser.id) && (
				<DropdownMenu
					user={user}
					onDirectMessageClick={onDirectMessageClick}
					onAddFriendClick={handleAddFriend}
					onBlockClick={handleBlock}
					onInviteToPongClick={handleInviteToPong}
					navigate={navigate}
					isBlocked={isBlocked || blockedUsers.includes(user.id)}
				/>
			)}

			<div className={user.connected ? 'online' : 'offline'}>
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
			</div>
		</div>
	);
};

export default User;