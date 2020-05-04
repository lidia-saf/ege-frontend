import {
    FETCH_ALL_TESTS_DESCRIPTION_STARTED,
    FETCH_ALL_TESTS_DESCRIPTION_SUCCESS,
    FETCH_ALL_TESTS_DESCRIPTION_FAILURE
} from '../actionTypes';
import { ITestsDescriptionReducer } from '../../customtypes/index';

const initialState: ITestsDescriptionReducer = {
    testDescriptions: [],
    loading: false,
    error: null
}

export const testDescriptionsReducer = (state = initialState, action: any) => {
switch (action.type) {
    case FETCH_ALL_TESTS_DESCRIPTION_STARTED:
        return {
            ...state,
            loading: true
        };
    case FETCH_ALL_TESTS_DESCRIPTION_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
            testDescriptions: action.payload.data
        };
    case FETCH_ALL_TESTS_DESCRIPTION_FAILURE:
        return {
            ...state,
            loading: false,
            eror: action.payload.error
        }
    default:
        return state;
    }
};
