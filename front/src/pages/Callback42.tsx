import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback42 = () => {

    const navigate = useNavigate();

    function redirectHome() {
        const url = window.location.href as string;
        const tokenSplit: string = url.split("=")[1];
        navigate('/editprofile', { state: { token: tokenSplit} });
    }

    useEffect(() => { redirectHome() } );

	return (
		<div>
		</div>
	);

};

export default Callback42;
