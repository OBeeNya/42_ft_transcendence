import { useContext, useState, useRef, createContext } from 'react';
import { ax } from "../../../services/axios/axios";
import Header from "../../../components/header"
import { SocketContext } from '../../../contexts';
import UsersList from "../UsersList/UsersList";
import DirectMessageForm from "../DirectMessageForm/DirectMessageForm";
import Sidebar from "../Sidebar/Sidebar";
import ChatBox from "../ChatBox/ChatBox"
import { CreateChannelDto } from  "../../../../../back/chat/channels/channels.dto";
import './MainPage.css';

interface ButtonChannelContextValue {
	displayPopup: () => void;
	displayChatbox: () => void;
	channelsName: string[];
  }

export const buttonChannelContext = createContext<ButtonChannelContextValue>({
	displayPopup: () => {},
	displayChatbox: () => {},
	channelsName: [],
});

const ChatPage = () =>
{
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [privateMessageUserId, setPrivateMessageUserId] = useState<number | null>(null);
	const [statepopup, ChangeStatePopup] = useState(false);
	const createInputRef = useRef<HTMLInputElement>(null);
	const [channel, setChannel] = useState('');
	const [channelsName, setChannelsName] = useState<string[]>([]);
	const [chatInterface, setChatInterface] = useState(false);
    const socket = useContext(SocketContext);

	const addDataChannels = (name: string) => {
		const updatedChannelsName = [...channelsName, name];
		setChannelsName(updatedChannelsName);
	}

	const displayChatbox = () => {
		setChatInterface(!chatInterface);
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


	const createChannel = async (channelName: string) => {
		const dto: CreateChannelDto = {
			channelName: channelName,
			};
		await ax.post("chat/createChannel", dto);
	}

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
			createChannel(createInputRef.current.value);
			addDataChannels(createInputRef.current.value);
			setChannel('');
		}
	  };


	  const contextValue: ButtonChannelContextValue = {
		displayPopup,
		displayChatbox,
		channelsName,
	  };

	const handlePrivateMessageUserChange = (newUserId: number | null) =>
	{
		setPrivateMessageUserId(newUserId);

		if (newUserId && socket) 
			socket.emit('getConversation', {senderId: currentUser.id, receiverId: newUserId});
	}

	return (
	<SocketContext.Provider value={socket}>
		<div className="chat-page">
			<Header />
			<div className="content">
				<buttonChannelContext.Provider value={contextValue}>
					<div className="sidebar">
						<Sidebar/>
					</div>
				</buttonChannelContext.Provider>
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
						setPrivateMessageUserId={handlePrivateMessageUserChange}
					/>
				</div>
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
		</div>
		</SocketContext.Provider>
	);
};

export default ChatPage;
