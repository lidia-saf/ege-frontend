import * as React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { authContext } from '../../contexts/AuthContext';
import { ErrorMessage } from '../../common/errormessage/ErrorMessage';
import { useErrorHandler } from '../../utils/customhooks/ErrotHandler';
import * as auth from '../../utils/auth';
import { validateForm } from './helpers';
import { useHistory } from 'react-router-dom'

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
        <div className='signin-container'>
            <Form onSubmit={e => onFormSubmit(e)}>
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
                <br/>
                <FormGroup>
                    <Button type='submit' block={true}>
                        {loading ? 'Идет загрузка...' : 'Войти'}
                    </Button>
                </FormGroup>
                {error && <ErrorMessage errorMessage={error} />}
            </Form>
        </div>
    )
};
