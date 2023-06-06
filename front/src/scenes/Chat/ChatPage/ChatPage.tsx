import Header from "../../../components/header"
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import ChatUsersList from "../ChatUsersList/ChatUsersList";
import './ChatPage.css';

const ChatPage = () =>
{
	return (
		<div className="chat-page">
			<Header />

			<div className="content">
				<div className="sidebar">
					<ChatSidebar />
				</div>

				<div className="users-list">
					<ChatUsersList />
				</div>
			</div>

		</div>
	);
};

export default ChatPage;
