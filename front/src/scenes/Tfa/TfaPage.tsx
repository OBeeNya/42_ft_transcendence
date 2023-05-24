import { ax } from '../../services/axios/axios'

const TfaPage = () => {

	const token = localStorage.getItem("token");

	const getCode = async () => {
		try {
			const response = await ax.get("http://localhost:8080/users/qrcode", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
		}
		catch (e) {
			console.log(e);
		}
	}
	getCode();
		
	return (
		<div>
			Bonjour
		</div>
	);
};

export default TfaPage;
