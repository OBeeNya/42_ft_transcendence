import { useContext, useState, useEffect, useRef } from "react";
import { SocketContext } from "../../../socketContext";
import "./ChatBox.css";

interface Message
{
	senderId: number;
	content: string;
}

const ChatBox = ({senderId, receiverId}: {senderId: number, receiverId: number}) =>
{
	const [messages, setMessages] = useState<Message[]>([]);
	const socket = useContext(SocketContext);
	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	const scrollToBottom = () =>
	{
		messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
	}

	useEffect(() =>
	{
		scrollToBottom()
	}, [messages]);

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
			if (newMessage.receiverId === receiverId)
				setMessages(messages => [...messages, newMessage]);
		});

		return () =>
		{
			socket.off('conversation');
			socket.off('privateMessage');
		};

	}, [socket, senderId, receiverId]);

	return (
	<div className="chat-box">
		{messages.map((message, i) =>
			<div key={i} className={`message-container`}>
				<div className={`message ${message.senderId === senderId ? 'sent' : 'received'}`}>
					{message.content}
				</div>
			</div>
		)}
		<div ref={messagesEndRef} />
	</div>
	);
}

export default ChatBox;
