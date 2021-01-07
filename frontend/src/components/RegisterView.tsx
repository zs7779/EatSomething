import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';

import registerService from '../services/registerService';


function RegisterView() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        registerService.registerAccount(username, email, password)
            .then(res => {
                setRedirect(true);
            }).catch(err => {
                console.log(err.response.data.error);
            });
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
                        <input className="form-control" type="email" name="email" onChange={handleEmail} placeholder="Email Address"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" onChange={handlePassword} placeholder="Password" required/>
                    </div>
                    {/* <div className="form-group">
                        <input className="form-control" type="password" name="confirmation" onChange={handlePassword} placeholder="Confirm Password" required/>
                    </div> */}
                    <button className="btn btn-primary">Register</button>
                </form>
            </div>
        )
    }
}
    
export default RegisterView;