import axios from 'axios';
import {
    FETCH_TEST_BY_TESTID_STARTED,
    FETCH_TEST_BY_TESTID_FAILURE,
    FETCH_TEST_BY_TESTID_SUCCESS
} from '../actionTypes';
import { IQuestion } from '../../components/tests/types';

const fetchTestSuccess = (data: IQuestion[]) => ({
    type: FETCH_TEST_BY_TESTID_SUCCESS,
    payload: {
        data
    }
});

const fetchTestStarted = () => ({
    type: FETCH_TEST_BY_TESTID_STARTED
});

const fetchTestFailure = (error: Error) => ({
    type: FETCH_TEST_BY_TESTID_FAILURE,
    payload: {
        error
    }
});

export const fetchTest = (id: string) => {
    return dispatch => {
        dispatch(fetchTestStarted());

        axios(`/api/tests/v1/get/tests/${id}`)
        .then(res => {
            dispatch(fetchTestSuccess(res.data.hits.hits))
        })
        .catch(err => {
            dispatch(fetchTestFailure(err))
        })
    }
}
