import jwtDecode from 'jwt-decode';
import * as CustomTypes from '../customtypes';
import { USER_AUTH_KEY } from './localstorage';
import { DEFAULT_USER_AUTH } from './constants';

export const checkIfTokenIsValid = (
    userAuth: CustomTypes.UserAuth,
    setUnauthStatus: () => void
): boolean => {
    if (!userAuth || !userAuth.idToken) {
        window.localStorage.setItem(
            USER_AUTH_KEY,
            JSON.stringify(DEFAULT_USER_AUTH)
        );

        setUnauthStatus();

        return false;
    }

    try {
        // @ts-ignore
        const decodedJwt: any = jwtDecode(userAuth.idToken);
        if (decodedJwt.exp >= Date.now() / 1000) {
            return true;
        } else {
            window.localStorage.setItem(
                USER_AUTH_KEY,
                JSON.stringify(DEFAULT_USER_AUTH)
            );
            setUnauthStatus();

            return false;
        }
    } catch (e) {
        return false;
    }
}