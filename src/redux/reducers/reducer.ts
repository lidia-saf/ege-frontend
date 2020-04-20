import { FETCH_ALL_QUESTIONS_STARTED,
        FETCH_ALL_QUESTIONS_SUCCESS,
        FETCH_ALL_QUESTIONS_FAILURE,
        FIND_MAX_VALUE_OF_TESTS_STARTED,
        FIND_MAX_VALUE_OF_TESTS_SUCCESS,
        FIND_MAX_VALUE_OF_TESTS_FAILURE,
        FETCH_TEST_BY_TESTID_FAILURE,
        FETCH_TEST_BY_TESTID_STARTED,
        FETCH_TEST_BY_TESTID_SUCCESS

    } from '../actionTypes';
import { ITestsReducer } from '../../customtypes/index';

const initialState: ITestsReducer = {
    questions: [],
    loading: false,
    error: null,
    testMaxValue: 0
}

export const testsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_ALL_QUESTIONS_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_ALL_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                questions: action.payload.data
            };
        case FETCH_ALL_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                eror: action.payload.error
            }
        case FIND_MAX_VALUE_OF_TESTS_STARTED:
            return {
                ...state,
                loading: true
            }
        case FIND_MAX_VALUE_OF_TESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                testMaxValue: action.payload.data
            }
        case FIND_MAX_VALUE_OF_TESTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case FETCH_TEST_BY_TESTID_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: action.payload.data
            };
        case FETCH_TEST_BY_TESTID_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_TEST_BY_TESTID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
};
