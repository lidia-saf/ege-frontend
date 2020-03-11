import * as React from 'react';
import './loginbuttons.css';
import '../../styles/index.css';
import { Link } from 'react-router-dom';

interface ILogin {};

export const LoginButtons: React.FC<ILogin> = () => {
    return (
        <div className='login-buttons-container'>
            <Link to='/signup' className='general-link login-button'>Зарегистрироваться</Link>
            <Link to='/signin' className='general-link login-button'>Войти</Link>
        </div>
    )
}