import { useState } from "react";

const ChatSidebar = () =>
{
	const [searchChannel, setSearchChannel] = useState(false);
	const [addChannel, setAddChannel] = useState(false);

	return (
		<div className="chat-sidebar">
			<div className="channel-line">
				<p>CHANNELS</p>
				<div>
					<button onClick={() => setSearchChannel(!searchChannel)}>
						<i className="fas fa-search"></i>
					</button>
					<button onClick={() => setAddChannel(!addChannel)}>
						<i className="fas fa-plus"></i>
					</button>
				</div>
			</div>

			<div className="privateMessages-line">
				<p>PRIVATE MESSAGES</p>
				<div>
					<button onClick={() => setAddChannel(!addChannel)}>
						<i className="fas fa-plus"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatSidebar;