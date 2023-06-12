import React, { useState } from 'react';
import { useContext } from "react";
import { SocketContext } from "../../../../socketContext"
import './DirectMessageForm.css';

type Props =
{
	senderId: number;
	receiverId: number;
};

const DirectMessageForm: React.FC<Props> = ({senderId, receiverId}) =>
{
	console.log('senderId:', senderId);
	console.log('receiverId:', receiverId);
	
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const socket = useContext(SocketContext);

	const handleSubmit = (e: React.FormEvent) =>
	{
		e.preventDefault();

		if (senderId <= 0 || receiverId <= 0)
		{
			setError('Invalid user IDs');
			return;
		}

		if (socket)
			socket.emit('privateMessage', {senderId, receiverId, content: message});

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
