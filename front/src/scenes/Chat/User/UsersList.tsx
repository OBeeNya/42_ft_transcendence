import { useEffect, useState, MouseEvent } from "react";
import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserInfos } from "../../../services/interfaces/userInfos.interface"
import User from './User';
import './UsersList.css';

interface UsersListProps
{
	setCurrentUser: Dispatch<SetStateAction<any>>;
	setPrivateMessageUserId: Dispatch<SetStateAction<any>>;
	setBlockedUsersId: Dispatch<SetStateAction<any>>;
}

const UsersList = ({setCurrentUser, setPrivateMessageUserId, setBlockedUsersId}: UsersListProps) =>
{
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [clickedUser, setClickedUser] = useState(-1);
	const token = localStorage.getItem("token");

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
	
	}, [token, setCurrentUser]);

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
				handleBlockClick={() => setBlockedUsersId(user.id)}
			/>
		))}
		</div>
	);
};

export default UsersList;

