import * as React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { authContext } from '../../contexts/AuthContext';
import { ErrorMessage } from '../../common/errormessage/ErrorMessage';
import { useErrorHandler } from '../../utils/customhooks/ErrotHandler';
import * as auth from '../../utils/auth';
import { validateForm } from './helpers';
import '../../styles/index.css';

export const SignUpForm: React.FC<{}> = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordRetype, setPasswordRetype] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { error, showError } = useErrorHandler(null);
    const {
        openConfirmationCodeModal,
        setUsername,
        setUserId,
        setTimestamp
    } = React.useContext(authContext);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm(email, password, passwordRetype, showError)) {
            auth.signUp(
                email,
                password,
                showError,
                setLoading,
                setUsername,
                setUserId,
                setTimestamp,
                openConfirmationCodeModal);
        }
    }

    return (
        <>
            <h3>Приветствуем на <span className='logo-span'>Sdam English</span>!</h3>
            <div className='signup-container general-central-wrapper'>
                <form className='general-form' onSubmit={e => onFormSubmit(e)}>
                        <div className='general-input-wrapper'>
                            <input
                            type='email'
                            name='email'
                            value={email}
                            id='email'
                            className='general-input'
                            placeholder='электронная почта'
                            onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='general-input-wrapper'>
                            <input
                                type='password'
                                name='password'
                                value={password}
                                id='password'
                                className='general-input'
                                placeholder='придумайте и введите пароль'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='general-input-wrapper'>
                            <input
                                type='password'
                                name='passwordRetype'
                                value={passwordRetype}
                                id='passwordRetype'
                                className='general-input'
                                placeholder='повторите пароль'
                                onChange={e => setPasswordRetype(e.target.value)}
                            />
                        </div>
                    <br/>
                        {error && <ErrorMessage errorMessage={error} />}
                        <Button className='general-button' type='submit' block={true}>
                            {loading ? 'Идет загрузка...' : 'Создать аккаунт'}
                        </Button>
                </form>
            </div>
        </>
    )
};
