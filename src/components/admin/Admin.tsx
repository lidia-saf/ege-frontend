import * as React from 'react';
import './admin.css';
import { AdminTest } from './admintest/AdminTest';
import { AdminTestDesc } from './admintestdesc/AdminTestDesc';

export const Admin: React.FC<{}> = () => {
    const [section, setSection] = React.useState('tests-add');

    return (
        <div className='admin-page'>
            <nav className='admin-nav'>
                <p>Тесты</p>
                <ul className='admin-sections'>
                    <li onClick={() => setSection('tests-add')}>Добавить новые вопросы</li>
                    <li onClick={() => setSection('testdesc-add')}>Добавить описание нового теста</li>
                </ul>
            </nav>
            {section === 'tests-add' && <AdminTest />}
            {section === 'testdesc-add' && <AdminTestDesc />}
        </div>
    )
}
