import { Link } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"
import './Chat.css';

const Chat = () =>
{
	return (
		<div className="chat">
			<Header />
			<Content>
				<div className="chat-sidebar">
					<div className="search-channel">
						<i className="search-icon">🔍</i> {/* replace with your actual search icon */}
						<span>search channel</span>
						<button className="add-channel">+</button>
					</div>
					<div className="channel-list">
						<div className="channel">
							<span className="channel-avatar">G</span>
							<span className="channel-name">general</span>
						</div>
						{/* repeat the above 'channel' div for each channel */}
					</div>
				</div>
				<div className="chat-content">
					{/* your chat content goes here */}
				</div>
			</Content>
		</div>

	);

};

export default Chat;


// import { Link } from "react-router-dom";
// import Content from "../../components/content"
// import Header from "../../components/header"

// const ChatPage = () => {

// 	return (
// 		<div>
// 			<Header />
// 			<Content>
// 				<h1>Chat page</h1>
// 				<br></br>
// 				<Link to="/home">Home</Link>
// 				<br></br>
// 			</Content>
// 		</div>

// 	);

// };

// export default ChatPage;