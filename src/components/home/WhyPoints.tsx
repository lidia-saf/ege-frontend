import * as React from 'react';
import './home.css';
import SVG from 'react-inlinesvg';
import '../../styles/index.css';

import BookIcon from '../../images/book_icon.svg';
import ListenIcon from '../../images/listen_icon.svg';
import TestIcon from '../../images/test_icon.svg';

const points = [
    {
        text: 'учить материалы, созданные преподавателем с опытом подготовки к ЕГЭ и IELTS, в настоящее время преподающим в США',
        explanationRequired: true,
        icon: BookIcon
    },
    {
        text: 'слушать записи аудирования, сделанные с участием носителей языка',
        explanationRequired: false,
        icon: ListenIcon
    },
    {
        text: 'проходить авторские тесты на все разделы ЕГЭ в соответствии с требованиями ФИПИ',
        explanationRequired: false,
        icon: TestIcon
    }

]

export const WhyPoints: React.FC<{}> = () => {
    return (
        <div className='home-points-container'>
            <h3 className='home-points-heading'>С <span className='logo-span'>Sdam English</span> вы сможете</h3>
            <ul className='home-points-list'>
                {points.map((item, index) => {
                    return (
                    <li className='home-points-listitem' key={index}>
                        <div className='home-points-svg-container'>
                            <SVG src={item.icon} />
                        </div>
                        <p>{item.text}{item.explanationRequired ? <sup>*</sup> : ''}</p>
                    </li>)
                })}
            </ul>

        </div>
    )
}