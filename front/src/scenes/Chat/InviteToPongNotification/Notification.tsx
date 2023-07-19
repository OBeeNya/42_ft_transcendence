import './Notification.css';

interface NotificationProps
{
	accept: () => void;
	decline: () => void;
}
  
const Notification: React.FC<NotificationProps> = ({accept, decline}) =>
{
	return (
		<div className="notification">
			<p>You have been invited to Pong !</p>
			<button className="accept-button" onClick={accept}>Accept</button>
			<button className="decline-button" onClick={decline}>Decline</button>
		</div>
	);
};

export default Notification;