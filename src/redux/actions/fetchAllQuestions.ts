import axios from 'axios';
import {
    FETCH_ALL_QUESTIONS_STARTED,
    FETCH_ALL_QUESTIONS_FAILURE,
    FETCH_ALL_QUESTIONS_SUCCESS
} from '../actionTypes';
import { IQuestion } from '../../components/tests/types';

const fetchAllQuestionsSuccess = (data: IQuestion[]) => ({
    type: FETCH_ALL_QUESTIONS_SUCCESS,
    payload: {
        data
    }
});

const fetchAllQuestionsStarted = () => ({
    type: FETCH_ALL_QUESTIONS_STARTED
});

const fetchAllQuestionsFailured = (error: Error) => ({
    type: FETCH_ALL_QUESTIONS_FAILURE,
    payload: {
        error
    }
});

export const fetchAllQuestions = (sortOption: 'questionNumber' | 'testId') => {
    return dispatch => {
        dispatch(fetchAllQuestionsStarted());

        const query = `?sort=${sortOption}`;
        axios(`/api/tests/v1/get${query}`)
        .then(res => {
            dispatch(fetchAllQuestionsSuccess(res.data.hits.hits))
        })
        .catch(err => {
            dispatch(fetchAllQuestionsFailured(err))
        })
    }
}