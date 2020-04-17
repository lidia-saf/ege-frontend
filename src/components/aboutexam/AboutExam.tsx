import * as React from 'react';
import { Link } from 'react-router-dom';
import './aboutexam.css';

interface IAboutExam {};

const examPart: {[x in TSection]: {name: string, maxValue: string, skills: string[]}} = {
    'reading': {
        name: 'Чтение',
        maxValue: '20',
        skills: [
            'Понимание основного содержания текста',
            'Понимание структурно-смысловых связей в тексте',
            'Полное и точное понимание информации в тексте'
        ]
    },
    'listening': {
        name: 'Аудирование',
        maxValue: '20',
        skills: [
            'Понимание основного содержания прослушиваемого текста',
            'Понимание в прослушанном тексте запрашиваемой информации',
            'Полное понимание прослушанного текста'
        ]
    },
    'writing': {
        name: 'Письмо',
        maxValue: '20',
        skills: [
            'Письмо личного характера',
            'Письменное высказывание с элементами рассуждения по предложенной проблеме'
        ]
    },
    'grammar': {
        name: 'Грамматика и лексика',
        maxValue: '20',
        skills: [
            'Грамматические навыки',
            'Лексико-грамматические навыки'
        ]
    },
    'speaking': {
        name: 'Устная часть',
        maxValue: '20',
        skills: [
            'Чтение вслух',
            'Условный диалог-расспрос',
            'Тематическое монологическое высказывание (описание выбранной фотографии)',
            'Тематическое монологическое высказывание с элементами (сравнение двух рассуждения фотографий)'
        ]
    }
}

type TSection = 'speaking' | 'listening' | 'writing' | 'grammar' | 'reading';

export const AboutExam: React.FC<IAboutExam> = () => {
    const [checked, setChecked] = React.useState(true);
    const [section, setSection] = React.useState<TSection>('listening');

    return (
        <>
            <h2 className='aboutexam-h2'>Сколько дней сдается экзамен по английскому?</h2>
            <p className='aboutexam-baloon'>ЕГЭ по английскому языку проводится в два дня.
                Устная часть экзамена сдается по желанию во второй день.
            </p>
            <h2 className='aboutexam-h2'>Какие части входят в ЕГЭ по английскому?</h2>
            <div className='flower'>
                <input
                    type='checkbox'
                    checked={checked}
                    onClick={() => setChecked(prev => !prev)}
                    className='flower-open'
                    name='flower-open'
                    id='flower-open'
                />
                <label
                className='flower-open-button'
                htmlFor='flower-open'>
                    ЕГЭ<br/>
                    44 задания<br/>
                    3 ч 15 мин
                </label>
                <div className='flower-item flower-green' onClick={() => setSection('listening')}>
                    Аудирование <br/>
                    30 минут<br/>
                    9 заданий
                </div>
                <div className='flower-item flower-red' onClick={() => setSection('reading')}>
                    Чтение <br/>
                    30 минут<br/>
                    9 заданий
                </div>
                <div className='flower-item flower-purple' onClick={() => setSection('writing')}>
                    Письмо <br/>
                    80 минут<br/>
                    2 задания
                </div>
                <div className='flower-item flower-orange' onClick={() => setSection('grammar')}>
                    Грамматика и лексика <br/>
                    40 минут<br/>
                    20 заданий
                </div>
                <div className='flower-item flower-lightblue' onClick={() => setSection('speaking')}>
                    Устная часть <br/>
                    15 минут<br/>
                    4 задания
                </div>
            </div>
            <h2 className='aboutexam-h2'>Кратко о разделе "{examPart[section].name}"</h2>
            <div className='aboutexam-section'>
                <p>Максимальное количество баллов: {examPart[section].maxValue}</p>
                <p>В этом разделе экзаменаторы проверяют:</p>
                <ul className='aboutexam-list'>
                    {examPart[section].skills.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
            <h2 className='aboutexam-h2'>Где можно найти дополнительную информацию о кодификаторе?</h2>
            <p className='aboutexam-baloon'> - На <a href='https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-11' target='_blank'> сайте ФИПИ </a>
                    можно найти спецификацию, кодификатор, демонстрационные варианты.
                    <br /> - На нашем сайте в <Link to='/tests'>разделе "Тесты" </Link>
                    можно прорешать демонстрационную версию экзамена с автоматической проверкой ответов.
            </p>
        </>
    )
};
