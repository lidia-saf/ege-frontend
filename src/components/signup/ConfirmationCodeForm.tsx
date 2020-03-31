import * as React from 'react';
import { Button, Form } from 'reactstrap';
import { authContext } from '../../contexts/AuthContext';
import { ErrorMessage } from '../../common/errormessage/ErrorMessage';
import { useErrorHandler } from '../../utils/customhooks/ErrotHandler';
import * as auth from '../../utils/auth';

interface IConfirmationCodeForm {
}

export const ConfirmationCodeForm: React.FC<IConfirmationCodeForm> = () => {
    const [loading, setLoading] = React.useState(false);
    const [confirmationCode, setConfirmationCode] = React.useState('');
    const { error, showError } = useErrorHandler(null);
    const {
        username,
        userAccountVerified,
        setUserAccountVerified
    } = React.useContext(authContext);

    const displayFormOrMessage = (
        userAccountVerified: boolean
    ) => {
    if (userAccountVerified) {
        return <div>Ваш аккаунт подтвержден.</div>
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirmationCode) {
            auth.confirmUser(
                username,
                confirmationCode,
                showError,
                setLoading,
                setUserAccountVerified
            );
        } else {
            showError('Поле не может быть пустым.')
        }
    }

    return (
        <Form className='general-form' onSubmit={e => handleSubmit(e)}>
            <div className='general-input-wrapper'>
                <input
                    type='text'
                    className='general-input'
                    name='confirmationCode'
                    id='confirmationCode'
                    placeholder='Введите код подтверждения'
                    onChange={e => setConfirmationCode(e.target.value)}
                />
            </div>
            <Button className='general-button' type='submit' block={true}>
                {loading ? 'Идет загрузка...' : 'Подтвердить'}
            </Button>
            {error && <ErrorMessage errorMessage={error} />}
        </Form>
        )
    }

    return displayFormOrMessage(userAccountVerified);
}