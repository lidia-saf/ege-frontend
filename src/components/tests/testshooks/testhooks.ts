import React, { useEffect } from 'react';
import axios from 'axios';

const useApiToExtractMaxTestId = (setMaxTestId: React.Dispatch<React.SetStateAction<number>>) => {
    useEffect(() => {
        let isCancelled = false;
        const fetchMaxTestId = async () => {
            try {
                const result = await axios('/api/tests/v1/get/maxtest');
                if (!isCancelled) {
                    setMaxTestId(result.data.maxTestId.value);
                }
            } catch (e) {
                if (!isCancelled) {}
            }
        }

        fetchMaxTestId();
        return () => {
            isCancelled = true;
        }
    }, [])
}

const useApiToExtractAllQuestions = (
    setQuestions: React.Dispatch<React.SetStateAction<any>>,
    sortOption: 'questionNumber' | 'testId') => {
    useEffect(() => {
        let isCancelled = false;
        const fetchQuestions = async () => {
            try {
                const query = `?sort=${sortOption}`;
                const result = await axios(`/api/tests/v1/get${query}`);
                if (!isCancelled) {
                    setQuestions(result.data.hits.hits);
                }
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

const useApiToExtractQuestionById = (
    setQuestion: React.Dispatch<React.SetStateAction<any>>,
    id: string
) => {
    useEffect(() => {
        let isCancelled = false;
        const fetchQuestion = async () => {
            try {
                const result = await axios(`/api/tests/v1/get/question/${id}`);
                console.log(result);
                if (!isCancelled) {
                    setQuestion(result.data.hits.hits[0]);
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
    }, [])
}

export { useApiToExtractMaxTestId,
        useApiToExtractAllQuestions,
        useApiToExtractQuestionById
    }