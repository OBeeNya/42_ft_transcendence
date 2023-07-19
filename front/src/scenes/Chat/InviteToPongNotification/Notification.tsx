import './Notification.css';

interface NotificationProps
{
	accept: () => void;
	decline: () => void;
	inviterName: string | null;
}

const Notification: React.FC<NotificationProps> = ({accept, decline, inviterName}) =>
{
	return (
		<div className="notification">
			<p>{inviterName} has invited you to Pong !</p>
			<button className="accept-button" onClick={accept}>Accept</button>
			<button className="decline-button" onClick={decline}>Decline</button>
		</div>
	);
};

export default Notification;