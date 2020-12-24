import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import loginService from '../services/loginService';


function LogoutView({setLoginToken}: {setLoginToken: (arg0: string|null)=>void}) {
    useEffect(()=>{
        setLoginToken(null);
        loginService.logout();
    }, []);
    
    return (
        <Redirect to="/"/>
    )
}
    
export default LogoutView;