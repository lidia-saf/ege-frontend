import * as React from 'react';
import { CDN_URL } from '../../../utils/constants';
import TickIcon from '../../../images/tick_icon.svg';
import CrossIcon from '../../../images/cross_icon.svg';
import SVG from 'react-inlinesvg';
import './testsCommon.css';

const dontShowText = ['13', '14', '15', '16', '17', '18']
const dontShowAudio = ['4', '5', '6', '7', '8', '9']
const dontShowExplanation = ['4', '5', '6', '7', '8', '9', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23',
    '24', '25', '26', '27', '28', '29', '30', '31',
'33', '34', '35', '36', '37', '38']

const show: {[key: string]: string[]} = {
    'text': dontShowText,
    'audio': dontShowAudio,
    'explanation': dontShowExplanation
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

interface IAnswerGeneralInput {
    assess: boolean;
    correct: boolean | null;
    questionNumber: string;
    onChange: (e: React.ChangeEvent) => void;
}

const AnswerGeneralInput: React.FC<IAnswerGeneralInput> = ({ assess, correct, questionNumber, onChange }) => {
    return (
        <div className='question-input-container'>
            <CorrectnessMark assess={assess} correct={correct ? correct : false} />
            <div className={`${!assess ? `general-input-wrapper` : correct ? `question-input-correct` : `question-input-wrong`}`}>
                <input
                    className='general-input'
                    id={questionNumber}
                    onChange={(e) => onChange(e)}
                    placeholder='Запишите ответ в строку...'
                    type='text' />
            </div>
        </div>
    )
}

const AnswerTextArea: React.FC<IAnswerGeneralInput> = ({ assess, correct, questionNumber, onChange }) => {
    return (
        <div className='question-input-container'>
            <CorrectnessMark assess={assess} correct={correct ? correct : false} />
            <textarea
                className={`${!assess ? `general-textarea` : correct ? `question-textarea-correct` : `question-textarea-wrong`}`}
                id={questionNumber}
                onChange={(e) => onChange(e)}
                placeholder='Запишите ответ в строку...' />
        </div>
    )
}

const showField = (testType: 'exam' | 'material', numb: string, field: 'text' | 'audio' | 'explanation') => {
    if (testType === 'exam') {
        let result = show[field].indexOf(numb)
        return result === -1
    }
    return true;
};

interface IMediaComponent {
    section: string;
    mediaKey: string;
    questionNumber: string;
}

const MediaComponent: React.FC<IMediaComponent> = ({ section, mediaKey, questionNumber }) => {
    return (
        <>
            {section === 'speaking' ?
            <img src={`${CDN_URL}/${mediaKey}`} className='question-image' /> :
            showField('exam', questionNumber, 'audio') &&
            <audio controls preload='none'>
                <source src={`${CDN_URL}/${mediaKey}`} type='audio/mp4' />
                <p>Your browser does not support HTML5 audio. Use Chrome, please</p>
            </audio>}
        </>
    )
}

export {
    MediaComponent,
    CorrectnessMark,
    AnswerGeneralInput,
    AnswerTextArea,
    showField
}