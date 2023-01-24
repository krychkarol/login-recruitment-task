import React, { useState } from "react";
import axios from 'axios';

import './App.css';

function App() {

	const [error, setError] = useState(false);
	const [isLogin, setIsLogin] = useState(false);


	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");
	const [dummy, setDummy] = useState("");

	const login = async () => {
		try {
			const res = await axios.post('http://localhost:5000/login', { username: username, password: password });
			console.log(res.data);
			setError(false)
			setToken(res.data.token)
			setIsLogin(true)
		} catch (error) {
			setError(error.response.data)
			console.log(error.response.data);
		}
	}

	const getMyDummyData = async () => {
		try {
			const res = await axios.get(`http://localhost:5000/${username}`, { headers: { token: `Bearer ${token}` } })
			setDummy(res.data)
		}
		catch (error) {
			console.log(error);
		}
	}

	const handleLogin = (e) => {
		e.preventDefault();
		if (!username) {
			setError("Username is required")
			return
		}
		if (!password) {
			setError("Passowrd is required")
			return
		}
		login();
	}

	return (
		<div className="App">
			{isLogin ?
				<div className="user">
					<div className="title">Login success</div>
					{dummy ?
						<div className="data">{dummy.dummy}</div>
						:
						<button onClick={getMyDummyData} >Get my dummy data</button>}
				</div>
				:
				<form>
					<div className="title"> Log In</div>
					{error && <div className='err'>{error}</div>}
					<input placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
					<input placeholder='Passowrd' type='password' onChange={(e) => setPassword(e.target.value)} />
					<button onClick={handleLogin} >Log In</button>
				</form>}
		</div>
	);
}

export default App;
