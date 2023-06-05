import { useEffect, useState } from "react";
import { UserInfos } from "../../services/interfaces/userInfos.interface"
import axios from "axios";
import './ChatUsersList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBan, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons';

const ChatUsersList = () => 
{
	const [users, setUsers] = useState([]);
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

	return (
		<div className="users-list">
			{users.map((user: UserInfos) =>
			(
				<User user={user} />
			))}
		</div>
	);
};

const User = ({ user }: { user: UserInfos }) =>
{
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = (event: React.MouseEvent) =>
	{
		event.stopPropagation();
		setIsClicked(!isClicked);
	};

	useEffect(() =>
	{
		const clickHandler = () => setIsClicked(false);
		window.addEventListener('click', clickHandler);

		return () => window.removeEventListener('click', clickHandler);
	}, []);

	return (
		<div key={user.id} className="user">
			<img src={`/avatar/${user.id}.png`} alt="avatar" className="avatar" 
				onError={(event) =>
				{
					const target = event.target as HTMLImageElement;
					target.src = '/avatar/auto.png';
				}}
			/>
			<p className="username" onClick={handleClick}>{user.name}</p>
			{isClicked &&
			(
				<div className="user-actions">
					<button className="user-action">
						<FontAwesomeIcon icon={faEnvelope} />
					</button>
					<button className="user-action">
						<FontAwesomeIcon icon={faBan} />
					</button>
					<button className="user-action">
						<FontAwesomeIcon icon={faGamepad} />
					</button>
					<button className="user-action">
						<FontAwesomeIcon icon={faUser} />
					</button>
				</div>
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
