import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../../socketContext";
import './BlockageNotification.css';

type Props =
{
	blockerId: number;
	blockedId: number;
};

const Block: React.FC<Props> = ({blockerId, blockedId}) =>
{
	const socket = useContext(SocketContext);
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() =>
	{
		if (socket)
		{
			socket.on('userBlocked', (data) =>
			{
				if (data.blockerId === blockerId && data.blockedId === blockedId)
				{
					console.log('User has been blocked!');
					setShowNotification(true);
					setTimeout(() => setShowNotification(false), 5000);
				}
			});

			return () =>
			{
				socket.off('userBlocked');
			};
		}
	}, [socket, blockerId, blockedId]);

	const handleBlockClick = () =>
	{
		if (blockerId <= 0 || blockedId <= 0)
		{
			console.log('Invalid user IDs');
			return;
		}

		if (socket)
			socket.emit('blockUser', {blockerId, blockedId});

		else 
			console.log('Socket is not available!');
	}

	const closeNotification = () =>
	{
		setShowNotification(false);
	}

	return (
		<>
			{showNotification && (
				<div className="blockage-notification"onSubmit={handleBlockClick}>
					<div className="blockage-notification-content">
						<div className="blockage-notification-icon">
							<i className="fas fa-times-circle"></i>
						</div>
						<div className="blockage-notification-message">
							{`User ${blockedId} has been blocked!`}
						</div>
					</div>
					<button className="blockage-notification-close" onClick={closeNotification}>
						<i className="fas fa-times"></i>
					</button>
				</div>
			)}
		</>
	);
}

export default Block;
