import * as validator from 'validator';

export const validateForm = (
    email: string,
    password: string,
    passwordRetype: string,
    setError: (error: string | null) => void
): boolean => {
    // @ts-ignore
    if (!validator.isEmail(email)) {
        setError('Please enter a valid email address');
        return false;
    }

    if (password !== passwordRetype) {
        setError('The passwords you entered don\'t match.');
        return false;
    }

    return true;
}