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
	handleJoinChannel: (channel: Channel) => void;
  }

export interface Channel {
	id: string
	name: string;
	ispassword: boolean;
	password: string;
}

export const buttonChannelContext = createContext<ButtonChannelContextValue>({
	displayPopup: () => {},
	channels: [],
	activeChannel:null,
	handleJoinChannel: () => {},
});

const ChatPage = () =>
{
    const [currentUser, setCurrentUser] = useState<any>(null);
	const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    const [privateMessageUserId, setPrivateMessageUserId] = useState<number | null>(null);
	const [statepopup, ChangeStatePopup] = useState(false);
	const createInputRef = useRef<HTMLInputElement>(null);
	const [channel, setChannel] = useState('');
	const [channels, setChannels] = useState<{id: string, name: string, ispassword: boolean, password: string}[]>([]);
	const socket = useContext(SocketContext);
	const [activeView, setActiveView] = useState<'PRIVATE' | 'CHANNEL' | null>(null);
	const [passwordEnabled, setPasswordEnabled] = useState(false);
	const [password, setPassword] = useState('');
	const [showPasswordPopup, setShowPasswordPopup] = useState(false);
	const [channelToJoin, setChannelToJoin] = useState<Channel | null>(null);
	const [enteredPassword, setEnteredPassword] = useState('');
	const [isPasswordIncorrect, setPasswordIncorrect] = useState(false);


	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	}

	const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredPassword(event.target.value);
	};

	const handleIfPasswordTrue = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const key = event.key;
		if ( enteredPassword.length > 0  && key === 'Enter') {
			event.preventDefault();
			if (socket && channelToJoin) {
				socket.emit('joinRoom', { channelId: channelToJoin.id, userId: currentUser.id ,password: enteredPassword });
			}
			setEnteredPassword('');
		}
	}

	const handleJoinChannel = (channel: Channel) => {
		if (channel.ispassword) {
			setChannelToJoin(channel);
			setShowPasswordPopup(true);
		} else {
			joinChannel(channel);
		}
	  };


	const joinChannel = (channel: Channel) => {
		if(socket && currentUser && currentUser.id && channel && channel.id) {
			setActiveView('CHANNEL');
			setActiveChannel(channel);
			socket.emit('joinRoom', {channelId: channel.id, userId: currentUser.id});
			socket.emit('getChannelConversation', {channelId: channel.id});
		}
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
			const newChannelName = createInputRef.current.value;
			if (socket) {
				socket.emit('createChannel', {
					name: newChannelName,
					userId: currentUser.id,
					ispassword: passwordEnabled,
					password: password,
				});
			}
			displayPopup();
			setChannel('');
		}
	  };


	  const handleCreateChannelClick = () => {
		if (createInputRef.current && createInputRef.current.value.length > 0) {
			displayPopup();
			const newChannelName = createInputRef.current.value;
			if (socket) {
				socket.emit('createChannel', {
					name: newChannelName,
					userId: currentUser.id,
					ispassword: passwordEnabled,
					password: password,
				});
			}
			setPassword('');
			setChannel('');
		}
	};

	  const contextValue: ButtonChannelContextValue = {
		displayPopup,
		channels,
		activeChannel,
		handleJoinChannel,
		};

	
	
	const handlePrivateMessageUserChange = (newUserId: number | null) =>
	{
		setPrivateMessageUserId(newUserId);
		setActiveView('PRIVATE');
		if (newUserId && socket) 
			socket.emit('getConversation', {senderId: currentUser.id, receiverId: newUserId});
	}

	useEffect(() => {
		if (socket && currentUser) {
			socket.emit('getChannels');
			socket.on('passwordChecked', (data) => {
				if (data.correct && channelToJoin) {
					setActiveView('CHANNEL');
					setActiveChannel(channelToJoin);
					socket.emit('getChannelConversation', {channelId: channelToJoin.id});
					setShowPasswordPopup(false);
				} else {
					setPasswordIncorrect(true);
				}
			});

			socket.on('channels', (channels: Channel[]) => {
				setChannels(channels);
			});
			
			socket.on('channelCreated', (newChannel: Channel) => {
				setChannels((prevChannels) => [
					...prevChannels,
					{id: newChannel.id, name: newChannel.name, ispassword: newChannel.ispassword, password: newChannel.password}
				]);
			});

			return () => {
				socket.off('getChannels');
				socket.off('channelCreated');
				socket.off('passwordChecked');
				socket.off('channels');
			};
		}
	}, [socket, currentUser, channelToJoin]);

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
                <div className={`chat-section ${activeView === 'PRIVATE' ? 'active' : ''}`}>
				{privateMessageUserId && currentUser &&
					<DirectMessageForm senderId={currentUser.id}
									   receiverId={privateMessageUserId} />
				}
				<ChatBox senderId={currentUser ? currentUser.id : -1}
						 receiverId={privateMessageUserId ? privateMessageUserId : -1} />
				</div>
				<div className={`channel-section ${activeView === 'CHANNEL' ? 'active' : ''}`}>
					{activeChannel && currentUser && (
						<ChannelForm senderId ={currentUser.id} channelId={ parseInt(activeChannel.id)} />
						)}
						<ChannelBox senderId ={currentUser ? currentUser.id : -1} channelId={ activeChannel ? parseInt(activeChannel.id) : -1} />
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
							<button onClick={() => {setPasswordEnabled(!passwordEnabled); setPassword('')}}>Enable Password</button>
							{passwordEnabled && (
								<input type='password' placeholder='Password...' value={password} onChange={handlePasswordChange}></input>
							)}
						<button onClick={handleCreateChannelClick}>OK</button>
						<button className="close-popup"
							onClick={() => { displayPopup(); setChannel('')}}>close
						</button>
						</div>
					</div>
				)}
				{showPasswordPopup && (
    				<div className ="popup" >
    					<div onClick={() => setShowPasswordPopup(false)} className="overlay"></div>
        				<div className="popup-content">
            				<h2> Enter Password </h2>
							<input type='password' value={enteredPassword} placeholder='Password...' onChange={handlePasswordInputChange} onKeyDown={handleIfPasswordTrue}></input>
            				{isPasswordIncorrect && <div className="error">Password is incorrect</div>}
							<button className="close-popup" onClick={() => setShowPasswordPopup(false)}>close</button>
        				</div>
    				</div>
				)}
			</div>
		</div>
		</SocketContext.Provider>
	);
};

export default ChatPage;