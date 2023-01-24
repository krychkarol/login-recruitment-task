import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate();

    const [error, setError] = useState(false);
	const [isLogin, setIsLogin] = useState(false);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const login = async () => {
		try {
			const res = await axios.post('http://localhost:5000/login', { username: username, password: password });
			setError(false)
			setToken(res.data.token)
			setIsLogin(true)
		} catch (error) {
			setError(error.response.data)
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

    useEffect(() => {
        if(isLogin){
            navigate(`/user/${username}`, { state: { username, token}})
        }
    },[isLogin]);

    return (
        <form>
            <div className="title"> Log In</div>
            {error && <div className='err'>{error}</div>}
            <input placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
            <input placeholder='Passowrd' type='password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} >Log In</button>
        </form>
    )
}

export default LoginForm