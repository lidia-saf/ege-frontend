import * as React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { authContext } from '../../contexts/AuthContext';
import { signOut } from '../../utils/auth';
import { useHistory } from 'react-router-dom';

interface IHeader {};

export const Header: React.FC<IHeader> = () => {
    const {
        auth,
        setAuthStatus,
        setUsername,
        setTimestamp,
        username,
        isUserAdminGroup
    } = React.useContext(authContext);
    const history = useHistory();
    const [menuOpened, setMenuOpened] = React.useState(false);

    return (
        <nav className='navigation'>
            <div className='menu-toggle'>
                <input className='menu-input' type='checkbox' checked={menuOpened} onClick={() => setMenuOpened(prev => !prev)}/>
                <span></span>
                <span></span>
                <span></span>
                <ul className='navigation-list'>
                    <li className='navigation-list-item'>
                        <Link onClick={() => setMenuOpened(prev => !prev)} to='/tests'>Тесты</Link>
                    </li>
                    <li className='navigation-list-item'>
                        <Link onClick={() => setMenuOpened(prev => !prev)} to='/aboutexam'>Об экзамене</Link>
                    </li>
                    <li className='logo-font'>
                        <Link to='/' className='logo-font'>Sdam English</Link>
                    </li>
                    <li className='navigation-list-item'>
                        <Link onClick={() => setMenuOpened(prev => !prev)} to='/materials'>Материалы</Link>
                    </li>
                    {isUserAdminGroup &&
                    <li className='navigation-list-item'>
                        <Link onClick={() => setMenuOpened(prev => !prev)} to='/admin/question'>Админка</Link>
                    </li>}
                    <li className='navigation-list-item'>
                        {auth.authenticated ?
                        <a href=''
                            onClick={() => signOut(username, setAuthStatus, setUsername, setTimestamp, history)}>Выйти</a>
                        :
                        <Link onClick={() => setMenuOpened(prev => !prev)} to='/signup'>Вход</Link>}
                    </li>
                </ul>
            </div>
            <Link className='logo-small' to='/'>Sdam English</Link>
        </nav>
    )
}