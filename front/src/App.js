import React from "react";
import {
	BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import './App.css';
import DummyPage from "./pages/DummyPage";
import LoginForm from "./pages/LoginForm";

function App() {

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<LoginForm />} />
					<Route path="/user/:username" element={<DummyPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
