import * as React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { LoginButtons } from '../loginbuttons/LoginButtons';
import { authContext } from '../../contexts/AuthContext';
import { signOut } from '../../utils/auth';

interface IHeader {};

export const Header: React.FC<IHeader> = () => {
    const {
        auth,
        setAuthStatus,
        setUsername,
        setTimestamp,
        username
    } = React.useContext(authContext);
    return (
    <nav className='navigation'>
        <ul className='navigation-list'>
            <li className='navigation-list-item'>
            <Link to='/tests'>Тесты</Link>
            </li>
            <li className='navigation-list-item'>
                <Link to='/aboutexam'>Об экзамене</Link>
            </li>
            <li className='logo-font'>
                <Link to='/' className='logo-font'>Sdam English</Link>
            </li>
            <li className='navigation-list-item'>
                <Link to='/materials'>Материалы</Link>
            </li>
            <li className='navigation-list-item'>
                {auth.authenticated ?
                <a href=''
                    onClick={() => signOut(username, setAuthStatus, setUsername, setTimestamp)}>Выйти</a>
                 :
                <Link to='/signup'>Вход</Link>}
            </li>
        </ul>
    </nav>
)
}