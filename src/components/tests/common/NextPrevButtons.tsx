import * as React from 'react';
import { Link } from 'react-router-dom';

interface IButtons {
    previous: string;
    next: string;
    prevTitle?: string;
    nextTitle?: string
}

export const Buttons: React.FC<IButtons> = ({
    previous,
    next,
    prevTitle= 'Предыдущий вопрос',
    nextTitle= 'Следующий вопрос'
}) => {

    return (
        <div className='question-buttons-wrap'>
            <Link to={previous} className='question-link'>&laquo; {prevTitle}</Link>
            <Link to={next} className='question-link'>{nextTitle} &raquo;</Link>
        </div>
    )
}
