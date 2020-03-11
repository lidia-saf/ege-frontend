import * as React from 'react';

export const useErrorHandler = (initialState: string | null) => {
    const [error, setError] = React.useState(initialState);
    const showError = (errorMessage: string | null) => {
        setError(errorMessage);
        window.setTimeout(() => {
            setError(null);
        }, 3000);
    };
    return { error, showError };
}