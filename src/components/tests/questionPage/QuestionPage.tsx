import * as React from 'react';
import { IQuestion } from '../types';
import { useParams } from 'react-router-dom';
import { useApiToExtractQuestionById } from '../testshooks/testhooks';
import { sectionTranspiler } from '../utils/utils';
import './questionPage.css';
import '../../../styles/index.css';
import TickIcon from '../../../images/tick_icon.svg';
import CrossIcon from '../../../images/cross_icon.svg';
import SVG from 'react-inlinesvg';

const SubmitCheckButton: React.FC<{correct: null | boolean}> = ({ correct }) => {
    return (
        <button
        type='submit'
        className={`${correct === null ? 'general-button' :
        !correct ? 'question-wrong-answer' : 'question-right-answer'}`}>
            {correct === null ?
            'Проверить ответ' :
            !correct ?
            (<>
                <SVG src={CrossIcon} />
                {'Неправильный ответ'}
            </>) :
            <>
                <SVG src={TickIcon} />
                {'Правильный ответ'}
            </>}
        </button>
    )
}

export const QuestionPage: React.FC<{}> = () => {
    const [loading, setLoading] = React.useState(true);
    const [question, setQuestion] = React.useState<IQuestion | null>(null);
    const [answer, setAnswer] = React.useState('');
    const [correct, setCorrect] = React.useState<boolean | null>(null);
    const { id } = useParams()
    useApiToExtractQuestionById(setQuestion, id ? id : '');

    React.useEffect(() => {
        if (question && question.hasOwnProperty('_source')) {
            setLoading(false);
        }
    }, [question])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question) {
            setCorrect(answer === question._source.correctAnswer);
        }
    }

    const onChange = (e: React.ChangeEvent) => {
        setCorrect(null);
        let target = e.target as HTMLInputElement;
        setAnswer(target.value);
    }

    return (
        <>
        {!loading && question ?
            (<div className='question-page-container'>
                <h4 className='question-page-section'>Раздел: {sectionTranspiler[question._source.section]}</h4>
                <div className='question-page-flex-container'>
                    <div className='question-page-number'>{question['_source'].questionNumber}</div>
                    <h5 className='question-page-task'>{question['_source'].task}</h5>
                </div>
                {question['_source'].text &&
                <p className='question-page-text'>{question['_source'].text}</p>}
                <ul className='question-page-possible-answers'>
                    {question['_source'].possibleAnswers.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='general-input-wrapper'>
                        <input
                            className='general-input'
                            onChange={(e) => onChange(e)}
                            placeholder='Запишите ответ в строку...'
                            type='text' />
                    </div>
                    <SubmitCheckButton correct={correct} />
                </form>
            </div>) :
            <div className='general-loader' />}
        </>
    )
}