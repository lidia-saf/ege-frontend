import axios from 'axios';
import {
    FIND_MAX_VALUE_OF_TESTS_STARTED,
    FIND_MAX_VALUE_OF_TESTS_SUCCESS,
    FIND_MAX_VALUE_OF_TESTS_FAILURE
} from '../actionTypes';

const findMaxValueOfTestsSuccess = (data: number) => ({
    type: FIND_MAX_VALUE_OF_TESTS_SUCCESS,
    payload: {
        data
    }
});

const findMaxValueOfTestsStarted = () => ({
    type: FIND_MAX_VALUE_OF_TESTS_STARTED
});

const findMaxValueOfTestsFailure = (error: Error) => ({
    type: FIND_MAX_VALUE_OF_TESTS_FAILURE,
    payload: {
        error
    }
});

export const findMaxValueOfTests = () => {
    return dispatch => {
        dispatch(findMaxValueOfTestsStarted());

        axios('/api/tests/v1/get/maxtest')
        .then(res => {
            dispatch(findMaxValueOfTestsSuccess(res.data.maxTestId.value))
        })
        .catch(err => {
            dispatch(findMaxValueOfTestsFailure(err))
        })
    }
}