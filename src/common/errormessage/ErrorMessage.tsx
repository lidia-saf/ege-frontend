import * as React from 'react';
import './errorMessage.css';

type IErrorMessage = {
    errorMessage: Error | string;
};

export const ErrorMessage: React.FC<IErrorMessage> = ({ errorMessage }) => (
    <p className='error-message'>{errorMessage}</p>
);
