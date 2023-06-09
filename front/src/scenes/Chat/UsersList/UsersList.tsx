import { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { UserInfos } from "../../../services/interfaces/userInfos.interface"
import axios from "axios";
import DirectMessageForm from "../DirectMessage/DirectMessageForm/DirectMessageForm";
import './UsersList.css';
import User from './User';

const UsersList = () => 
{
	const navigate = useNavigate();
	const [privateMessageUserId, setPrivateMessageUserId] = useState<number | null>(null);
	const [users, setUsers] = useState([]);
	const [clickedUser, setClickedUser] = useState(-1); 
	const token = localStorage.getItem("token");
	const userId = Number(localStorage.getItem("userId"));

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
					key={user.id}
					user={user} 
					isActive={clickedUser === index} 
					onClick={(event: MouseEvent<HTMLElement>) => { event.stopPropagation(); setClickedUser(index); }}
					onDirectMessageClick={() => setPrivateMessageUserId(user.id)} 
					navigate={navigate}
				/>
			))}
			{privateMessageUserId !== null && <DirectMessageForm senderId={userId} receiverId={privateMessageUserId} />}
		</div>
	);
};

export default UsersList;
