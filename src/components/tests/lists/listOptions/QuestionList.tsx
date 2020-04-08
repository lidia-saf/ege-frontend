import * as React from 'react';
import { useApiToExtractAllQuestions } from '../../testshooks/testhooks';
import { IQuestion } from '../../types';
import { Link } from 'react-router-dom';
import './questionList.css';
import { sectionTranspiler } from '../../utils/utils';

export const QuestionList: React.FC<{}> = () => {
    const [questions, setQuestions] = React.useState<IQuestion[] | []>([]);
    useApiToExtractAllQuestions(setQuestions, 'questionNumber');

    return (
        <div className='question-result-list-container'>
            {(questions as IQuestion[]).map((item, index) => {
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
                        to={`/tests/question/${item['_id']}`}>
                            Открыть вопрос
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}