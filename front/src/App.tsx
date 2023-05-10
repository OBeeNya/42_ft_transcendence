import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Home2 from './pages/Home2';
import PongPage from './pages/PongPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/signin" element={<SigninPage/>} />
      <Route path="/home2" element={<Home2/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/pong" element={<PongPage/>} />
      <Route path="/chat" element={<ChatPage/>} />
    </Routes>
    
  );
}

export default App;
