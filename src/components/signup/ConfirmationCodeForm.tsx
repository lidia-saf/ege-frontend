import * as React from 'react';
import { Button, Form, Label, FormGroup, Input } from 'reactstrap';
import { authContext } from '../../contexts/AuthContext';
import { ErrorMessage } from '../../common/errormessage/ErrorMessage';
import { useErrorHandler } from '../../utils/customhooks/ErrotHandler';
import * as auth from '../../utils/auth';

export const ConfirmationCodeForm: React.FC<{}> = () => {
    const [loading, setLoading] = React.useState(false);
    const [confirmationCode, setConfirmationCode] = React.useState('');
    const { error, showError } = useErrorHandler(null);
    const {
        userId,
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
                userId,
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
        <Form onSubmit={e => handleSubmit(e)}>
            <FormGroup>
                <Label for='confirmationCode'>Введите код подтверждения</Label>
                <Input
                    type='text'
                    name='confirmationCode'
                    id='confirmationCode'
                    placeholder='Код подтверждения'
                    onChange={e => setConfirmationCode(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Button type='submit' block={true}>
                    {loading ? 'Идет загрузка...' : 'Подтвердить'}
                </Button>
            </FormGroup>
            {error && <ErrorMessage errorMessage={error} />}
        </Form>
        )
    }

    return displayFormOrMessage(userAccountVerified);
}