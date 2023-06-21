import React, { useState } from 'react';
import { useContext } from "react";
import { SocketContext } from "../../../../socketContext";
import './DirectMessageForm.css';

type Props =
{
	senderId: number;
	: number;
};

const DirectMessageForm: React.FC<Props> = ({senderId, }) =>
{
	console.log('senderId:', senderId);
	console.log(':', );

	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const socket = useContext(SocketContext);

	const handleSubmit = (e: React.FormEvent) =>
	{
		e.preventDefault();

		if (senderId <= 0 ||  <= 0)
		{
			setError('Invalid user IDs');
			return;
		}

		console.log('Submitting the following message:');
		console.log(`From: ${senderId}`);
		console.log(`To: ${}`);
		console.log(`Content: "${message}"`);

		if (socket)
		{
			socket.emit('privateMessage', {senderId, , content: message});
			console.log('Message has been sent!');
		}

		else
			console.log('Socket is not available!');

		setMessage('');
	};

	return (
		<form className="private-message-form-wrapper" onSubmit={handleSubmit}>
			{error && <p className="error-message">{error}</p>}
		  	<input
				type="text"
				placeholder="Message"
				maxLength={4096}
				className="message-input"
				value={message}
				onChange={e => setMessage(e.target.value)}
		  	/>
		</form>
	  );
};

export default DirectMessageForm;
