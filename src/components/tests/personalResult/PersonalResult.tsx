import * as React from 'react';
import './personalResult.css';
import SVG from 'react-inlinesvg';
import TypeIcon from '../../../images/type_icon.svg';
import StopwatchIcon from '../../../images/stopwatch_icon.svg';

interface IPersonalResult {
    time: number;
    type: 'exam' | 'material';
}

const types = {
    'exam': 'ЕГЭ',
    'material': 'Материал'
}

export const PersonalResult: React.FC<IPersonalResult> = ({ type, time }) => {

    return (
        <div className='personal-result-container'>
            <div className='personal-result-test-type'>
                <SVG src={TypeIcon} /> {types[type]}
            </div>
            <div className='personal-result-test-type'>
                <SVG src={StopwatchIcon} /> {time + ' мин'}
            </div>
        </div>
    )
}