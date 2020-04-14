import * as React from 'react';
import TickIcon from '../../../images/tick_icon.svg';
import CrossIcon from '../../../images/cross_icon.svg';
import SVG from 'react-inlinesvg';
import '../questionPage/questionPage.css';

interface ISubmitCheckButton {
    correct: null | boolean;
    correctTitle?: string;
    incorrectTitle?: string;
    defaultTitle?: string;
}

export const SubmitCheckButton: React.FC<ISubmitCheckButton> = ({
    correct,
    correctTitle = 'Правильный ответ',
    incorrectTitle = 'Неправильный ответ',
    defaultTitle = 'Проверить ответ'
 }) => {
    return (
        <button
        type='submit'
        className={`${correct === null ? 'general-button' :
        !correct ? 'question-wrong-answer' : 'question-right-answer'}`}>
            {correct === null ?
            defaultTitle :
            !correct ?
            (<>
                <SVG src={CrossIcon} />
                {incorrectTitle}
            </>) :
            <>
                <SVG src={TickIcon} />
                {correctTitle}
            </>}
        </button>
    )
}