import { useEffect, useState } from "react";
import { ax } from "../../services/axios/axios";
import Header from "../../components/header";
import Content from "../../components/content";
import { UserInfos } from "../../services/interfaces/userInfos.interface";
import "./style/ProfilePage.css";

const ProfilePage = () => {

	const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
	const token = localStorage.getItem("token");
	const [showTFAKey, setShowTFAKey] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await ax.get("http://localhost:8080/users/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUserInfos(response.data);
				// console.log(userInfos?.tfa);
				// console.log(userInfos?.name);
			} catch (error) {
				console.error("Failed to fetch users.");
			}
		};
		getUsers();
	}, [token]);

	const toggleTFAKey = () => {
		setShowTFAKey(!showTFAKey);
	  };

	return (
		<div>
			<Header />
			<Content>
				<div className="userProfileContainer">
					<h1>Your profile</h1>
					<img 	className="userAvatar"
							src={'/avatar/' + userInfos?.id + '.png'}
							alt="avatar"
							onError={(event) => {
								const target = event.target as HTMLImageElement;
								target.src = '/avatar/auto.png';
							  }}
					/>
					<div className="userInformations">
						<p className="userInformationKey">  Name: </p>
						<p className="userInformationValue"> {userInfos?.name} </p>
						<p className="userInformationKey"> Statistiques: </p>
						<p className="userInformationValue"> Wins: {userInfos?.wins} </p>
						<p className="userInformationValue"> Losses: {userInfos?.losses} </p>
						<p className="userInformationValue"> Ladder lever: {userInfos?.ladder_level} </p>

						{userInfos?.tfa && (
							  <button onClick={toggleTFAKey}>View your 2FA key</button>
						)}
						{showTFAKey && userInfos?.tfa_key && (
							<div className="tfaKeyContainer">
								<p className="tfaKeyText">
									Your two-factor authentication key: {userInfos?.tfa_key}
								</p>
							</div>
						)}
					</div>
				<a href="/editprofile">
					<button >Edit your profile informations</button>
				</a>
				</div>
			</Content>
		</div>
	);

};

export default ProfilePage;