import React from 'react';
import './Leaderboard.css';

function Leaderboard()
{
    const users = // A remplacer par l'appel API pour récupérer les vraies données
	[
        {username: 'User1', matches: 10, wins: 7, ratio: 0.7, rank: 1, status: 'online'},
        {username: 'User2', matches: 20, wins: 14, ratio: 0.7, rank: 2, status: 'offline'}
    ];

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
                            <td>{(user.ratio * 100)}%</td> {/* Ratio en % */}
                            <td>{user.rank}</td>
                            <td className={user.status}>
                                {user.status === 'online' ?
                                    <>
                                        <div className="online-indicator" />
                                        <span>Online</span> {/* Affichage du statut */}
                                    </> :
                                    <>
                                        <div className="offline-indicator" />
                                        <span>Offline</span> {/* Affichage du statut */}
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