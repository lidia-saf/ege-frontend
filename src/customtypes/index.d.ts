export type UserAuth = {
    userId: string | number;
    idToken: string;
    timestamp?: string | number;
    authenticated: boolean;
};

export type CognitoUser = {
    email: string;
    password: string;
}