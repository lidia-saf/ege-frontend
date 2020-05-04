import axios from 'axios';
import {
    FETCH_ALL_TESTS_DESCRIPTION_STARTED,
    FETCH_ALL_TESTS_DESCRIPTION_SUCCESS,
    FETCH_ALL_TESTS_DESCRIPTION_FAILURE
} from '../actionTypes';
import { ITestDescription } from '../../components/tests/types';

const fetchAllTestsDescriptionSuccess = (data: ITestDescription[]) => ({
    type: FETCH_ALL_TESTS_DESCRIPTION_SUCCESS,
    payload: {
        data
    }
});

const fetchAllTestsDescriptionStarted = () => ({
    type: FETCH_ALL_TESTS_DESCRIPTION_STARTED
});

const fetchAllTestsDescriptionFailure = (error: Error) => ({
    type: FETCH_ALL_TESTS_DESCRIPTION_FAILURE,
    payload: {
        error
    }
});

export const fetchAllTestsDescription = () => {
    return dispatch => {
        dispatch(fetchAllTestsDescriptionStarted());

        axios(`/api/testsdesc/v1/get/tests`)
        .then(res => {
            let result = JSON.parse(res.data);
            let hits = result.hits.hits.sort((a: ITestDescription, b: ITestDescription) => {
                return a['_source'].testId - b['_source'].testId
            })
            dispatch(fetchAllTestsDescriptionSuccess(hits))
        })
        .catch(err => {
            dispatch(fetchAllTestsDescriptionFailure(err))
        })
    }
}