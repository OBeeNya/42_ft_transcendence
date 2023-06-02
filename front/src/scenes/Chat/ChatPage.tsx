import Header from "../../components/header"
import ChatSidebar from "./ChatSidebar";
import './ChatPage.css';

const ChatPage = () =>
{
	return (
		<div className="chat-page">
			<Header />

			<div className="sidebar">
				<ChatSidebar />
			</div>
		</div>
	);
};

export default ChatPage;
