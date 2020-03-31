import * as React from 'react';
import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    CognitoUserSession,
    ISignUpResult
} from 'amazon-cognito-identity-js';
import moment from 'moment';

import { USER_AUTH_KEY } from './localstorage';
import { DEFAULT_USER_AUTH } from './constants';
import * as CustomTypes from '../customtypes'

const POOL_DATA = {
    UserPoolId: process.env.EGE_FRONTEND_COGNITO_USER_POOL_ID,
    ClientId: process.env.EGE_FRONTEND_COGNITO_CLIENT_ID
};

// @ts-ignore
export const userPool = new CognitoUserPool(POOL_DATA);

export const signUp = (
    email: string,
    password: string,
    setError: (error: string | null) => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setUserId: React.Dispatch<React.SetStateAction<string>>,
    setTimestamp: React.Dispatch<React.SetStateAction<number>>,
    openConfirmationCodeModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);
    const userTimestamp = moment().unix();
    const stringUserTimestamp = userTimestamp.toString();

    const user: CustomTypes.CognitoUser = {
        email,
        password
    };

    const attributesToBeAdded = [
        {
            Name: 'email',
            Value: user.email
        }
    ];

    const attrList: Array<CognitoUserAttribute> =
    attributesToBeAdded.map(
        attr => {
            return new CognitoUserAttribute(attr);
        }
    );

    userPool.signUp(user.email, user.password, attrList, [], (err: Error | undefined, result: ISignUpResult) => {
        if (err) {
            setLoading(false);
            setError(err.message);
            return;
        }
        setLoading(false);
        if (result && result.user) {
            setUsername(user.email);
            setUserId(result.userSub);
            setTimestamp(+stringUserTimestamp);
            openConfirmationCodeModal(true);
        }
    });
    return;
}

export const confirmUser = (
    username: string,
    code: string,
    setError: (errorMessage: string | null) => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setUserAccountVerified: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
            setLoading(false);
            setError(err.message);
        }

        if (result === 'SUCCESS') {
            setLoading(false);
            setUserAccountVerified(true);
        } else {
            setLoading(false);
            setError('There was a problem confirming the user.');
        }
    })
}

export const signIn = (
    email: string,
    password: string,
    history: History | any,
    setError: (error: string | null) => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setTimestamp: React.Dispatch<React.SetStateAction<number>>,
    setAuthStatus: (userAuth: CustomTypes.UserAuth) => void
) => {
    setLoading(true);

    const authData = {
        Username: email,
        Password: password
    };

    const authDetails = new AuthenticationDetails(authData);
    const userData = {
        Username: email,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authDetails, {
        onSuccess(result: CognitoUserSession | any) {
            setLoading(false);
            setUsername(email);
            setTimestamp(+result.idToken.payload['custom:timestamp'] ||
            0);
            setAuthStatus({
                userId: result.idToken.payload.sub,
                idToken: result.idToken.jwtToken,
                timestamp: +result.idToken.payload['custom:timestamp'] || 0,
                authenticated: true
            });
            history.push('/');
        },
        onFailure(err) {
            setLoading(false);
            setError(err.message);
        }
    });
    return;
}

export const signOut = (
    email: string,
    setAuthStatus: (userAuth: CustomTypes.UserAuth) => void,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setTimestamp: React.Dispatch<React.SetStateAction<number>>
) => {
    const userData = {
        Username: email,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut();
    setAuthStatus({
        userId: '',
        idToken: '',
        timestamp: 0,
        authenticated: false
    });
    setUsername('');
    setTimestamp(0);
}

export const getStoredUserAuth = (): CustomTypes.UserAuth => {
    const auth = window.localStorage.getItem(USER_AUTH_KEY);
    if (auth) {
        return JSON.parse(auth);
    }

    return DEFAULT_USER_AUTH;
};
