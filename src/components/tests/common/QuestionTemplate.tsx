import * as React from 'react';
import { IQuestion } from '../types';
import { sectionTranspiler } from '../utils/utils';
import { useState } from 'react';

import TickIcon from '../../../images/tick_icon.svg';
import CrossIcon from '../../../images/cross_icon.svg';
import './testsCommon.css';
import SVG from 'react-inlinesvg';
import { CDN_URL } from '../../../utils/constants';

interface IQuestionTemplate {
    question: IQuestion,
    showSections: boolean;
    assess: boolean;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setAssessing: React.Dispatch<React.SetStateAction<boolean>>;
    type: 'exam' | 'material';
}

interface ICorrectnessMark {
    assess: boolean;
    correct: boolean;
}

const dontShowText = ['13', '14', '15', '16', '17', '18']
const dontShowAudio = ['4', '5', '6', '7', '8', '9']
const showSection = ['1', '10', '19', '39'];
const dontShowExplanation = ['4', '5', '6', '7', '8', '9', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23',
    '24', '25', '26', '27', '28', '29', '30', '31',
'33', '34', '35', '36', '37', '38']

const show: {[key: string]: string[]} = {
    'text': dontShowText,
    'audio': dontShowAudio,
    'explanation': dontShowExplanation
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
    setScore,
    type
}) => {
    const [answer, setAnswer] = useState('');
    const [correct, setCorrect] = useState<null | boolean>(null);
    const isSectionShown = (numb: string) => {
        let res = showSection.indexOf(numb);
        return res !== -1;
    }
    const showField = (numb: string, field: 'text' | 'audio' | 'explanation') => {
        if (type === 'exam') {
            let result = show[field].indexOf(numb)
            return result === -1
        }
        return true;
    };

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
            {showSections &&
            isSectionShown(question['_source'].questionNumber.toString()) &&
            <h4 className='question-page-section'>Раздел: {sectionTranspiler[question._source.section]}</h4>}
            <div className='question-page-flex-container'>
                <div className='question-page-number'>{question['_source'].questionNumber}</div>
                {showField(question._source.questionNumber.toString(), 'explanation') && question['_source'].questionDescription.length > 0 && <h5 className='question-page-questionDescription'>{question['_source'].questionDescription}</h5>}
            </div>
            {question['_source'].mediaKey &&
            question['_source'].section === 'speaking' &&
            <img src={`${CDN_URL}/${question['_source'].mediaKey}`} className='question-image' />}
            {question['_source'].mediaKey &&
            question['_source'].section === 'listening' && showField(question['_source'].questionNumber.toString(), 'audio') &&
            <audio controls preload='none'>
                <source src={`${CDN_URL}/${question['_source'].mediaKey}`} type='audio/mp4' />
                <p>Your browser does not support HTML5 audio. Use Chrome, please</p>
            </audio>}
            {question['_source'].text && showField(question['_source'].questionNumber.toString(), 'text') &&
            <p className='question-page-text' dangerouslySetInnerHTML={{__html: question['_source'].text}}/>}
            <h5 className='question-page-task'>{question['_source'].task}</h5>
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