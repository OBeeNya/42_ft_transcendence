import { UserInfos } from '../../../services/interfaces/userInfos.interface';
import DropdownItem from './DropdownItem';

interface DropdownMenuProps
{
	user: UserInfos;
	onDirectMessageClick: () => void;
	onBlock: () => void;
	navigate: (path: string) => void;
	blockedUsers: UserInfos[];
	blockedByUsers: UserInfos[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({user, onDirectMessageClick,onBlock,
													navigate, blockedUsers, blockedByUsers}) =>
{
	const isBlocked = blockedUsers.some((blockedUser: {id: number;}) => blockedUser.id === user.id) ||
	blockedByUsers.some((blockedUser: {id: number;}) => blockedUser.id === user.id);

	return (
		<ul className="dropdown-menu">
			<DropdownItem onClick={() => navigate(`/profile/${user.id}`)}>
				Profile </DropdownItem>

				{!isBlocked && (
				<DropdownItem onClick={onDirectMessageClick}>
					Direct Message
				</DropdownItem> )}

			<DropdownItem onClick={() => console.log('Profile clicked')}>
				Add friend </DropdownItem>

			<DropdownItem onClick={onBlock}>
				Block </DropdownItem>

			<DropdownItem onClick={() => console.log('Invite to Pong clicked')}>
				Invite to Pong </DropdownItem>
		</ul>
	);
};

export default DropdownMenu;
