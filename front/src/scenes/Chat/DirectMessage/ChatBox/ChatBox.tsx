import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../../../socketContext";
import "./ChatBox.css";

interface Message
{
	senderId: number;
	// receiverId: number;
	content: string;
}

const ChatBox = ({senderId, receiverId}: {senderId: number, receiverId: number}) =>
{
	console.log('Rendering ChatBox with senderId:', senderId, 'and receiverId:', receiverId);
	const [messages, setMessages] = useState<Message[]>([]);
	const socket = useContext(SocketContext);

	useEffect(() =>
	{
		if (socket == null)
			return () => {};

		socket.emit('getConversation', {senderId, receiverId});

		socket.on('conversation', (conversation: Message[]) =>
		{
			setMessages(conversation);
		});

		socket.on('privateMessage', newMessage =>
		{
			setMessages(messages => [...messages, newMessage]);
			console.log('Updated messages:', newMessage);
			// return updatedMessages;
		});

		return () =>
		{
			socket.off('conversation');
			socket.off('privateMessage');
		};

	}, [socket, senderId, receiverId]);

	return (
		<div>
		  {messages.map((message, i) =>
			<div key={i} className={`message-container`}>
			  <div className={`message ${message.senderId === senderId ? 'sent' : 'received'}`}>
				{message.content}
			  </div>
			</div>
		  )}
		</div>
	  );	  
};

export default ChatBox;