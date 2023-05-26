import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { ax } from '../../services/axios/axios';

const Callback42 = () => {

    const navigate = useNavigate();
	// const token = localStorage.getItem("token");

    const redirectHome = async() => {
        const url = window.location.href as string;
        const tokenSplit: string = url.split("=")[1];
        localStorage.setItem("userStatus", "connected");
        localStorage.setItem("isConnected", "yes");
        localStorage.setItem("token", tokenSplit);
        // try {
        //     await ax.patch("users", {
        //         connected: true,
        //     }, {
		// 		headers: {
		// 			Authorization: `Bearer ${token}`
		// 		},
		// 	});
        //     const response = await ax.get("http://localhost:8080/users/me", {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     });
            navigate('/editprofile');
        // }
        // catch {
        //     console.log("could not change connected to true");
        // }
    }
    useEffect(() => { redirectHome() } );

	return (
		<div>
		</div>
	);
};

export default Callback42;
