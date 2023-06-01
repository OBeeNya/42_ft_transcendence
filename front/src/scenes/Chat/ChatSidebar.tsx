import { useState, useRef, useEffect } from "react";

const ChatSideBar = () =>
{
	const [searchChannel, setSearchChannel] = useState(false);
	const [addChannel, setAddChannel] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() =>
	{
		if (isSearchOpen)
		{
			const handleClickOutside = (event: MouseEvent) =>
			{
				if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node))
					setIsSearchOpen(false);
			}

			document.addEventListener("mousedown", handleClickOutside);

			return () =>
			{
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [isSearchOpen]);

	const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => 
	{
		if (event.key === "Enter")
		{
			const channelName = searchInputRef.current.value;
			await joinChannel(channelName);
		}
	}

	const handleSearchClick = async () =>
	{
		const channelName = searchInputRef.current.value;
		await joinChannel(channelName);
    }

	const joinChannel = async (channelName: string) =>
	{
        // TODO: Appel API pour rejoindre le channel
    }

	return (
        <div className="channel-search-add">

            <div className="first-line">

                <div className="channels-text">
                    <p>CHANNELS</p>
                </div>

                <div className="icons">

                    <button onClick={handleSearchClick}>
                        <i className="fas fa-search"></i>
                    </button>

                    {isSearchOpen ? <input ref={searchInputRef} type="text" placeholder="Search..." onKeyPress={handleKeyPress}/> : null}

                    <button onClick={() => setAddChannel(!addChannel)}>
                        <i className="fas fa-plus"></i>
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ChatSideBar;

