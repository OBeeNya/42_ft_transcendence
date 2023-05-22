import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback42 = () => {
    const navigate = useNavigate();

    function redirectHome() {
        const url = window.location.href as string;
        const tokenSplit: string = url.split("=")[1];
        localStorage.setItem("userStatus", "connected");
        localStorage.setItem("isConnected", "yes");
        localStorage.setItem("token", tokenSplit);
        navigate('/editprofile');
    }
    useEffect(() => { redirectHome() } );

	return (
		<div>
		</div>
	);
};

export default Callback42;
