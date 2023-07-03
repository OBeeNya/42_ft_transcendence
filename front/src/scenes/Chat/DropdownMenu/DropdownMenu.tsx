import { UserInfos } from '../../../services/interfaces/userInfos.interface';
import DropdownItem from './DropdownItem';

interface DropdownMenuProps
{
	user: UserInfos;
	onDirectMessageClick: () => void;
	onAddFriendClick: () => void;
	onBlockClick: () => void;
	navigate: (path: string) => void;
	isBlocked: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({user, onDirectMessageClick,
													onAddFriendClick, onBlockClick,
													navigate, isBlocked}) =>
{
	return (
		<ul className="dropdown-menu">
			<DropdownItem onClick={() => navigate(`/profile/${user.id}`)}>
				Profile </DropdownItem>

			{!isBlocked && (
				<>
					<DropdownItem onClick={onDirectMessageClick}>
						Direct Message </DropdownItem>

					<DropdownItem onClick={onAddFriendClick}>
						Add friend </DropdownItem>

					<DropdownItem onClick={onBlockClick}>
						Block </DropdownItem>

					<DropdownItem onClick={() => console.log('Invite to Pong clicked')}>
						Invite to Pong </DropdownItem>
				</>
			)}
		</ul>
	);
};


export default DropdownMenu;