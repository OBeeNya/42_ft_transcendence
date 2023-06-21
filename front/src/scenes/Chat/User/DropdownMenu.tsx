import React, { useContext } from 'react';
import { UserInfos } from '../../../services/interfaces/userInfos.interface';
import DropdownItem from './DropdownItem';
import { SocketContext } from '../../../socketContext';

interface DropdownMenuProps
{
	user: UserInfos;
	onDirectMessageClick: () => void;
	navigate: (path: string) => void;
	setShowNotification: (showNotification: boolean) => void;
}

const blockUser = () =>
{
	const socket = useContext(SocketContext);

    if (socket)
	{
        socket.emit('blockUser', {blockerId: user.id, blockedId: blockedId});
        setShowNotification(true);
    }
	else
		console.error('Socket is not available!');
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({user, onDirectMessageClick,
													navigate, setShowNotification}) =>
{
	// const socket = useContext(SocketContext);
	// const currentUser = useContext(UserContext);

	return (
		<ul className="dropdown-menu">
			<DropdownItem onClick={() => navigate(`/profile/${user.id}`)}>Profile</DropdownItem>
			<DropdownItem onClick={onDirectMessageClick}>Direct Message</DropdownItem>
			<DropdownItem onClick={() => console.log('Profile clicked')}>Add friend</DropdownItem>
			<DropdownItem onClick={blockUser}>Block</DropdownItem>
			<DropdownItem onClick={() => console.log('Invite to Pong clicked')}>Invite to Pong</DropdownItem>
		</ul>
	);
};

export default DropdownMenu;
