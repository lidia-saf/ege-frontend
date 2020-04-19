import * as React from 'react';
import { UserAuth } from '../../customtypes';
import { USER_AUTH_KEY } from '../localstorage';
import { DEFAULT_USER_AUTH } from '../constants';
import Cookie from '../cookie';

export const useAuthHandler = (initialState: UserAuth) => {
    const [auth, setAuth] = React.useState(initialState);

    const setAuthStatus = (userAuth: UserAuth) => {
        window.localStorage.setItem(
        USER_AUTH_KEY,
        JSON.stringify(userAuth)
        );
        setAuth(userAuth);
        Cookie.setCookie(USER_AUTH_KEY, JSON.stringify(userAuth), 2);
    };

    const setUnauthStatus = () => {
        window.localStorage.clear();
        setAuth(DEFAULT_USER_AUTH);
        Cookie.setCookie(USER_AUTH_KEY, '', 2);
    }

    return {
        auth,
        setAuthStatus,
        setUnauthStatus
    };
};