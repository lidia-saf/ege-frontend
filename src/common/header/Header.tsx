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
        </ul>
        <div className='logo-font'>Sdam English</div>
        <LoginButtons />
    </nav>
)
}