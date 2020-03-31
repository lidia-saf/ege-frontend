import * as React from 'react';
import { SignUp } from '../signup/SignUp';
import { SignIn } from '../signin/SignIn';
import './login.css';

export const Login = () => {
    const [activeTab, setActiveTab] = React.useState('sign-up');

    return (
        <div>
           <ul className='login-tab-container'>
               <li className={`login-tab ${activeTab === 'sign-up' ? 'login-tab-active' : ''}`}
                    onClick={() => setActiveTab('sign-up')}>Регистрация</li>
               <li className={`login-tab ${activeTab === 'sign-in' ? 'login-tab-active' : ''}`}
                    onClick={() => setActiveTab('sign-in')}>Вход</li>
            </ul>
            {activeTab === 'sign-up' ? <SignUp /> : <SignIn />}
        </div>
    )
}