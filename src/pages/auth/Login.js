import { useState } from 'react';
import API from '../../api/api'; // Replace with your API module

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        API.post('auth/login/', {
            username: username,
            password: password,
            user_type: 'admin',
            institution: localStorage.getItem('institution_id'),
        })
            .then((resp_data) => {
                if (resp_data.status === 200) {
                    setAuthenticated(true);
                    localStorage.setItem('auth_token', resp_data.data['token']);
                    localStorage.setItem('user_email', resp_data.data['user']['email']);
                    localStorage.setItem('user_id', resp_data.data['user']['id']);
                    localStorage.setItem('is_admin', resp_data.data['user']['is_admin']);
                    localStorage.setItem(
                        'user_first_name',
                        resp_data.data['user']['first_name']
                    );
                    localStorage.setItem(
                        'user_last_name',
                        resp_data.data['user']['last_name']
                    );
                    localStorage.setItem('authenticated', true);

                    if (resp_data.data.staff_type) {
                        localStorage.setItem('staff_type', resp_data.data.staff_type);
                    } else if (resp_data.data.admin_type) {
                        localStorage.setItem('admin_type', resp_data.data.admin_type);
                    }
                    window.location.href = '/';
                }
            })
            .catch((error) => {
                // Handle error
                console.error('Login failed:', error);
            });
    };

    return (
        <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
