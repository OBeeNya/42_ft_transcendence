import { MouseEvent, useState, useContext, useEffect } from 'react';
import { io } from "socket.io-client";
import { UserInfos } from "../../../services/interfaces/userInfos.interface";
import Block from "../Block/Block";
import axios from 'axios';
import { SocketContext } from "../../../socketContext";

const User = ({user, isActive, onClick, onDirectMessageClick, navigate, handleBlockClick}:
			  {user: UserInfos; isActive: boolean;
			   onClick: (event: MouseEvent<HTMLElement>) => void;
			   onDirectMessageClick: () => void;
			   navigate: (path: string) => void;
			   handleBlockClick: () => void;}) =>
{
	// const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
	// const [showNotification, setShowNotification] = useState(false);
	// const socket = useContext(SocketContext);
	// const token = localStorage.getItem("token");

	// useEffect(() =>
	// {
	// 	const getCurrentUser = async () =>
	// 	{
	// 		try
	// 		{
	// 			const response = await axios.get("http://localhost:8080/users/me",
	// 			{
	// 			  headers:
	// 			  {
	// 				Authorization: `Bearer ${token}`,
	// 			  },
	// 			});

	// 			setUserInfos(response.data);
	// 		  }
	// 		  catch (error)
	// 		  {
	// 			console.error("Failed to fetch users.");
	// 		  }
	// 		};

	// 		getCurrentUser();
	// 	}, [token]);

	// const handleBlockClick = ({blockerId, blockedId}: {blockerId: number, blockedId: number}) =>
	// {
	// 	setShowNotification(true);
	// }


	return (
		<div key={user.id} className={`user ${isActive ? 'show-menu' : ''}`}>
			{showNotification && (
				<Block
					message="User has been blocked"
					onClose={() => setShowNotification(false)}
				/>
			)}
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

					<li className="dropdown-item" onClick={handleBlockClick}>
						Block
					</li>

					<li className="dropdown-item" onClick={() => console.log('Invite to Pong clicked')}>
						Invite to Pong
					</li>
				</ul>
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
