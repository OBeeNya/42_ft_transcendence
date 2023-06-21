import React, { useContext, useState } from 'react';
import { UserInfos } from '../../../services/interfaces/userInfos.interface';
import DropdownItem from './DropdownItem';

interface DropdownMenuProps
{
	user: UserInfos;
	onDirectMessageClick: () => void;
	navigate: (path: string) => void;
	handleBlockClick: (blockerId: number, blockedId: number) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({user, onDirectMessageClick,
													navigate, handleBlockClick}) =>
{
	return (
		<ul className="dropdown-menu">
			<DropdownItem onClick={() => navigate(`/profile/${user.id}`)}>
				Profile </DropdownItem>
			<DropdownItem onClick={onDirectMessageClick}>
				Direct Message </DropdownItem>
			<DropdownItem onClick={() => console.log('Profile clicked')}>
				Add friend </DropdownItem>
			<DropdownItem onClick={() => handleBlockClick(user.id, blockedId)}>
				Block </DropdownItem>
			<DropdownItem onClick={() => console.log('Invite to Pong clicked')}>
				Invite to Pong </DropdownItem>
		</ul>
	);
};

export default DropdownMenu
