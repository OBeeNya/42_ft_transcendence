import { MouseEvent, useContext, useState} from 'react';
import { UserInfos } from "../../../services/interfaces/userInfos.interface";
import { SocketContext } from '../../../socketContext';
import Block from "../Block/Block";
import DropdownMenu from './DropdownMenu';

const User = ({user, isActive, onClick, onDirectMessageClick, navigate}:
			  {user: UserInfos; isActive: boolean;
			   onClick: (event: MouseEvent<HTMLElement>) => void;
			   onDirectMessageClick: () => void;
			   navigate: (path: string) => void;}) =>
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
			{isActive && (
				<DropdownMenu 
					user={user} 
					onDirectMessageClick={onDirectMessageClick} 
					navigate={navigate} 
					setShowNotification={setShowNotification}
			/>
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
