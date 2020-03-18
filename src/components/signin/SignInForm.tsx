import * as React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { authContext } from '../../contexts/AuthContext';
import { ErrorMessage } from '../../common/errormessage/ErrorMessage';
import { useErrorHandler } from '../../utils/customhooks/ErrotHandler';
import * as auth from '../../utils/auth';
import { validateForm } from './helpers';
import { useHistory } from 'react-router-dom';
import '../../styles/index.css';

export const SignInForm: React.FC<{}> = () => {
    const history = useHistory();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { error, showError } = useErrorHandler(null);
    const {
        setUsername,
        setTimestamp,
        setAuthStatus
    } = React.useContext(authContext);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm(email, password, showError)) {
            auth.signIn(
                email,
                password,
                history,
                showError,
                setLoading,
                setUsername,
                setTimestamp,
                setAuthStatus);
        }
    }

    return (
        <>
            <h3>Мы рады видеть тебя снова на <span className='logo-span'>Sdam English</span>!</h3>
            <div className='signin-container general-central-wrapper'>
                <form className='general-form' onSubmit={e => onFormSubmit(e)}>
                    <div className='general-input-wrapper'>
                        <input
                            className='general-input'
                            type='email'
                            name='email'
                            value={email}
                            id='email'
                            placeholder='Электронная почта'
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='general-input-wrapper'>
                        <input
                            className='general-input'
                            type='password'
                            name='password'
                            value={password}
                            placeholder='Введите пароль'
                            id='password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <ErrorMessage errorMessage={error} />}
                    <br/>
                        <Button className='general-button' type='submit' block={true}>
                            {loading ? 'Идет загрузка...' : 'Войти'}
                        </Button>
                </form>
            </div>
        </>
    )
};
