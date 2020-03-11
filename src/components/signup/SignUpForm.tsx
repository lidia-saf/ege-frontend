import * as React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { authContext } from '../../contexts/AuthContext';
import { ErrorMessage } from '../../common/errormessage/ErrorMessage';
import { useErrorHandler } from '../../utils/customhooks/ErrotHandler';
import * as auth from '../../utils/auth';
import { validateForm } from './helpers';

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
        <div className='signup-container'>
            <Form className='signup-form' onSubmit={e => onFormSubmit(e)}>
                <FormGroup>
                    <Label for='email'>Адрес электронной почты:</Label>
                    <Input
                        type='email'
                        name='email'
                        value={email}
                        id='email'
                        placeholder='youremail@mailprovider.com'
                        onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Введите пароль:</Label>
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        id='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='passwordRetype'>Повторите пароль:</Label>
                    <Input
                        type='password'
                        name='passwordRetype'
                        value={passwordRetype}
                        id='passwordRetype'
                        onChange={e => setPasswordRetype(e.target.value)}
                    />
                </FormGroup>
                <br/>
                <FormGroup>
                    <Button type='submit' block={true}>
                        {loading ? 'Идет загрузка...' : 'Создать аккаунт'}
                    </Button>
                </FormGroup>
                {error && <ErrorMessage errorMessage={error} />}
            </Form>
        </div>
    )
};
