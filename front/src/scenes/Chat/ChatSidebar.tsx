import { useState } from "react";

const ChatSidebar = () =>
{
	const [searchChannel, setSearchChannel] = useState(false);
	const [addChannel, setAddChannel] = useState(false);

	return (
		<div className="channel-search-add">

			<div className="first-line">

				<div className="channels-text">
					<p>CHANNELS</p>
				</div>

				<div className="icons">
					<button onClick={() => setSearchChannel(!searchChannel)}>
						<i className="fas fa-search"></i>
					</button>

					<button onClick={() => setAddChannel(!addChannel)}>
						<i className="fas fa-plus"></i>
					</button>
				</div>

			</div>

		</div>
	);
};

export default ChatSidebar;
