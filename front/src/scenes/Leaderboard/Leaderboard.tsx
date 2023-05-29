import { useEffect, useState } from "react";
import { UserInfos } from "../../services/interfaces/userInfos.interface"
import axios from "axios";
import './Leaderboard.css';

const Leaderboard = () => 
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
    <div className="content-body leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Matches Played</th>
            <th>Wins</th>
            <th>Ratio</th>
            <th>Rank</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
		{users.map((user: UserInfos) =>
		(
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.wins + user.losses}</td> {/* A ameliorer car ici matches played = simple addition victoires + défaites */}
              <td>{user.wins}</td>
              <td>{(user.wins / (user.wins + user.losses) * 100).toFixed(2)}%</td>
              <td>{user.ladder_level}</td>
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
              <td><button>Add Friend</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;