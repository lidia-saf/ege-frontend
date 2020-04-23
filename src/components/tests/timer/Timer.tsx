import * as React from 'react';
import SVG from 'react-inlinesvg';
import StopwatchIcon from '../../../images/stopwatch_icon.svg';
import PlayIcon from '../../../images/play_icon.svg';
import PauseIcon from '../../../images/pause_icon.svg';
import StopIcon from '../../../images/stop_icon.svg';
import RestartIcon from '../../../images/restart_icon.svg';

import './timer.css';
import { GlobalModal } from '../../../common/modal/Modal';
import { Notification } from './Notification';

export const Timer: React.FC<{}> = () => {
    const [minutes, setMinutes] = React.useState(180);
    const [seconds, setSeconds] = React.useState(0);
    const [open, setOpenModal] = React.useState(false);
    const [start, setStart] = React.useState(false);

    React.useEffect(() => {
        if (start) {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prev => prev - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(prev => prev - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
        }
    }, [seconds, minutes, start])

    React.useEffect(() => {
        setOpenModal(true);
    }, [])

    const onCloseModal = () => {
        setStart(true);
        setOpenModal(prev => !prev);
    }

    return (
        <div className='timer-container'>
            <SVG src={StopwatchIcon} />
            <p className='timer-paragraph'>
                Осталось времени: {minutes < 10 ? `0${minutes}` : minutes} минут {seconds < 10 ? `0${seconds}` : seconds} секунд
            </p>
            <GlobalModal
                title=''
                modalDisplay={<Notification />}
                isOpen={open}
                toggleModal={onCloseModal}
            />
        </div>
    )
}