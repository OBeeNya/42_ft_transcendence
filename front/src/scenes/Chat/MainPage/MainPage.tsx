import { useContext, useState } from 'react';
import Header from "../../../components/header"
import { SocketContext } from '../../../contexts';
import Sidebar from "../Sidebar/Sidebar";
import UsersList from "../UsersList/UsersList";
import ChatBox from "../ChatBox/ChatBox"
import DirectMessageForm from "../DirectMessageForm/DirectMessageForm";
import './MainPage.css';

const MainPage = () =>
{
	const [currentUser, setCurrentUser] = useState<any>(null);
	const [privateMessageUserId, setPrivateMessageUserId] = useState<number | null>(null);
	const socket = useContext(SocketContext);

	const handlePrivateMessageUserChange = (newUserId: number | null) =>
	{
		setPrivateMessageUserId(newUserId);

		if (newUserId && socket) 
			socket.emit('getConversation', {senderId: currentUser.id, receiverId: newUserId});
	}

	return (
		<div className="chat-page">
			<Header />

			<div className="content">

				<div className="sidebar">
					<Sidebar />
				</div>

				<div className="chat-section">
				{privateMessageUserId && currentUser &&
					<DirectMessageForm senderId={currentUser.id}
									   receiverId={privateMessageUserId} />
				}
				<ChatBox senderId={currentUser ? currentUser.id : -1}
						 receiverId={privateMessageUserId ? privateMessageUserId : -1} />
				</div>

				<div className="users-list">
					<UsersList
						setCurrentUser={setCurrentUser}
						setPrivateMessageUserId={handlePrivateMessageUserChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
