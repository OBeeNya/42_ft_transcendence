import { useState, useRef, useContext } from "react";
import { buttonChannelContext } from "./ChatPage"
import './ChatSidebar.css';

const ChatSideBar = () =>
{
	const { displayPopup } = useContext(buttonChannelContext);
	const { channelsName } = useContext(buttonChannelContext);
	const [channel, searchChannel] = useState('');
	const searchInputRef = useRef<HTMLInputElement>(null);
	
	const handleChange = () => {
		if (searchInputRef.current) {
			const value = searchInputRef.current.value;
			searchChannel(value);
		}
	};

	const ifchan = (name: string) => {
		for (let i = 0; i <channelsName.length; i++) {
			if (channelsName[i] === channel)
				return true;
		}
		return false;
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		const key = event.key;
		const letters = /^[A-Za-z]+$/;

		if (searchInputRef.current && searchInputRef.current.value.length >= 20 && key !== 'Backspace' && key !== 'Delete') {
			event.preventDefault();
		} else if (!letters.test(key)) {
		  event.preventDefault();
		} else if (searchInputRef.current && searchInputRef.current.value.length > 0  && key === 'Enter') {
			event.preventDefault();
			if (ifchan(searchInputRef.current.value) === true)
				searchChannel('');
		}
	  };

	return (
		<div className="search-add">

			<div className="first-line">

				<div className="channels-text">
					<p>CHANNELS</p>
				</div>

				<div className="icons">
					<button onClick={displayPopup}>
						<i className="fas fa-plus"></i>
					</button>
				</div>
			</div>
			<input className="search-bar" ref={searchInputRef} placeholder="Search channel..." value={channel} onChange={handleChange} onKeyDown={handleKeyDown}/>
			<div className="chanbutton-container">
				{channelsName.map((name, index) => (
					<button key={index} className="chanbutton">{name}</button>
				))}
			</div>
		</div>
	);
};

export default ChatSideBar;
