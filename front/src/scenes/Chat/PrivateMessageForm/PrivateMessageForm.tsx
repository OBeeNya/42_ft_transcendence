import React, { useState } from 'react';
import './PrivateMessageForm.css';

const PrivateMessageForm = () =>
{
	const [message, setMessage] = useState('');

	const handleSubmit = (e: React.FormEvent) =>
	{
		e.preventDefault();

		// logic to send dm

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
