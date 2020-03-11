import * as React from 'react';
import { UserAuth } from '../../customtypes';
import { USER_AUTH_KEY } from '../localstorage';
import { DEFAULT_USER_AUTH } from '../constants';

export const useAuthHandler = (initialState: UserAuth) => {
    const [auth, setAuth] = React.useState(initialState);

    const setAuthStatus = (userAuth: UserAuth) => {
        window.localStorage.setItem(
        USER_AUTH_KEY,
        JSON.stringify(userAuth)
        );
        setAuth(userAuth);
    };

    const setUnauthStatus = () => {
        window.localStorage.clear();
        setAuth(DEFAULT_USER_AUTH);
    }

    return {
        auth,
        setAuthStatus,
        setUnauthStatus
    };
};