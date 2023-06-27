import { useEffect, useState } from "react";
import axios from "axios";
import { UserInfos } from "../../services/interfaces/userInfos.interface"
import './Friends.css';

const Friends = () => 
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
	<div className="content-body friends">
	  <h1>Friends</h1>
	  <table>
		<thead>
		  <tr>
			<th>Username</th>
			<th>Status</th>
			{/* <th>Spectator</th> */}
		  </tr>
		</thead>
		<tbody>
		{users.map((user: UserInfos) =>
		(
			<tr key={user.id}>
			  <td>{user.name}</td>
			  <td className={user.connected ? 'online' : 'offline'}>
				{user.connected ?
				  <>
					<div className="online-indicator" />
					<span>Online</span>
				  </> :
				  <>
					<div className="offline-indicator" />
					<span>Offline</span>
				  </>
				}
			  </td>
			</tr>
		  ))}
		</tbody>
	  </table>
	</div>
  );
}

export default Friends;
