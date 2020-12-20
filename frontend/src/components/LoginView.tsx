import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import loginService from '../services/loginService';


const base_url = "http://localhost:3001";

function LoginView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        axios.post(`${base_url}/api/login`, {
            username,
            password
        }, {
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            loginService.storeToken(res.data.token);
            setRedirect(true);
        }).catch(err => {
            console.log(err.response.data.error);
        })
    }
    if (redirect) {
        return <Redirect to="/login"/>
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input className="form-control" autoFocus type="text" name="username" onChange={handleUsername} placeholder="Username" required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" onChange={handlePassword} placeholder="Password" required/>
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}
    
export default LoginView;