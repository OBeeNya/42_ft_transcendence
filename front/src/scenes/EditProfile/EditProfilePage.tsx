import Content from "../../components/content"
import Header from "../../components/header"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { ax } from '../../services/axios/axios'
import { UserInfos } from "../../services/interfaces/userInfos.interface";
import "./style/EditProfilePage.css";

const EditProfilePage = () => {
	const navigate = useNavigate();
	const [userInfos, setUserInfos] = useState<UserInfos | null>();
	
	const token = localStorage.getItem("token");
	const { register, handleSubmit, reset } = useForm({defaultValues: {	name: userInfos?.name, }});
	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await ax.get("http://localhost:8080/users/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUserInfos(response.data);
				reset(response.data);
			} catch (error) {
				console.error("Failed to fetch users.");
			}
		};
		getUsers();
	}, [token, reset]);

	const handleChanges = async (userInput: any) => {
		if (userInput.name === '')
			return ;
		try {
			if (userInput.name !== '') {
				await ax.patch('users', {
					name: userInput.name,
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					},
				});
			}
			try {
				await ax.patch('users', {
					tfa: userInfos?.tfa,
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					},
				});
			}
			catch {
				console.log("could not update tfa preferences")
			}

			const message = document.getElementById("message");
			if (message)
				message.textContent = "Profile updated";
			navigate('/profile');
		}
		catch {
			const message = document.getElementById("message");
			if (message)
				message.textContent = "Name already taken";
		}
	};

	const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files)
			return ;
		const file = event.target.files[0];
		const form = new FormData();
		form.append("file", file, file.name);
		try {
			await ax.post("users/avatar", form, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				}
			});
		}
		catch {
			const messageAvatar = document.getElementById("messageAvatar");
			if (messageAvatar)
				messageAvatar.textContent = "Could not upload avatar, please make sure an .jpg, .jpeg or .png file was used";
		}
	}

	const handleTfaChange = async () => {
		if (userInfos?.tfa !== undefined) {
			setUserInfos({...userInfos,
				tfa: !userInfos?.tfa
				
			});
		}
	}

	return (
		<div>
			<Header />
			<Content>
				<div className="editUserProfileContainer">
					{/* <h1>User profile</h1> */}
						<h2>Update your informations</h2>
					<form className="editUserInformations" onSubmit={handleSubmit(handleChanges)}>
						<div className="avatarChange">
							<img
								className="editUserAvatar"
								src={'/avatar/' + userInfos?.id + '.png'}
								alt="avatar"
								onError={(event) => {
									const target = event.target as HTMLImageElement;
									target.src = '/avatar/auto.png';
								  }}
								/>
							<div className="avatarChangeButtonContainer">
								{/* <label className="avatarChangeButtonLabel">Change avatar:</label> */}
								<input
									type='file'
									className="avatarChangeButton"
									onChange={handleAvatarChange}
									/>
								<div id="messageAvatar"></div>
							</div>
						</div>
						<div className="tfaContainer">
							<label className="editUserInformationKey">Enable two-factor authentication</label>
							<input
								type="checkbox"
								checked={userInfos?.tfa || false}
								onChange={handleTfaChange}
								/>
						</div>
						<label className="editUserInformationKey">Change name:</label>
						<input className="editUserInformationKey"
							type="text"
							{...register("name")}
						/>
						<button type="submit" value="submit" >Submit</button>
						<div id="message"></div>
					</form>
				</div>
			</Content>
		</div>
	);
};

export default EditProfilePage;
