import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/welcome" element={<WelcomePage/>} />
    </Routes>
  );
}

export default App;
