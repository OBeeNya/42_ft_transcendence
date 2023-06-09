import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute , ProtectedRouteProps } from "./components/protectedRoutes";
import SignupPage from './scenes/SignUp/SignupPage';
import SigninPage from './scenes/SignIn/SigninPage';
import AuthPage from './scenes/Auth/AuthPage';
import HomePage from './scenes/HomePage/HomePage';
import EditProfilePage from './scenes/EditProfile/EditProfilePage';
import ProfilePage from './scenes/Profile/ProfilePage';
import Callback42 from './scenes/CallBack42/Callback42';
import PongPage from './scenes/Pong/PongPage';
import PongPageGame from './scenes/Pong/PongPageGame';
import PongPageGameSolo from './scenes/Pong/PongPageGameSolo';
import OnlinePage from './scenes/Online/OnlinePage';
import PongRecord from './scenes/Pong/PongRecord';
import TfaPage from './scenes/Tfa/TfaPage';
import ChatRoutes from './ChatRoutes';
import MatchmakingPage from './scenes/Matchmaking/Matchmaking';
import PongRedirecPage from './scenes/Pong/PongRedirec';
import RoomEmptyPage from './scenes/Matchmaking/RoomEmpty';
import ProfileRedirection from './scenes/Chat/ProfileRedirection/ProfileRedirection';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> =
{
	authenticationPath: '/',
};

function App()
{

  return (
	<Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/signin" element={<SigninPage/>} />
        <Route path="/callback42" element={<Callback42/>} />
        <Route path="/tfa" element={<TfaPage/>} />
        <Route path="/home" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage/>} />} />
        <Route path="/profile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ProfilePage/>} />} />
		<Route path="/profile/:userId" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ProfileRedirection/>} />} />
		<Route path="/editprofile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<EditProfilePage/>} />} />
        <Route path="/matchmaking" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MatchmakingPage/>} />} />
        <Route path="/pong" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPage/>} />} />
        <Route path="/pongredirec" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongRedirecPage/>} />} />
        <Route path="/record" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongRecord/>} />} />
        <Route path="/empty" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<RoomEmptyPage/>} />} />
        <Route path="/pongGame" Component={PongPageGame} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPageGame/>} />} />
        <Route path="/pongGameSolo" Component={PongPageGameSolo} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPageGameSolo/>} />} />
        <Route path="/online" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<OnlinePage/>} />} />
		<Route path="/*" element={<ChatRoutes/>} />
	</Routes>
  );
}

export default App;
