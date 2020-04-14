import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IAppState } from 'customtypes';
import { useSelector } from 'react-redux';
import { useApiToGetTestByTestId } from '../testshooks/testhooks';
import { QuestionTemplate } from '../common/QuestionTemplate';
import { IQuestion } from '../types';
import '../questionPage/questionPage.css';
import './testPage.css';
import { useState } from 'react';
import { SubmitCheckButton } from '../common/SubmitCheckButton';
import { Buttons } from '../common/NextPrevButtons';
import { Timer } from '../timer/Timer';

export const TestPage: React.FC<{}> = () => {
    const { testId } = useParams();
    const loading = useSelector(state => (state as IAppState).testsReducer.loading);
    const questions = useSelector(state => (state as IAppState).testsReducer.questions);
    useApiToGetTestByTestId(testId ? testId : '');

    const [score, setScore] = useState(0);
    const [assessing, setAssessing] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAssessing(true);
    }

    return (
        <>
            {!loading ?
            <>
                <Buttons
                    previous={`/tests/${Number.parseInt(testId ? testId : '2', 10) - 1}`}
                    next={`/tests/${Number.parseInt(testId ? testId : '0', 10) + 1}`}
                    prevTitle='Предыдущий тест'
                    nextTitle='Следующий тест'
                />
                <h3 className='test-page-title'>Тренировочный Тест №{testId}</h3>
                <Timer />
                <form onSubmit={e => onSubmit(e)}>
                    <div className='question-page-container'>
                        {(questions as IQuestion[]).map((item, index) => {
                            return (
                                <QuestionTemplate
                                    setAssessing={setAssessing}
                                    assess={assessing}
                                    setScore={setScore}
                                    showSections={false}
                                    key={index}
                                    question={item}
                                />
                            )
                        })}
                    </div>
                    <div className='check-button-wrapper'>
                        <SubmitCheckButton
                            correct={assessing ? score === questions.length : null}
                            correctTitle='Все правильно'
                            incorrectTitle={`Есть ошибки: ${score}/${questions.length}`}
                            defaultTitle='Проверить тест'
                        />
                    </div>
                </form>
            </> :
            <div className='general-loader' />}
        </>
    )
}