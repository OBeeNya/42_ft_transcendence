import React, { MouseEvent } from 'react';
import { UserInfos } from "../../../services/interfaces/userInfos.interface";

const User = ({ user, isActive, onClick, onDirectMessageClick, navigate }: { user: UserInfos, isActive: boolean, onClick: (event: MouseEvent<HTMLElement>) => void, onDirectMessageClick: () => void, navigate: (path: string) => void }) =>
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
					<li className="dropdown-item" onClick={() => navigate(`/profile/${user.id}`)}>
						Profile
					</li>

					<li className="dropdown-item" onClick={onDirectMessageClick}>
  						Direct Message
					</li>

					<li className="dropdown-item" onClick={() => console.log('Profile clicked')}>
						Add friend
					</li>

					<li className="dropdown-item" onClick={() => console.log('Block clicked')}>
						Block
					</li>

					<li className="dropdown-item" onClick={() => console.log('Invite to Pong clicked')}>
						Invite to Pong
					</li>
				</ul>
			)}
			<div className={user.connected ? 'online' : 'offline'}>
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
			</div>
		</div>
	);
};

export default User;
