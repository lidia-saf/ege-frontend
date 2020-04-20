import * as React from 'react';
import { IQuestion } from '../types';
import { sectionTranspiler } from '../utils/utils';
import { useState } from 'react';

import TickIcon from '../../../images/tick_icon.svg';
import CrossIcon from '../../../images/cross_icon.svg';
import './testsCommon.css';
import SVG from 'react-inlinesvg';

interface IQuestionTemplate {
    question: IQuestion,
    showSections: boolean;
    assess: boolean;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setAssessing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICorrectnessMark {
    assess: boolean;
    correct: boolean;
}

const CorrectnessMark: React.FC<ICorrectnessMark> = ({
    assess,
    correct
}) => {

    return (
        <>
        {!assess ?
            null :
            correct ?
            <div className='question-counter-correct'>
                <SVG src={TickIcon} />
            </div> :
            <div className='question-counter-wrong'>
                <SVG src={CrossIcon} />
            </div>}
        </>
    )
}

export const QuestionTemplate: React.FC<IQuestionTemplate> = ({
    question,
    showSections,
    setAssessing,
    assess,
    setScore
}) => {
    const [answer, setAnswer] = useState('');
    const [correct, setCorrect] = useState<null | boolean>(null);
    const isSectionShown = (numb: number) => {
        return numb === 1 || numb === 10 || numb === 19 || numb === 39
    }

    const onChange = (e: React.ChangeEvent) => {
        if (assess) { setAssessing(false)};
        setScore(0);
        let target = e.target as HTMLInputElement;
        setAnswer(target.value);
    }

    React.useEffect(() => {
        if (assess && (answer === question._source.correctAnswer)) {
            setScore(prev => prev + 1);
        }
        setCorrect(answer === question._source.correctAnswer);
    }, [assess])

    return (
        <>
            {showSections && <h4 className='question-page-section'>Раздел: {sectionTranspiler[question._source.section]}</h4>}
            {!showSections &&
            isSectionShown(question['_source'].questionNumber) &&
            <h4 className='question-page-section'>Раздел: {sectionTranspiler[question._source.section]}</h4>}
            <div className='question-page-flex-container'>
                <div className='question-page-number'>{question['_source'].questionNumber}</div>
                <h5 className='question-page-questionDescription'>{question['_source'].questionDescription}</h5>
            </div>
            <h5 className='question-page-task'>{question['_source'].task}</h5>
            {question['_source'].text &&
            <p className='question-page-text'>{question['_source'].text}</p>}
            <div className='question-page-possible-answers' dangerouslySetInnerHTML={{__html: question['_source'].possibleAnswers}}/>
            <div className='question-input-container'>
                <CorrectnessMark assess={assess} correct={correct ? correct : false} />
                <div className={`${!assess ? `general-input-wrapper` : correct ? `question-input-correct` : `question-input-wrong`}`}>
                    <input
                        className='general-input'
                        id={question['_source'].questionNumber.toString()}
                        onChange={(e) => onChange(e)}
                        placeholder='Запишите ответ в строку...'
                        type='text' />
                </div>
            </div>
        </>
    )
}