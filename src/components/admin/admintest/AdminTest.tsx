import * as React from 'react';
import axios from 'axios';
import './admintest.css';
import { RichTextEditor } from './richtexteditor/RichTextEditor';
import { MediaFileLoader } from '../common/MediaFileLoader';
import { TSection } from 'components/tests/types';

interface IAddQuestionData {
    questionNumber: string;
    testId: string;
    section: TSection;
    questionDescription: string;
    task: string;
    text: string;
    possibleAnswers: string;
    correctAnswer: string;
    mediaKey?: string;
}

export const AdminTest: React.FC<{}> = () => {
    const [questionNumber, setQuestionNumber] = React.useState('');
    const [testId, setTestId] = React.useState('');
    const [section, setSection] = React.useState<TSection>('listening');
    const [questionDescription, setQuestionDescription] = React.useState('');
    const [task, setTask] = React.useState('');
    const [text, setText] = React.useState('');
    const [possibleAnswers, setPossibleAnswers] = React.useState('');
    const [correctAnswer, setCorrectAnswer] = React.useState('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<null | string>(null);
    const [mediaKey, setMediaKey] = React.useState<null | string>(null);

    async function onSubmit (e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const url = `/api/tests/v1/post`;
        let data: IAddQuestionData = {
            questionNumber,
            testId,
            section,
            questionDescription,
            task,
            text,
            possibleAnswers,
            correctAnswer
        }

        if (mediaKey !== null) {
            data['mediaKey'] = mediaKey;
        }

        try {
            await axios(url, {
                method: 'post',
                data: data,
                withCredentials: true
            });
            setLoading(false);
            setResult('Вопрос создан успешно');
        } catch (err) {
            setLoading(false);
            setResult('Произошла ошибка')
        }
    }

    return (
        <div className='admin-test'>
            <h2>Добавить новый вопрос</h2>
            <form className='admin-form' onSubmit={onSubmit}>
                <label htmlFor='testId'>Номер теста для вопроса</label>
                <input id='testId' type='number' onChange={(e) => setTestId(e.currentTarget.value)}/>
                <label htmlFor='section'>Выбери название раздела ЕГЭ вопроса</label>
                <select id='section' onChange={(e) => setSection(e.currentTarget.value as TSection)}>
                    <option value='listening'>Аудирование</option>
                    <option value='writing'>Письмо</option>
                    <option value='reading'>Чтение</option>
                    <option value='speaking'>Устная часть</option>
                    <option value='grammar'>Грамматика и лексика</option>
                </select>
                <label htmlFor='questionNumber'>Номер вопроса как в тесте ЕГЭ (только цифра без буквы)</label>
                <input id='questionNumber' type='number' min={1} max={44} onChange={(e) => setQuestionNumber(e.currentTarget.value)} />
                <label htmlFor='questionDescription'>Описание задания (например,
                "Вы услышите интервью. В заданиях 3–9 запишите в поле ответа цифру 1, 2 или 3,
                соответствующую выбранному Вами варианту ответа. Вы услышите запись дважды.") - то,
                что в экзамене в прямоугольнике</label>
                <input id='questionDescription' type='text' onChange={(e) => setQuestionDescription(e.currentTarget.value)} />
                <label htmlFor='task'>Задание</label>
                <input id='task' type='text' onChange={(e) => setTask(e.currentTarget.value)} />
                <MediaFileLoader
                    testNumber={testId}
                    questionNumber={questionNumber}
                    setMediaKey={setMediaKey}
                />
                <label htmlFor='text'>Текст</label>
                <RichTextEditor text={text} setText={setText} />
                <label htmlFor='possibleAnswers'>Добавь варианты ответов (списком в столбик с соответствующими буквами, цифрами в редакторе)</label>
                <RichTextEditor text={possibleAnswers} setText={setPossibleAnswers} />
                <label htmlFor='correctAnswer'>Запиши правильный ответ последовательностью символов без запятых, пробелов и других знаков - ABCDEG или 1234567</label>
                <input id='correctAnswer' type='text' onChange={(e) => setCorrectAnswer(e.currentTarget.value)}/>
                <div className='admin-test-button-wrapper'>
                    <button className='general-button' type='submit'>{loading ? 'Загружаем' : !result ? 'Отправить' : result}</button>
                </div>
            </form>
        </div>
    )
}
