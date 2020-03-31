import * as React from 'react';
import './loginbuttons.css';
import '../../styles/index.css';
import { Link } from 'react-router-dom';
import { authContext } from '../../contexts/AuthContext';
import { signOut } from '../../utils/auth';

interface ILogin {};

export const LoginButtons: React.FC<ILogin> = () => {
    const {
        auth,
        setAuthStatus,
        setUsername,
        setTimestamp,
        username
    } = React.useContext(authContext);
    return (

            <div className='login-buttons-container'>
            {auth.authenticated ?
            <a href='' className='general-link login-button' onClick={() => signOut(username, setAuthStatus, setUsername, setTimestamp)}>Выйти</a> :
            <Link to='/signup' className='general-link login-button'>Регистрация/Вход</Link>}
        </div>
    )
}