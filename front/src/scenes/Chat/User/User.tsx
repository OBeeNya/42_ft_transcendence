import axios from 'axios';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { UserInfos } from "../../../services/interfaces/userInfos.interface";
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { SocketContext } from '../../../contexts';

interface Invitation
{
	userId: number;
	invitedId: number;
}

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
	const [invitations, setInvitations] = useState<Invitation[]>([]);
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

	const handleInviteToPong = async () =>
	{
		try
		{
			if (currentUser && socket)
				socket.emit('sendPongInvitation', {userId: currentUser.id, invitedId: user.id});
			else
				console.error('Current user is null or socket is not available');
		}
		catch (error)
		{
			console.error('Error inviting user to Pong:', error);
		}
	}

	useEffect(() =>
	{
		if (socket)
		{
			socket.on('pongInvitationReceived', (invitation) =>
			{
				setInvitations(prevInvitations => [...prevInvitations, invitation]);
				createNotification(invitation);
			});
		}

		return () =>
		{
			if (socket)
				socket.off('pongInvitationReceived');
		};

	}, [socket]);

	const acceptInvitation = async () =>
	{
		console.log("acceptInvitation est call");

		try
		{
			if (currentUser && socket)
				socket.emit('acceptPongInvitation', {userId: currentUser.id, invitedId: user.id});
			else
				console.error('[acceptInvitation] Current user is null or socket is not available');
		}
		catch (error)
		{
			console.error('Error accepting invitation to Pong:', error);
		}
	};

	const refuseInvitation = async () =>
	{
		console.log("refuseInvitation est call !");

		try
		{
			if (currentUser && socket)
				socket.emit('refusePongInvitation', {userId: currentUser.id, invitedId: user.id});
			else
				console.error('[refuseInvitation] Current user is null or socket is not available');
		}
		catch (error)
		{
			console.error('Error refusing invitation to Pong:', error);
		}
	};

	useEffect(() =>
	{
		if (socket && currentUser)
		{
			socket.on('pongInvitationAccepted', (data) =>
			{
				console.log('Invitation accepted:', data);
				navigate('/matchmaking');
			});

			socket.on('pongInvitationRefused', (data) =>
			{
				console.log('Invitation refused:', data);
				// Remove notification here
			});
		}

		return () =>
		{
			if (socket)
			{
				socket.off('pongInvitationAccepted');
				socket.off('pongInvitationRefused');
			}
		};

	}, [socket, currentUser, navigate]);

	const createNotification = (invitation: Invitation) =>
	{
		let notificationDiv = document.createElement("div");
		notificationDiv.style.position = "fixed";
		notificationDiv.style.bottom = "20px";
		notificationDiv.style.right = "20px";
		notificationDiv.style.width = "300px";
		notificationDiv.style.height = "100px";
		notificationDiv.style.backgroundColor = "#f8d7da";
		notificationDiv.style.color = "#721c24";
		notificationDiv.style.padding = "10px";
		notificationDiv.style.border = "solid 1px #f5c6cb";
		notificationDiv.style.borderRadius = "5px";
		notificationDiv.style.zIndex = "1000";
		notificationDiv.innerHTML = "You have been invited to Pong";
	
		let acceptButton = document.createElement("button");
		acceptButton.style.marginRight = "10px";
		acceptButton.innerHTML = "Accept";
		acceptButton.addEventListener('click', () => acceptInvitation());
	
		let refuseButton = document.createElement("button");
		refuseButton.innerHTML = "Refuse";
		refuseButton.addEventListener('click', () => refuseInvitation());
	
		notificationDiv.appendChild(acceptButton);
		notificationDiv.appendChild(refuseButton);
	
		document.body.appendChild(notificationDiv);
	
		setTimeout(() =>
		{
			notificationDiv.remove();
		}, 60000);
	};

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