import * as React from 'react';
import jwtDecode from 'jwt-decode';
import { getStoredUserAuth } from '../../utils/auth';

export const checkUserRights = (accessToken: string): boolean => {
    let decoded: any = {};
    let result = false;
    try {
        decoded = jwtDecode(accessToken);
        if (decoded['cognito:groups'] && decoded['cognito:groups'].indexOf('AdminGroup') !== -1) {
            result = true;
        }
    } catch (err) {}
    return result;
}

export const useGroupHandler = (setIsUserAdminGroup: React.Dispatch<React.SetStateAction<boolean>>) => {
    React.useEffect(() => {
        let unmounted = false;
        function checkUser() {
            let user = getStoredUserAuth();
            const { accessToken } = user;
            if (accessToken !== '') {
                let isUserAdmin = checkUserRights(accessToken);
                setIsUserAdminGroup(isUserAdmin);
            }
        }
        if (!unmounted) {
            checkUser();
        }
        return () => {unmounted = true};
    }, [])
}
