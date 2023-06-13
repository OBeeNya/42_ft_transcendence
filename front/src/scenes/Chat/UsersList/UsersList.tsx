import { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { UserInfos } from "../../../services/interfaces/userInfos.interface"
import axios from "axios";
import DirectMessageForm from "../DirectMessage/DirectMessageForm/DirectMessageForm";
import './UsersList.css';
import User from './User';
import ChatBox from "../DirectMessage/ChatBox/ChatBox"

const UsersList = () =>
{
	const navigate = useNavigate();
	
	// privateMessageUserId contiendra l'id de l'user auquel on veut envoyer
	// un mp (initialement défini sur null)
	// quand on clique sur un bouton pour envoyer un mp (onDirectMessageClick),
	// setPrivateMessageUserId() est call avec l'id de cet utilisateur et
	// privateMessageUserId est m.a.j avec l'id en question
	
	const [privateMessageUserId, setPrivateMessageUserId] = useState<number | null>(null);
	const [users, setUsers] = useState([]);
	const [clickedUser, setClickedUser] = useState(-1);
	const token = localStorage.getItem("token");
	// console.log(localStorage.getItem('userId'))
	// const userId = Number(localStorage.getItem("userId"));
	const [currentUser, setCurrentUser] = useState<UserInfos | null>(null);

	// useEffect(() =>
	// {
	// 	if (userId === 0)
	// 		navigate('/');

	//   }, [userId, navigate]);

	useEffect(() =>
	{
		const fetchCurrentUser = async () =>
		{
			try
			{
				const response = await axios.get("http://localhost:8080/users/me",
				{
					headers:
					{
						Authorization: `Bearer ${token}`,
					},
				});
	
				setCurrentUser(response.data);

				console.log('Current user:', response.data);
				console.log('Current user ID:', response.data.id);
			}
			catch (error)
			{
				console.error('Error fetching current user:', error);
			}
		};
	
		fetchCurrentUser();
	
	}, [token]);

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
					onClick={(event: MouseEvent<HTMLElement>) =>
						{event.stopPropagation(); setClickedUser(index);}}
					onDirectMessageClick={() => setPrivateMessageUserId(user.id)} 
					navigate={navigate}
				/>
			))}
			{privateMessageUserId !== null && currentUser
			&& <DirectMessageForm senderId={currentUser.id} receiverId={privateMessageUserId} />}
			   <ChatBox senderId={currentUser ? currentUser.id : -1} receiverId={privateMessageUserId ? privateMessageUserId : -1} />
		</div>
	);
};

export default UsersList;
