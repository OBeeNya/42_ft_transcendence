import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ax } from "../../services/axios/axios";
import Content from "../../components/content";
import { UserInfos } from "../../services/interfaces/userInfos.interface";
import "/Users/lucas/42_ft_transcendence/front/src/scenes/Profile/style/ProfilePage.css"

const OtherUserProfilePage = () =>
{
	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
	const token = localStorage.getItem("token");

	let { userId } = useParams();

	useEffect(() =>
	{
		const getUsers = async () =>
		{
			try
			{
				const response = await ax.get(`http://localhost:8080/users/${userId}`,
				{
					headers:
					{
						Authorization: `Bearer ${token}`,
					},
				});
				setUserInfos(response.data);
			}
			catch (error)
			{
				console.error("Failed to fetch users.");
			}
		};
		getUsers();
	}, [token, userId]);

	return (
		<div>
			<Content>
				<div className="userProfileContainer">
					<img 	className="userAvatar"
							src={'/avatar/' + userInfos?.id + '.png'}
							alt="avatar"
							onError={(event) => {
								const target = event.target as HTMLImageElement;
								target.src = '/avatar/auto.png';
							}}
					/>
					<div className="userInformations">
						<p className="userInformationKey">Name:</p>
						<p className="userInformationValue">{userInfos?.name}</p>
						<p className="userInformationKey">Statistiques:</p>
						<p className="userInformationValue">Wins: {userInfos?.wins}</p>
						<p className="userInformationValue">Losses: {userInfos?.losses}</p>
						<p className="userInformationValue">Ladder lever: {userInfos?.ladder_level}</p>
					</div>
				</div>
			</Content>
		</div>
	);
};

export default OtherUserProfilePage;
