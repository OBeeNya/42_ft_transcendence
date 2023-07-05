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
		try
		{
			// console.log('Attempting to add friend...');

			if (currentUser && socket)
			{
				// console.log(`Emitting addFriend event with User ID: ${currentUser.id}, Friend ID: ${user.id}`);
				socket.emit('addFriend', {userId: currentUser.id, friendId: user.id});
			}

			else 
				console.error('Current user is null or socket is not available');
		}
		catch (error)
		{
			console.error('Error adding friend:', error);
		}
	}

	const handleBlock = async () =>
	{
		try
		{
			// console.log('Attempting to block user...');
	
			if (currentUser && socket)
			{
				// console.log(`Emitting blockUser event with User ID: ${currentUser.id}, Blocked User ID: ${user.id}`);
				socket.emit('blockUser', {userId: currentUser.id, blockedId: user.id});
				setIsBlocked(true);
			}
	
			else
				console.error('Current user is null or socket is not available');
		}
		catch (error)
		{
			console.error('Error blocking user:', error);
		}
	};

	const handleInviteToPong = async () =>
	{
		try
		{
			if (currentUser && socket)
			{
				console.log(`Emitting sendPongInvitation event with User ID: ${currentUser.id}, Invited ID: ${user.id}`);	
				socket.emit('sendPongInvitation', {userId: currentUser.id, invitedId: user.id});
			}

			else
				console.error('Current user is null or socket is not available');
		}
		catch (error)
		{
			console.error('Error inviting user to Pong:', error);
		}
	}

	// const handleAcceptPong = async () =>
	// {
	// 	if (currentUser && socket)
	// 	{
	// 		socket.emit('acceptPongInvitation', {userId: currentUser.id, invitedId: user.id});
	// 		navigate("/matchmaking");
	// 	}

	// 	else
	// 		console.error('Current user is null or socket is not available');
	// }

	// const handleRefusePong = async () =>
	// {
	// 	if (currentUser && socket)
	// 		socket.emit('refusePongInvitation', {userId: currentUser.id, invitedId: user.id});
	// 	else 
	// 		console.error('Current user is null or socket is not available');
	// }

	// useEffect(() =>
	// {
	// 	if (socket)
	// 	{
	// 		socket.on('pongInvitationReceived', (invitation) =>
	// 		{
	// 			toast(
	// 				<div>
	// 					<p>You have been invited to Pong!</p>
	// 					<button onClick={() => handleAcceptPong()}>Accept</button>
	// 					<button onClick={() => handleRefusePong()}>Refuse</button>
	// 				</div>
	// 			);
	// 		});
	// 	}
	// 	return () =>
	// 	{
	// 		if (socket) 
	// 			socket.off('pongInvitationReceived');
	// 	};
	// }, [socket, currentUser, navigate]);

	useEffect(() =>
	{
		if (socket) 
		{
			socket.on('userBlocked', ({userId, blockedId}) => 
			{
				if (currentUser && (blockedId === currentUser.id || userId === currentUser.id)) 
				{
					// console.log(`User ${blockedId} has been blocked by ${userId}`);
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

	}, [token, setCurrentUser, user.id, socket]);

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