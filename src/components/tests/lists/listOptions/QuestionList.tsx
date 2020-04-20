import * as React from 'react';
import { useSelector } from 'react-redux';
import { useApiToExtractAllQuestions } from '../../testshooks/testhooks';
import { IQuestion } from '../../types';
import { Link } from 'react-router-dom';
import './questionList.css';
import '../../../../styles/index.css';
import { sectionTranspiler } from '../../utils/utils';
import { IAppState } from '../../../../customtypes';

export const QuestionList: React.FC<{}> = () => {
    const loading = useSelector(state => (state as IAppState).testsReducer.loading);
    const questions = useSelector(state => (state as IAppState).testsReducer.questions);
    useApiToExtractAllQuestions('questionNumber');

    return (
        <div className='question-result-list-container'>
            {!loading ? questions.length > 0 ? (questions as IQuestion[]).map((item, index) => {
                return (
                    <div key={index} className='question-results-list-item-container'>
                        <li className='question-results-list-item'>
                            <h3>
                                Вопрос № {item['_source'].questionNumber} из секции "{sectionTranspiler[item['_source'].section]}"
                            </h3>
                        </li>
                        <p className='question-results-list-item-paragraph'>Задание: {item['_source'].task}..</p>
                        <Link
                        className='question-results-list-item-button'
                        to={`/tests/${item['_source'].testId}/question/${item['_source'].questionNumber}`}>
                            Открыть вопрос
                        </Link>
                    </div>
                )
            }) : <div className='question-result-error'>Извините, что-то пошло не так...</div> :
            <div className='general-loader' />}
        </div>
    )
}