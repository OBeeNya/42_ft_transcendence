import { useEffect, useState } from "react";
import { SocketContext } from "../../../socketContext";
import axios from "axios";

const Block = () =>
{
	// Récupérer l'utilisateur actuellement connecté (blockerId)
	function getCurrentUserId()
	{
		const [currentUser, setCurrentUser] = useState([]);
		const token = localStorage.getItem("token");

		useEffect(() =>
		{
			const getCurrentUser = async () =>
			{
				try
				{
					const currentUserResponse = await axios.get("http://localhost:8080/users/me",
					{
						headers:
						{
							Authorization: `Bearer ${token}`,
						},
					});

					setCurrentUser(currentUserResponse.data);
				}
				catch (error)
				{
					console.error('Error fetching current user:', error);
				}
			};
	
			getCurrentUser();
	
		}, [token, setCurrentUser]);
	}
}

export default Block;
