import * as React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { LoginButtons } from '../loginbuttons/LoginButtons';

interface IHeader {};

export const Header: React.FC<IHeader> = () => {
    return (
    <nav className='navigation'>
        <ul className='navigation-list'>
            <li className='navigation-list-item'>
            <Link to='/tests'>Тесты</Link>
            </li>
            <li className='navigation-list-item'>
                <Link to='/aboutexam'>Об экзамене</Link>
            </li>
            <li className='navigation-list-item'>
                <Link to='/materials'>Материалы</Link>
            </li>
            <li className='logo-font'>
                <Link to='/' className='logo-font'>Sdam English</Link>
            </li>
        </ul>
        <LoginButtons />
    </nav>
)
}