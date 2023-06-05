import { useEffect, useState, MouseEvent } from "react";
import { UserInfos } from "../../services/interfaces/userInfos.interface"
import axios from "axios";
import './ChatUsersList.css';

const ChatUsersList = () => 
{
	const [users, setUsers] = useState([]);
	const [clickedUser, setClickedUser] = useState(-1); 
	const token = localStorage.getItem("token");

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

	useEffect(() => {
		const clickHandler = () => setClickedUser(-1);
		window.addEventListener('click', clickHandler);

		return () => window.removeEventListener('click', clickHandler);
	}, []);

	return (
		<div className="users-list">
			{users.map((user: UserInfos, index) =>
			(
				<User user={user} isActive={clickedUser === index} onClick={(event: MouseEvent<HTMLElement>) => { event.stopPropagation(); setClickedUser(index); }} />
			))}
		</div>
	);
};

const User = ({ user, isActive, onClick }: { user: UserInfos, isActive: boolean, onClick: (event: MouseEvent<HTMLElement>) => void }) =>
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
					<li className="dropdown-item" onClick={() => console.log('Private Message clicked')}>
						Private Message
					</li>
					<li className="dropdown-item" onClick={() => console.log('Block clicked')}>
						Block
					</li>
					<li className="dropdown-item" onClick={() => console.log('Invite to Pong clicked')}>
						Invite to Pong
					</li>
					<li className="dropdown-item" onClick={() => console.log('Profile clicked')}>
						Profile
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
