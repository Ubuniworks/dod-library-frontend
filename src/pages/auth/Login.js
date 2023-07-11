import {useState} from 'react';
import API from '../../api/api';
import {Button, Grid, TextField, Typography} from "@mui/material"; // Replace with your API module

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );
    // Get the logo image from components folder
    const LogoImage = require('./components/KDF-Logo.jpg');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        API.post('auth/login/', {
            username: username,
            password: password
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

                    window.location.href = '/';
                }
            })
            .catch((error) => {
                // Handle error
                console.error('Login failed:', error);
            });
    };


    // let LogoImage = process.env.PUBLIC_URL + '/public/Kenya_Defence_Forces Emblem.png';
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#002060"
        >
            <Grid item sx={{textAlign: 'center'}}
                  style={{
                      width: '400px',
                      maxHeight: '600px',
                      backgroundColor: '#ffffff',
                      padding: '2rem',
                      borderRadius: '10px',
                  }}
            >
                <img
                    src={LogoImage}
                    alt="KDF Logo"
                    style={{marginBottom: '2rem', width: '200px', height: 'auto'}}/>
                <Typography
                    variant="h5"
                    style={{
                        marginBottom: '2rem',
                        color: '#002060',
                    }}
                >
                    The Republic of Kenya
                    Department of Defense
                    Digital Library
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    style={{
                        width: "300px"
                    }}
                    value={username}
                    onChange={handleUsernameChange}
                    sx={{marginBottom: '1rem', backgroundColor: '#ffffff'}}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    style={{
                        width: "300px"
                    }}
                    value={password}
                    onChange={handlePasswordChange}
                    sx={{marginBottom: '1rem', backgroundColor: '#ffffff'}}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        width: "300px"
                    }}
                    onClick={handleLogin}
                    sx={{backgroundColor: '#002060', color: '#ffffff'}}
                >
                    Sign In
                </Button>
            </Grid>
        </Grid>
    );
}
