import { useNavigate } from "react-router-dom";

const RoomEmptyPage = () => {

	const navigate = useNavigate();

	function wait(delay: any) {
		return new Promise(resolve => {
			setTimeout(resolve, delay);
		})
	}

	const waiting = async () => {
		await wait(5000);
        navigate('/pongGame');
	}
	waiting();

	return (
        <div className="loading-container">
        <h1 className="loading-text">Found empty room, redirecting you to game...</h1>
        <div className="loading-circle"></div>
      </div>
	);

};

export default RoomEmptyPage;
