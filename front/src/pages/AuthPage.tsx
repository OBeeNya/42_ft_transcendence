import { Link } from "react-router-dom";

const AuthPage = () => {

	return (
		<div>
			<h1>Identify yourself</h1>
			<br></br>
			<Link to="/signup">Signup</Link>
			<br></br>
			<br></br>
			<br></br>
			<Link to="/signin">Signin</Link>
		</div>
	);

};

export default AuthPage;
