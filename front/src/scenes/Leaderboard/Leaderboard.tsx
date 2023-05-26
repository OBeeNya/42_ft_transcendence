import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';
import { resolveTripleslashReference } from 'typescript';

function	Leaderboard()
{
	const users =
	[
		{username: 'User1', matches: 10, wins: 7, ratio: 0.7, rank: 1, status: 'online'},
		{username: 'User2', matches: 20, wins: 14, ratio: 0.7, rank: 2, status: 'offline'}
	];

	// type User =
	// {
	// 	username: string;
	// 	matches: number;
	// 	wins: number;
	// 	ratio: number;
	// 	rank: number;
	// 	status: string;
	// };

	// const [users, setUsers] = useState<User[]>([]);

	// useEffect(() =>
	// {
	// 	axios.get("http://localhost:3000/users")
	// 		.then(response =>
	// 		{
	// 			setUsers(response.data);
	// 		})
	// 		.catch(error =>
	// 		{
	// 			console.error('There was an error fetching users!', error);
	// 		});
	// }, []);

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
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.username}</td>
							<td>{user.matches}</td>
							<td>{user.wins}</td>
							<td>{(user.ratio * 100)}%</td>
							<td>{user.rank}</td>
							<td className={user.status}>
								{user.status === 'online' ?
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