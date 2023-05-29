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
	const { register, handleSubmit, reset } = useForm({defaultValues: {	name: userInfos?.name, 
																		email: userInfos?.email,
																								}});
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
		if (userInput.name === '' && userInput.email === '')
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
			const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
			const messageEmail = document.getElementById("messageEmail");
			if (userInput.email !== '') {
				if (!expression.test(userInput.email)) {
					if (messageEmail)
						messageEmail.textContent = "Please enter a valid email";
				}
				else {
					await ax.patch('users', {
						email: userInput.email,
					}, {
						headers: {
							Authorization: `Bearer ${token}`
						},
					});
					if (messageEmail)
						messageEmail.textContent = "";
				}	
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
					<h1>User profile</h1>
						<h2>Verify your information and update any available field as necessary</h2>
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
							<div className="avatarChangeButton">
								<label className="editUserInformationKey">Upload a new avatar:</label>
								<input
									type='file'
									onChange={handleAvatarChange}
									/>
								<div id="messageAvatar"></div>
							</div>
						</div>
						<label className="editUserInformationKey">Enable two-factor authentication:</label>
						<input
							type="checkbox"
							checked={userInfos?.tfa || false}
							onChange={handleTfaChange}
						/>
						<label className="editUserInformationKey">Change your name:</label>
						<input className="editUserInformationKey"
							type="text"
							{...register("name")}
							/>
						<label className="editUserInformationKey">Change your email:</label>
						<input  className="editUserInformationKey"
							type="email"
							{...register("email")}
							/>
						<p id="messageEmail"> </p>
						<button type="submit" value="submit" >Submit</button>
						<div id="message"></div>
					</form>
				</div>
			</Content>
		</div>
	);
};

export default EditProfilePage;
