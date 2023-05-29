import { Route, Routes } from 'react-router-dom';
import SignupPage from './scenes/SignUp/SignupPage';
import SigninPage from './scenes/SignIn/SigninPage';
import AuthPage from './scenes/Auth/AuthPage';
import HomePage from './scenes/HomePage/HomePage';
import EditProfilePage from './scenes/EditProfile/EditProfilePage';
import ProfilePage from './scenes/Profile/ProfilePage';
import Callback42 from './scenes/CallBack42/Callback42';
import PongPage from './scenes/Pong/PongPage';
import Chat from './scenes/ChatLucas/ChatLucas';
import { ProtectedRoute , ProtectedRouteProps } from "./components/protectedRoutes";
import OnlinePage from './scenes/Online/OnlinePage';
import Leaderboard from './scenes/Leaderboard/Leaderboard';
import ChatLucas from './scenes/ChatLucas/ChatLucas';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  authenticationPath: '/',
};

function App() {
  return (
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/signin" element={<SigninPage/>} />
        <Route path="/callback42" element={<Callback42/>} />
        <Route path="/home" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage/>} />} />
        <Route path="/profile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ProfilePage/>} />} />
        <Route path="/editprofile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<EditProfilePage/>} />} />
        <Route path="/pong" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPage/>} />} />
        <Route path="/chat" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Chat/>} />} />
        <Route path="/online" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<OnlinePage/>} />} />
        <Route path="/leaderboard" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Leaderboard/>} />} />
        <Route path="/chatLucas" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ChatLucas/>} />} />
    </Routes>
  );
}

export default App;