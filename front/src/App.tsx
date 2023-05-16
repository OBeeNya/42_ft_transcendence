import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Callback42 from './pages/Callback42';
import PongPage from './pages/PongPage';
import ChatPage from './pages/ChatPage';
import { ProtectedRoute , ProtectedRouteProps } from "./components/protectedRoutes";

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
        <Route path="/pong" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PongPage/>} />} />
        <Route path="/chat" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ChatPage/>} />} />
      </Routes>
  );
}

export default App;