import { IQuestion } from '../components/tests/types';

export type UserAuth = {
    userId: string | number;
    idToken: string;
    timestamp?: string | number;
    authenticated: boolean;
    accessToken: string;
};

export type CognitoUser = {
    email: string;
    password: string;
}

export interface IAppState {
    testsReducer: ITestsReducer;
}

export interface ITestsReducer {
    questions: IQuestion[] | [],
    loading: boolean,
    error: null | Error,
    testMaxValue: number
}
