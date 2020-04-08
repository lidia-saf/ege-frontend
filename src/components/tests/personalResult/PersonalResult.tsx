import * as React from 'react';
import './personalResult.css';

interface IPersonalResult {
    difficulty: 'easy' | 'medium' | 'hard';
    successResult: {passed: boolean, score: 0};
}

const difficultyOptions = {
    'easy': {
        title: 'легкий',
        styleClass: 'difficulty-easy'
    },
    'medium': {
        title: 'средний',
        styleClass: 'difficulty-medium'
    },
    'hard': {
        title: 'сложный',
        styleClass: 'difficulty-hard'
    }
}

export const PersonalResult: React.FC<IPersonalResult> = ({ difficulty, successResult }) => {

    return (
        <div className='personal-result-container'>
            <div className={`personal-result-difficulty ${difficultyOptions[difficulty].styleClass}`}>
                {difficultyOptions[difficulty].title}
            </div>
        </div>
    )
}