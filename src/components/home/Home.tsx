import * as React from 'react';
import { WhyPoints } from './WhyPoints';
import HomeStudyImage from '../../images/home_image.png';
import './home.css';

export const Home: React.FC<{}> = () => {
    return (
        <>
            <div className='home-block'>
                <img className='home-leading-image' src={HomeStudyImage} alt='ученик' />
                <div className='home-textual-block'>
                    <h3 className='home-heading'>Готовься к ЕГЭ по английскому <br/>и учи английский с нами.</h3>
                    <p className='home-paragraph'>Мы создаем авторские тесты к ЕГЭ и языковые материалы,
                    доступные в любом месте в любое время.
                    </p>
                </div>
            </div>
            <WhyPoints />
        </>
    )
}