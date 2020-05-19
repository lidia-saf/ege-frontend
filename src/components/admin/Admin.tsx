import * as React from 'react';
import './admin.css';
import { Link } from 'react-router-dom';

export const Admin: React.FC<{}> = () => {
    return (
        <div className='admin-page'>
            <nav className='admin-nav'>
                <ul className='admin-sections'>
                    <li><Link to={`/admin/question`}>Новый вопрос</Link></li>
                    <li><Link to={`/admin/testdesc`}>Новое описание теста</Link></li>
                    <li><Link to={`/admin/testlist`}>Список вопросов</Link></li>
                </ul>
            </nav>
        </div>
    )
}
