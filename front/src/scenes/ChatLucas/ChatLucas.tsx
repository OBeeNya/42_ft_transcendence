// import { Link } from "react-router-dom";
// import Content from "../../components/content"
// import Header from "../../components/header"
import './ChatLucas.css';

const ChatLucas = () =>
{
	return (
		<div className="chat">
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
		</div>

	);
};

export default ChatLucas;
