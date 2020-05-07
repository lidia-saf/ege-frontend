import * as React from 'react';
import { IQuestion } from '../types';
import { sectionTranspiler } from '../utils/utils';
import { useState } from 'react';
import './testsCommon.css';
import { showField, MediaComponent, AnswerTextArea, AnswerGeneralInput } from './QuestionParts';
import { VoiceRecorder } from './VoiceRecorder';

interface IQuestionTemplate {
    question: IQuestion,
    showSections: boolean;
    assess: boolean;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setAssessing: React.Dispatch<React.SetStateAction<boolean>>;
    type: 'exam' | 'material';
}

const showSection = ['1', '10', '19', '39'];

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
    const questionNumber = question['_source'].questionNumber.toString();
    const { section, mediaKey, text, task, questionDescription, possibleAnswers, time } = question['_source'];

    const isSectionShown = (numb: string) => {
        let res = showSection.indexOf(numb);
        return res !== -1;
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
            {showSections && isSectionShown(questionNumber) &&
            <h4 className='question-page-section'>Раздел: {sectionTranspiler[section]}</h4>}
            <div className='question-page-flex-container'>
                <div className='question-page-number'>{questionNumber}</div>
                {showField(type, questionNumber, 'explanation') && questionDescription.length > 0 &&
                <h5 className='question-page-questionDescription'>{questionDescription}</h5>}
            </div>
            {mediaKey &&
            <MediaComponent
                section={section}
                mediaKey={mediaKey}
                questionNumber={questionNumber}
            />}
            {text && showField(type, questionNumber, 'text') &&
            <p className='question-page-text' dangerouslySetInnerHTML={{__html: text}}/>}
            <h5 className='question-page-task'>{task}</h5>
            <div className='question-page-possible-answers' dangerouslySetInnerHTML={{__html: possibleAnswers}}/>
            {section === 'writing' ?
                <AnswerTextArea
                    assess={assess}
                    correct={correct}
                    onChange={onChange}
                    questionNumber={questionNumber}
                /> : section === 'speaking' ?
                <VoiceRecorder
                    duration={time ? time : 10}
                /> :
                <AnswerGeneralInput
                    assess={assess}
                    correct={correct}
                    onChange={onChange}
                    questionNumber={questionNumber}
                />
            }
        </>
    )
}
