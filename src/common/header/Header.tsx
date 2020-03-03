import * as React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

interface IHeader {};

export const Header: React.FC<IHeader> = () => (
    <nav className='navigation'>
        <li className='navigation-list-item'>
            <Link to='/tests'>Тесты ЕГЭ</Link>
        </li>
        <li className='navigation-list-item'>
            <Link to='/aboutexam'>Об экзамене</Link>
        </li>
        <li className='navigation-list-item'>
            <Link to='/materials'>Материалы для подготовки</Link>
        </li>
    </nav>
)