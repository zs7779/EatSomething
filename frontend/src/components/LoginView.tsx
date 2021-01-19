import React, { ChangeEvent, FormEvent, useState } from 'react';

import loginService from '../services/loginService';
import '../css/LoginView.css';
import { Link } from 'react-router-dom';


function LoginView({setLoginToken}: {setLoginToken: (arg0: string)=>void}) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState<string>();

    const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(undefined);
        loginService.login({
            username,
            password
        }).then(res => {
            loginService.storeToken(res.token);
            setLoginToken(res.token);
        }).catch(err => {
            setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
        });
    }
    return (
        <div className="login-form">
            <form onSubmit={handleSubmit} className="card card-body">
                <h4>Please login</h4>
                {errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}
                <hr/>
                <div className="form-group">
                    <input className="form-control" autoFocus type="text" name="username" onChange={handleUsername} placeholder="Username" required/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="password" onChange={handlePassword} placeholder="Password" required/>
                </div>
                
                <button className="btn btn-primary">Login</button>
                <div className="mt-1">New user? <Link to="/register">Create an account!</Link></div>
            </form>
        </div>
    )
}
    
export default LoginView;