import { Link } from "react-router-dom";
import Content from "../components/content"

const AuthPage = () => {

	return (
		<Content>
			<div>
				<h1>Identify yourself</h1>
				<br></br>
				<Link to="/signup">Signup</Link>
				<br></br>
				<br></br>
				<br></br>
				<Link to="/signin">Signin</Link>
			</div>
		</Content>
	);

};

export default AuthPage;
