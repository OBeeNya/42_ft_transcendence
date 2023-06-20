import { useState } from 'react';
import Header from "../../../components/header"
import Sidebar from "../Sidebar/Sidebar";
import UsersList from "../UsersList/UsersList";
import ChatBox from "../DirectMessage/ChatBox/ChatBox"
import DirectMessageForm from "../DirectMessage/DirectMessageForm/DirectMessageForm";
import './MainPage.css';

const MainPage = () =>
{
	const [currentUser, setCurrentUser] = useState<any>(null);
	const [privateMessageUserId, setPrivateMessageUserId] = useState<number | null>(null);

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
					setPrivateMessageUserId={setPrivateMessageUserId}
				/>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
