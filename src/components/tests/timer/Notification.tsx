import * as React from 'react';
import './timer.css';

export const Notification: React.FC<{}> = () => {
    return (
        <div>
            <h3 className='timer-h3'>Мы запускаем таймер. Жми на крестик &#9757;&#65039;, чтобы начать!</h3>
        </div>
    )
}