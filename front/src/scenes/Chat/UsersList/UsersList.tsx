import { useEffect, useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserInfos } from "../../../services/interfaces/userInfos.interface"
import User from '../User/User';
import './UsersList.css';

interface UsersListProps
{
	setCurrentUser: Dispatch<SetStateAction<any>>;
	setPrivateMessageUserId: Dispatch<SetStateAction<any>>;
}

const UsersList = ({setCurrentUser, setPrivateMessageUserId}: UsersListProps) =>
{
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [blockedUsers, setBlockedUsers] = useState<UserInfos[]>([]);
	const [blockedByUsers, setBlockedByUsers] = useState<UserInfos[]>([]);
	const [clickedUser, setClickedUser] = useState(-1);
	const token = localStorage.getItem("token");

	useEffect(() =>
	{
		const getBlockedUsers = async () =>
		{
			try
			{
				const blockedUsersResponse = await axios.get("http://localhost:8080/users/blocked",
				{
					headers:
					{
						Authorization: `Bearer ${token}`,
					},
				});

				setBlockedUsers(blockedUsersResponse.data);
			}
			catch (error)
			{
				console.error('Error fetching blocked user:', error);
			}
		};

		getBlockedUsers();

	}, [token, setBlockedUsers]);

	useEffect(() =>
	{
		const getBlockedByUsers = async () =>
		{
			try
			{
				const blockedByUsersResponse = await axios.get("http://localhost:8080/users/blockedBy",
				{
					headers:
					{
						Authorization: `Bearer ${token}`,
					},
				});

				setBlockedByUsers(blockedByUsersResponse.data);
			}
			catch (error)
			{
				console.error('Error fetching blocked by user:', error);
			}
		};

		getBlockedByUsers();

	}, [token, setBlockedByUsers]);

	useEffect(() =>
	{
		const fetchData = async () =>
		{
			try
			{
				const [currentUserResponse, usersResponse] = await Promise.all(
				[
					axios.get("http://localhost:8080/users/me",
					{
						headers:
						{
							Authorization: `Bearer ${token}`,
						},
					}),

					axios.get("http://localhost:8080/users",
					{
						headers:
						{
							Authorization: `Bearer ${token}`,
						},
					})
				]);

				setCurrentUser(currentUserResponse.data);
				setUsers(usersResponse.data);
			}
			catch (error)
			{
				console.error('Error fetching data:', error);
			}
		};
	
		fetchData();
	
	}, [token, setCurrentUser]);

	useEffect(() =>
	{
		const clickHandler = () => setClickedUser(-1);
		window.addEventListener('click', clickHandler);

		return () => window.removeEventListener('click', clickHandler);
	}, []);

	const handleBlockSuccess = async (userId: number) =>
	{
		try
		{
			const response = await axios.get(`http://localhost:8080/users/${userId}`,
			{
				headers:
				{
					Authorization: `Bearer ${token}`,
				},
			});

			const blockedUser = response.data;
		
			setBlockedUsers(prevBlockedUsers => [...prevBlockedUsers, blockedUser]);
		}
		catch (error)
		{
			console.error('Error fetching blocked user:', error);
		}
	};

	const handleAddFriend = async (userId: number) =>
	{
		
	};

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
				blockedUsers={blockedUsers}
				blockedByUsers={blockedByUsers}
				onBlockSuccess={handleBlockSuccess}
				onAddFriendClick={() => handleAddFriend(user.id)}
			/>
		))}
		</div>
	);
};

export default UsersList;
