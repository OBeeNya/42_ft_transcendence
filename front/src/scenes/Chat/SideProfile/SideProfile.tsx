import { useState } from "react";
import "./SideProfile.css";
import { ChanUser } from "../MainPage/MainPage";



const SideProfile = ({user}: {user: ChanUser}) => {

    return (
        <div className="side-profile">
            <button className="top-right">Top Right Button</button>
            {user.name}
            <button>add friend</button>
            <button>ban</button>
            <button>mute</button>
            <button>set {user.name} as administrator</button>
        </div>
    );
}

export default SideProfile;