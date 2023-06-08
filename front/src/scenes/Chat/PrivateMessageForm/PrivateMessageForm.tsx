import React, { useState } from 'react';
import useSocket from './useSocket';
import './PrivateMessageForm.css';

type Props =
{
	receiverId: number;
};

const PrivateMessageForm: React.FC<Props> = ({receiverId}) =>
{
	const [message, setMessage] = useState('');
	const socket = useSocket('http://localhost:8080');
  
	const handleSubmit = (e: React.FormEvent) =>
	{
		e.preventDefault();

		if (!socket) return;
  
		const senderId = parseInt(localStorage.getItem("userId") || '0');
		socket.emit('dmToServer', {senderId, receiverId, content: message});
		
		setMessage('');
	};

	return (
		<form className="private-message-form-wrapper" onSubmit={handleSubmit}>
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

export default PrivateMessageForm;
