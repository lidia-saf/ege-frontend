import * as React from 'react';
import { UserAuth } from '../customtypes';
import { useAuthHandler } from '../utils/customhooks/AuthHandler';
import { DEFAULT_USER_AUTH } from '../utils/constants';
import { getStoredUserAuth } from '../utils/auth';

interface IAuthContextInterface {
    confirmationCodeModal: boolean;
    openConfirmationCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
    auth: UserAuth;
    username: string;
    userId: string;
    userTimestamp: number;
    userAccountVerified: boolean;
    setTimestamp: React.Dispatch<React.SetStateAction<number>>;
    setUserAccountVerified: React.Dispatch<React.SetStateAction<boolean>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    setAuthStatus: (userAuth: UserAuth) => void;
    setUnauthStatus: () => void;
}

export const authContext = React.createContext<IAuthContextInterface>({
    confirmationCodeModal: false,
    auth: DEFAULT_USER_AUTH,
    userTimestamp: 0,
    userId: '',
    username: '',
    userAccountVerified: false,
    setTimestamp: () => {},
    setUserAccountVerified: () => {},
    setUsername: () => {},
    setUserId: () => {},
    setAuthStatus: () => {},
    setUnauthStatus: () => {},
    openConfirmationCodeModal: () => {}
});

const { Provider } = authContext;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [userTimestamp, setTimestamp] = React.useState(0);
    const [userId, setUserId] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [confirmationCodeModal, openConfirmationCodeModal] = React.useState(false);
    const [userAccountVerified, setUserAccountVerified] = React.useState(false);
    const { auth, setAuthStatus, setUnauthStatus } = useAuthHandler(getStoredUserAuth());

    return (
        <Provider
            value={{
                confirmationCodeModal,
                openConfirmationCodeModal,
                auth,
                setAuthStatus,
                setUnauthStatus,
                username,
                userAccountVerified,
                setUserAccountVerified,
                setUsername,
                userId,
                setUserId,
                userTimestamp,
                setTimestamp
            }}
            >
                {children}
            </Provider>
    )
}

export default AuthProvider;
