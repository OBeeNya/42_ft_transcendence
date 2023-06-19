import { MouseEvent, useState, useContext } from 'react';
import axios from "axios";
import { UserInfos } from "../../../services/interfaces/userInfos.interface";
import Block from "../Block/Block";

const User = ({user, isActive, onClick, onDirectMessageClick, navigate}:
			  {user: UserInfos, isActive: boolean, onClick:
			  (event: MouseEvent<HTMLElement>) => void, onDirectMessageClick:
			  () => void, navigate: (path: string) => void}) =>
{
	const [showNotification, setShowNotification] = useState(false);

	return (
        <div key={user.id} className={`user ${isActive ? 'show-menu' : ''}`}>
            {showNotification && (
                <Block
                    message="User has been blocked"
                    onClose={() => setShowNotification(false)}
                />
            )}
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

					<li className="dropdown-item" onClick={() => {console.log('Block clicked'); setShowNotification(true);}}>
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
