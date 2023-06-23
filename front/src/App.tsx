import { Route, Routes } from 'react-router-dom';
import SignupPage from './scenes/SignUp/SignupPage';
import SigninPage from './scenes/SignIn/SigninPage';
import AuthPage from './scenes/Auth/AuthPage';
import HomePage from './scenes/HomePage/HomePage';
import EditProfilePage from './scenes/EditProfile/EditProfilePage';
import ProfilePage from './scenes/Profile/ProfilePage';
import Callback42 from './scenes/CallBack42/Callback42';
import PongPage from './scenes/Pong/PongPage';
import PongPage2 from './scenes/Pong/PongPage2';
import PongPageGame from './scenes/Pong/PongPageGame';
import PongPageGame2 from './scenes/Pong/PongPageGame2';
import PongPageGameSolo from './scenes/Pong/PongPageGameSolo';
import { ProtectedRoute , ProtectedRouteProps } from "./components/protectedRoutes";
import OnlinePage from './scenes/Online/OnlinePage';
import Leaderboard from './scenes/Leaderboard/Leaderboard';
import TfaPage from './scenes/Tfa/TfaPage';
import MainPage from './scenes/Chat/MainPage/MainPage';

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
        <Route path="/tfa" element={<TfaPage/>} />
        <Route path="/home" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage/>} />} />
        <Route path="/profile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ProfilePage/>} />} />
        <Route path="/editprofile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<EditProfilePage/>} />} />
        <Route path="/pong" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPage/>} />} />
        <Route path="/pong2" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPage2/>} />} />
        <Route path="/pongGame/:gameId" Component={PongPageGame} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPageGame/>} />} />
        <Route path="/pongGame2/public/:username" Component={PongPageGame2} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPageGame2/>} />} />
        <Route path="/pongGameSolo" Component={PongPageGameSolo} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPageGameSolo/>} />} />
        <Route path="/chat" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MainPage/>} />} />
        <Route path="/online" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<OnlinePage/>} />} />
        <Route path="/leaderboard" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Leaderboard/>} />} />
    </Routes>
  );
}

export default App;
