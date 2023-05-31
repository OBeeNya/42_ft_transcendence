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
			
			// Ajoute l'écouteur d'événements au document
			document.addEventListener("mousedown", handleClickOutside);

			// Nettoie l'écouteur d'événements lorsque le composant se démonte ou lorsque `isSearchOpen` change
			return () =>
			{
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [isSearchOpen]);

	return (
		<div className="channel-search-add">

			<div className="first-line">

				<div className="channels-text">
					<p>CHANNELS</p>
				</div>

				<div className="icons">

					<button onClick={() => setIsSearchOpen(!isSearchOpen)}>
						<i className="fas fa-search"></i>
					</button>

					{isSearchOpen ? <input ref={searchInputRef} type="text" placeholder="Search..." /> : null}

					<button onClick={() => setAddChannel(!addChannel)}>
						<i className="fas fa-plus"></i>
					</button>

				</div>

			</div>

		</div>
	);
};

export default ChatSideBar;
