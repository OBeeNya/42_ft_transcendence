import Header from "../../components/header"
import ChatSidebar from "./ChatSidebar";
import './ChatPage.css';
import { useState, useRef, createContext, useEffect } from "react";

interface ButtonChannelContextValue {
	displayPopup: () => void;
	channelsName: string[];
  }

export const buttonChannelContext = createContext<ButtonChannelContextValue>({
	displayPopup: () => {},
	channelsName: [],
});

const ChatPage = () =>
{
	const [statepopup, ChangeStatePopup] = useState(false);
	const createInputRef = useRef<HTMLInputElement>(null);
	const [channel, setChannel] = useState('');
	const [channelsName, setChannelsName] = useState<string[]>([]);


	const addDataChannels = (name: string) => {
		const updatedChannelsName = [...channelsName, name];
		setChannelsName(updatedChannelsName);
		localStorage.setItem('channels', JSON.stringify(updatedChannelsName));
	}

	const displayPopup = () => {
		ChangeStatePopup(!statepopup);
	}

	const handleChange = () => {
		if (createInputRef.current) {
			const value = createInputRef.current.value;
			setChannel(value);
		}
	};

	useEffect(() => {
		const storedChannels = localStorage.getItem('channels');
		if (storedChannels) {
			setChannelsName(JSON.parse(storedChannels));
		}
	}, []);


	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		const key = event.key;
		const letters = /^[A-Za-z]+$/;

		if (createInputRef.current && createInputRef.current.value.length >= 20 && key !== 'Backspace' && key !== 'Delete' && key !== 'Enter') {
			event.preventDefault();
		} else if (!letters.test(key)) {
		  event.preventDefault();
		} else if (createInputRef.current && createInputRef.current.value.length > 0  && key === 'Enter') {
			event.preventDefault();
			displayPopup();
			addDataChannels(createInputRef.current.value);
			setChannel('');
		}
	  };


	  const contextValue: ButtonChannelContextValue = {
		displayPopup,
		channelsName,
	  };

	return (
		<div className="chat-page">
			<Header />
			<buttonChannelContext.Provider value={contextValue}>
				<div className="sidebar">
					<ChatSidebar/>
				</div>
			</buttonChannelContext.Provider>
			{statepopup && (
				<div className ="popup" >
				<div onClick={displayPopup} className="overlay"></div>
					<div className="popup-content">
						<h2> Create Channel </h2>
						<input ref={createInputRef} placeholder="Name channel..." value={channel} onChange={handleChange} onKeyDown={handleKeyDown}/>
					<button className="close-popup"
						onClick={displayPopup}>close
					</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatPage;
