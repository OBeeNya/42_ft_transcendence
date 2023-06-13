import Header from "../../../components/header"
import ChatBox from "../DirectMessage/ChatBox/ChatBox";
import Sidebar from "../Sidebar/Sidebar";
import UsersList from "../UsersList/UsersList";
import './MainPage.css';

const MainPage = () =>
{
    return (
        <div className="chat-page">
            <Header />

            <div className="content">
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="chat-box">
                    <ChatBox senderId={2} receiverId={1} />
                </div>

                <div className="users-list">
                    <UsersList />
                </div>
            </div>

        </div>
    );
};

export default MainPage;
