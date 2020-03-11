import * as React from 'react';
import { Redirect } from 'react-router';
import { authContext } from '../../contexts/AuthContext';
import { SignInForm } from './SignInForm';

export const SignIn: React.FC<{}> = () => {
    return (
        <authContext.Consumer>
            {value =>
                <div>
                    {value.auth.authenticated ? <Redirect to='/' /> : <SignInForm />}
                </div>
            }
        </authContext.Consumer>
    )
}