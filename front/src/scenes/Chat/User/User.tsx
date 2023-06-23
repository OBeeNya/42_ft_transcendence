import axios from 'axios';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { UserInfos } from "../../../services/interfaces/userInfos.interface";
import { SocketContext } from '../../../socketContext';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const User = ({user,isActive, onClick, onDirectMessageClick, navigate}:
			  {user: UserInfos;
			   isActive: boolean;
			   onClick: (event: MouseEvent<HTMLElement>) => void;
			   onDirectMessageClick: () => void;
			   navigate: (path: string) => void;}) =>
{
	const socket = useContext(SocketContext);
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

	const handleBlock = () =>
	{
		if (socket && currentUser)
			socket.emit('blockUser', {blockerId: currentUser.id, blockedId: user.id});
	};

	return (
		<div key={user.id} className={`user ${isActive ? 'show-menu' : ''}`}>
			<p className="username" onClick={onClick}>{user.name}</p>
			{isActive && (
				<DropdownMenu
					user={user}
					onDirectMessageClick={onDirectMessageClick}
					onBlock={handleBlock}
					navigate={navigate}
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
