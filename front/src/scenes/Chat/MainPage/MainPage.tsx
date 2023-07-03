import { useContext, useState, useRef, createContext, useEffect } from 'react';
import Header from "../../../components/header"
import { SocketContext } from '../../../contexts';
import Sidebar from "../Sidebar/Sidebar";
import UsersList from "../UsersList/UsersList";
import ChatBox from "../ChatBox/ChatBox"
import DirectMessageForm from "../DirectMessageForm/DirectMessageForm";
import './MainPage.css';
import ChannelBox from '../ChannelBox/ChannelBox';
import ChannelForm from '../ChannelForm/ChannelForm'

interface ButtonChannelContextValue {
	displayPopup: () => void;
	channels: Channel[];
	activeChannel: Channel | null;
	joinChannel: (channel: Channel) => void;
  }

interface Channel {
	id: string
	name: string;
}

export const buttonChannelContext = createContext<ButtonChannelContextValue>({
	displayPopup: () => {},
	channels: [],
	activeChannel:null,
	joinChannel: () => {},
});

const ChatPage = () =>
{
    const [currentUser, setCurrentUser] = useState<any>(null);
	const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    const [privateMessageUserId, setPrivateMessageUserId] = useState<number | null>(null);
	const [statepopup, ChangeStatePopup] = useState(false);
	const createInputRef = useRef<HTMLInputElement>(null);
	const [channel, setChannel] = useState('');
	const [channels, setChannels] = useState<{id: string, name: string}[]>([]);
	const socket = useContext(SocketContext);
//	const [chatInterface, setChatInterface] = useState(false);

	const joinChannel = (channel: Channel) => {
		setActiveChannel(channel);
		if(socket)
			socket.emit('joinRoom', {roomId: channel.id});
	};

	const displayPopup = () => {
		ChangeStatePopup(!statepopup);
	}

	const handleChange = () => {
		if (createInputRef.current) {
			const value = createInputRef.current.value;
			setChannel(value);
		}
	};


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
			const newChannelName = createInputRef.current.value;
			if (socket) {
				socket.emit('userConnected', currentUser.id);
				socket.emit('createChannel', {
					name: newChannelName,
				});
			}
			setChannel('');
		}
	  };


	  const contextValue: ButtonChannelContextValue = {
		displayPopup,
		channels,
		activeChannel,
		joinChannel,
		};

	const handlePrivateMessageUserChange = (newUserId: number | null) =>
	{
		setPrivateMessageUserId(newUserId);

		if (newUserId && socket) 
			socket.emit('getConversation', {senderId: currentUser.id, receiverId: newUserId});
	}

	useEffect(() => {
		if (socket && currentUser) {
			socket.emit('getChannels');

			socket.on('channels', (channels: Channel[]) => {
				setChannels(channels);
			});
			
			socket.on('channelCreated', (newChannel: Channel) => {
				setChannels((prevChannels) => [
					...prevChannels,
					{id: newChannel.id, name: newChannel.name}
				]);
			});

			return () => {
				socket.off('channelCreated');
				socket.off('channels');
			};
		}
	}, [socket, currentUser]);

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
				<div className='channel-section'>
					{activeChannel && (
						<div>
						<ChannelForm senderId ={currentUser.id} channelId={ parseInt(activeChannel.id)} />
						<ChannelBox senderId ={currentUser.id} channelId={ parseInt(activeChannel.id)} />
						</div>
						)}
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