import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchAllQuestions } from '../../../redux/actions/fetchAllQuestions';
import { findMaxValueOfTests } from '../../../redux/actions/findMaxValueOfTests';
import { IAppState } from '../../../customtypes';
import { fetchTest } from '../../../redux/actions/fetchTest';
import { fetchAllTestsDescription } from '../../../redux/actions/fetchTestDescription';

const useApiToExtractMaxTestId = () => {
    const testMaxValue = useSelector(state => (state as IAppState).testsReducer.testMaxValue);
    const dispatch = useDispatch();

    useEffect(() => {
        let isCancelled = false;

        const fetchMaxTestId = async () => {
            try {
                dispatch(findMaxValueOfTests());
                if (!isCancelled) {
                    // setMaxTestId(result.data.maxTestId.value);
                }
            } catch (e) {
                if (!isCancelled) {}
            }
        }

        if (testMaxValue === 0) {
            fetchMaxTestId();
        }

        return () => {
            isCancelled = true;
        }
    }, [])
}

const useApiToExtractAllQuestions = (
    sortOption: 'questionNumber' | 'testId') => {
    const dispatch = useDispatch();
    const questions = useSelector(state => (state as IAppState).testsReducer.questions);

    useEffect(() => {
        let isCancelled = false;
        const fetchQuestions = async () => {
            try {
                dispatch(fetchAllQuestions(sortOption));
            } catch (e) {
                if (!isCancelled) {}
            }
        }
        fetchQuestions();
        return () => {
            isCancelled = true;
        }
    }, []);
}

const useApiToGetTestByTestId = (
    testId: string
) => {
    const dispatch = useDispatch();
    useEffect(() => {
        let isCancelled = false;
        const fetchQuestion = async () => {
            try {
                dispatch(fetchTest(testId))
                // const result = await axios(`/api/tests/v1/get/tests/${testId}`);
                // console.log(result);
                if (!isCancelled) {
                    // setQuestion(result.data.hits.hits[0]);
                }
            } catch (e) {
                if (!isCancelled) {

                }
            }
        }

        fetchQuestion();
        return () => {
            isCancelled = true;
        }
    }, [testId])
}

const useApiToExtractTestDescriptions = () => {
    const dispatch = useDispatch();
    const testDescriptions = useSelector(state => (state as IAppState).testDescriptionsReducer.testDescriptions);

    useEffect(() => {
        let isCancelled = false;
        const fetchTestDescriptions = async () => {
            try {
                dispatch(fetchAllTestsDescription());
            } catch (e) {
                if (!isCancelled) {}
            }
        }
        if (testDescriptions.length === 0 && !isCancelled) {
            fetchTestDescriptions();
        }
        return () => {
            isCancelled = true;
        }
    }, []);
}

export { useApiToExtractMaxTestId,
        useApiToExtractAllQuestions,
        useApiToGetTestByTestId,
        useApiToExtractTestDescriptions
    }