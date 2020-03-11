import * as validator from 'validator';

export const validateForm = (
    email: string,
    password: string,
    setError: (error: string | null) => void
): boolean => {
    // @ts-ignore
    if (!validator.isEmail(email)) {
        setError('Пожалуйста, введите корректный адрес электронной почты');
        return false;
    }

    if (!password) {
        setError('Пожалуйста, введите корректный пароль');
        return false;
    }

    return true;
}