import Header from "../../components/header"
import './ChatPage.css';

const ChatPage = () =>
{
	return (
		<div className="chat-page">
			<Header />
				<div className="chat-sidebar">
					<div className="search-channel">
						<div className="search-section">
							<i className="search-icon">🔍</i> {/* replace with your actual search icon */}
							<span>search channel</span>
						</div>
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

export default ChatPage;
