import * as React from 'react';
import { IQuestion } from '../types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useApiToGetTestByTestId } from '../testshooks/testhooks';
import { sectionTranspiler } from '../utils/utils';
import './questionPage.css';
import '../../../styles/index.css';
import { IAppState } from '../../../customtypes';
import { Buttons } from '../common/NextPrevButtons';
import { SubmitCheckButton } from '../common/SubmitCheckButton';
import { CDN_URL } from '../../../utils/constants';

export const QuestionPage: React.FC<{}> = () => {
    const { testId, questionNumber } = useParams()
    const loading = useSelector(state => (state as IAppState).testsReducer.loading);
    const questions = useSelector(state => (state as IAppState).testsReducer.questions);
    const [question, setQuestion] = React.useState<IQuestion | null>(null);
    const [answer, setAnswer] = React.useState('');
    const [correct, setCorrect] = React.useState<boolean | null>(null);
    useApiToGetTestByTestId(testId ? testId : '');

    React.useEffect(() => {
        if (questions.length > 0) {
            (questions as IQuestion[]).map((item: IQuestion) => {
                if (item['_source'].questionNumber.toString() === questionNumber) {
                    setQuestion(item);
                }
            });
        }
    }, [questions, testId, questionNumber])

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

    const getNextLink = () => {
        let newTestId = testId;
        let newQuestioNumber = Number.parseInt(questionNumber!, 10) + 1;
        if (newQuestioNumber === 41) {
            newTestId = Number.parseInt(testId, 10) + 1;
            newQuestioNumber = 1;
        }
        return `/tests/${newTestId}/question/${newQuestioNumber}`;
    }

    const getPreviousLink = () => {
        let newTestId =  Number.parseInt(testId!, 10);
        let newQuestioNumber = Number.parseInt(questionNumber!, 10) - 1;
        if (newQuestioNumber === 0) {
            newTestId = - 1;
            newQuestioNumber = 40;
        }
        return `/tests/${newTestId}/question/${newQuestioNumber}`;
    }

    return (
        <>
        {!loading && question ?
            (<>
                <Buttons
                    previous={getPreviousLink()}
                    next={getNextLink()}
                />
                <div className='question-page-container'>
                    <h4 className='question-page-section'>Раздел: {sectionTranspiler[question._source.section]}</h4>
                    <div className='question-page-flex-container'>
                        <div className='question-page-number'>{question['_source'].questionNumber}</div>
                        <h5 className='question-page-task'>{question['_source'].questionDescription}</h5>
                    </div>
                    <h5 className='question-page-task'>{question['_source'].task}</h5>
                    {question['_source'].mediaKey &&
                    question['_source'].section === 'speaking' &&
                    <img src={`${CDN_URL}/${question['_source'].mediaKey}`} className='question-image' />}
                    {question['_source'].mediaKey &&
                    question['_source'].section === 'listening' &&
                    <audio controls preload='none' style={{'width': '480px'}}>
                        <source src={`${CDN_URL}/${question['_source'].mediaKey}`} type='audio/mp4' />
                        <p>Your browser does not support HTML5 audio. Use Chrome, please</p>
                    </audio>}
                    {question['_source'].text &&
                    <p className='question-page-text'>{question['_source'].text}</p>}
                    <ul className='question-page-possible-answers'>
                        <div dangerouslySetInnerHTML={{__html: question['_source'].possibleAnswers}}></div>
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
                </div>
            </>) :
            <div className='general-loader' />}
        </>
    )
}