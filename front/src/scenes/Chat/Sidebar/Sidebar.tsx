import { useState, useRef, useEffect } from "react";

const SideBar = () =>
{
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

	return (
		<div className="channel-search-add">

			<div className="first-line">

				<div className="channels-text">
					<p>CHANNELS</p>
				</div>

				<div className="icons">
					<button>
						<i className="fas fa-search"></i>
					</button>

					{/* Si vous voulez toujours afficher un champ de recherche : */}
					<input type="text" placeholder="Search..." />

					<button>
						<i className="fas fa-plus"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
