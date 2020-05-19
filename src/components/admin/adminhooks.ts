import axios from 'axios';
import { ISource } from '../../components/tests/types';
import React from 'react';

const useApiToPutQuestionById = (
    questionId: string,
    data: ISource) => {
    React.useEffect(() => {
        let isCancelled = false;
        const putQuestion = async () => {
            try {
                let result = await axios.put(`/api/tests/v1/put/question/${questionId}`, data);
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        }
        if (!isCancelled) {
            putQuestion();
        }
        return () => {
            isCancelled = true;
        }
    });
}

export {
    useApiToPutQuestionById
};