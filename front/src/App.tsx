import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import EditProfilePage from './pages/EditProfilePage';
import Callback42 from './pages/Callback42';
import PongPage from './pages/PongPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/signin" element={<SigninPage/>} />
      <Route path="/callback42" element={<Callback42/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/editprofile" element={<EditProfilePage/>} />
      <Route path="/pong" element={<PongPage/>} />
      <Route path="/chat" element={<ChatPage/>} />
    </Routes>
    
  );
}

export default App;
