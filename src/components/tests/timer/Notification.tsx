import * as React from 'react';
import './timer.css';

export const Notification: React.FC<{}> = () => {
    return (
        <div>
            <h3 className='timer-h3'>Мы запускаем таймер - 180 минут, все как в ЕГЭ. Попробуйте решить тест в указанное время</h3>
        </div>
    )
}