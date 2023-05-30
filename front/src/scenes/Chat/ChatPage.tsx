import Header from "../../components/header"
import ChatSidebar from "./ChatSideBar";
import './ChatPage.css';

const ChatPage = () =>
{
	return (
		<div className="left-container">
			<Header />
			<div className="chat-content">
				<ChatSidebar />
				{/* Reste du contenu principal de la page ici */}
			</div>
		</div>
	);
};

export default ChatPage;
