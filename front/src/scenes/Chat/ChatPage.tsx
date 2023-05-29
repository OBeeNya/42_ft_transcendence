import { Link } from "react-router-dom";
import Content from "../../components/content"
import Header from "../../components/header"

const ChatPage = () => {

	return (
		<div>
			<Header />
			<Content>
				<h1>Chat page</h1>
				<br></br>
				<Link to="/home">Home</Link>
				<br></br>
			</Content>
		</div>

	);

};

export default ChatPage;