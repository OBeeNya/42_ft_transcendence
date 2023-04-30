import { Routes, Route } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';

const Routes = () => {
	<Routes>
		<Route
			exact path="/signup"
			component={SignupPage}
		/>
	</Routes>
};
