import Header from "../../../components/header"
import Sidebar from "../Sidebar/Sidebar";
import UsersList from "../UsersList/UsersList";
import ChatBox from "../DirectMessage/ChatBox/ChatBox"
import DirectMessageForm from "../DirectMessage/DirectMessageForm/DirectMessageForm";
import './MainPage.css';
import { useState } from 'react';
import { Socket } from "socket.io-client";
import { SocketContext } from "../../../socketContext";

const MainPage = () =>
{
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [privateMessageUserId, setPrivateMessageUserId] = useState(null);
	const [socket, setSocket] = useState<Socket | null>(null);

	return (
	<SocketContext.Provider value={socket}>
		<div className="chat-page">
			<Header />

			<div className="content">
				<div className="sidebar">
					<Sidebar />
				</div>

				<div className="chat-section">
					{privateMessageUserId && currentUser &&
						<DirectMessageForm senderId={currentUser.id} receiverId={privateMessageUserId} />
					}
					<ChatBox senderId={currentUser ? currentUser.id : -1} receiverId={privateMessageUserId ? privateMessageUserId : -1} />
				</div>

				<div className="users-list">
					<UsersList setCurrentUser={setCurrentUser} setPrivateMessageUserId={setPrivateMessageUserId} />
				</div>

			</div>

		</div>
		</SocketContext.Provider>
	);
};

export default MainPage;
