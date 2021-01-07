import React, { ChangeEvent, FormEvent, useState } from 'react';

import loginService from '../services/loginService';


function LoginView({setLoginToken}: {setLoginToken: (arg0: string)=>void}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        loginService.login({
            username,
            password
        }).then(res => {
            loginService.storeToken(res.token);
            setLoginToken(res.token);
        }).catch(err => {
            console.log(err.response.data.error);
        })
    }
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
    
export default LoginView;