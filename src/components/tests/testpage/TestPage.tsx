import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IAppState } from 'customtypes';
import { useSelector } from 'react-redux';
import { useApiToGetTestByTestId, useApiToExtractTestDescriptions } from '../testshooks/testhooks';
import { QuestionTemplate } from '../common/QuestionTemplate';
import { IQuestion } from '../types';
import '../questionPage/questionPage.css';
import './testPage.css';
import { useState } from 'react';
import { SubmitCheckButton } from '../common/SubmitCheckButton';
import { Buttons } from '../common/NextPrevButtons';
import { Timer } from '../timer/Timer';
import { AnswerFormat } from '../common/AnswerFormat';

export const TestPage: React.FC<{}> = () => {
    const { testId } = useParams();
    const loading = useSelector(state => (state as IAppState).testsReducer.loading);
    const descLoading = useSelector(state => (state as IAppState).testDescriptionsReducer.loading);
    const questions = useSelector(state => (state as IAppState).testsReducer.questions);
    useApiToGetTestByTestId(testId ? testId : '');
    useApiToExtractTestDescriptions()
    const testsDescriptions = useSelector(state => (state as IAppState).testDescriptionsReducer.testDescriptions);
    let testData = testsDescriptions.length > 0 ?
        testsDescriptions.filter(item => item._source.testId.toString() === testId)[0] :
        null;

    const [score, setScore] = useState(0);
    const [assessing, setAssessing] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAssessing(true);
    }

    React.useEffect(() => {
        if (testsDescriptions.length !== 0) {
            testData = testsDescriptions.filter(item => item._source.testId.toString() === testId)[0]
        }
    })

    return (
        <>
            {descLoading || loading ?
            <div className='general-loader' /> :
            <>
                <Buttons
                    previous={`/tests/${Number.parseInt(testId ? testId : '2', 10) - 1}`}
                    next={`/tests/${Number.parseInt(testId ? testId : '0', 10) + 1}`}
                    prevTitle='Предыдущий тест'
                    nextTitle='Следующий тест'
                />
                {testData && <h3 className='test-page-title'>{testData._source.name}</h3>}
                {testData && <Timer time={testData._source.time} />}
                <AnswerFormat />
                <form onSubmit={e => onSubmit(e)}>
                    <div className='question-page-container'>
                        {(questions as IQuestion[]).map((item, index) => {
                            return (
                                <QuestionTemplate
                                    setAssessing={setAssessing}
                                    assess={assessing}
                                    setScore={setScore}
                                    showSections={true}
                                    key={index}
                                    question={item}
                                    type={testData ? testData._source.type : 'material'}
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
            </>}
        </>
    )
}