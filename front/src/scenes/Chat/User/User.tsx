import axios from 'axios';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { UserInfos } from "../../../services/interfaces/userInfos.interface";
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const User = ({user,isActive, onClick, onDirectMessageClick, navigate, blockedUsers, blockedByUsers, onBlockSuccess}:
			  {user: UserInfos;
			   isActive: boolean;
			   onClick: (event: MouseEvent<HTMLElement>) => void;
			   onDirectMessageClick: () => void;
			   navigate: (path: string) => void;
			   blockedUsers: UserInfos[];
			   blockedByUsers: UserInfos[];
			   onBlockSuccess: (userId: number) => void;}) =>
{
	const [currentUser, setCurrentUser] = useState<UserInfos | null>(null);
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

	const handleBlock = async () =>
	{
		try
		{
			await axios.post("http://localhost:8080/users/block", {userId: user.id},
			{
				headers:
				{
					Authorization: `Bearer ${token}`,
				},
			});

			onBlockSuccess(user.id);
		}
		catch (error)
		{
			console.error('Error blocking user:', error);
		}
	};

	const handleAddFriend = async () =>
	{
		// Ici, vous pouvez appeler votre fonction pour ajouter un ami en utilisant l'ID de l'utilisateur
		console.log('Add friend clicked for user ID: ', user.id);
	}

	return (
		<div key={user.id} className={`user ${isActive ? 'show-menu' : ''}`}>
			<p className="username" onClick={onClick}>{user.name}</p>
			{isActive && (
				<DropdownMenu
					user={user}
					onDirectMessageClick={onDirectMessageClick}
					onBlock={handleBlock}
					navigate={navigate}
					blockedUsers={blockedUsers}
					blockedByUsers={blockedByUsers}
					onAddFriendClick={handleAddFriend}
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
