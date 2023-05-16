import { Link } from 'react-router-dom';
import  "../style/components.css"

export default function Header () {
    
    const logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("isConnected", "no");
        console.log("setting connected to FALSE(logout)");
    }

    return (
        <div className="header-body">
            <Link className="header-links" to="/home">Home</Link>
            <Link className="header-links" to="/profile">Profile</Link>
            <Link className="header-links" to="/pong">Pong</Link>
            <Link className="header-links" onClick={logout} to="/">Logout</Link> 
        </div>
    )
}