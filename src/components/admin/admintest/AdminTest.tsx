import * as React from 'react';
import axios from 'axios';
import './admintest.css';
import { RichTextEditor } from './richtexteditor/RichTextEditor';
import { MediaFileLoader } from '../common/MediaFileLoader';
import { TSection } from 'components/tests/types';
import { useParams } from 'react-router-dom';
import { Admin } from '../Admin';

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
    topic: string;
}

export const AdminTest: React.FC<{}> = () => {
    const { id } = useParams();
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
    const [mediaLink, setMediaLink] = React.useState<null | string>(null);
    const [topic, setTopic] = React.useState<string>('');

    React.useEffect(() => {
        console.log(id);
        let isCancelled = false;
        const fetchQuestion = async () => {
            try {
                let result = await axios.get(`/api/tests/v1/get/question/${id}`);
                const {_source: item} = result.data;
                setQuestionNumber(item.questionNumber);
                setTestId(item.testId);
                setSection(item.section);
                setQuestionDescription(item.questionDescription);
                setTask(item.task);
                setText(item.text);
                setPossibleAnswers(item.possibleAnswers);
                setCorrectAnswer(item.correctAnswer);
                setMediaKey(item.mediaKey);
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        }
        if (!isCancelled && id) {
            fetchQuestion();
        }
        return () => {
            isCancelled = true;
        }
    }, [])

    async function onSubmit (e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        let data: IAddQuestionData = {
            questionNumber,
            testId,
            section,
            questionDescription,
            task,
            text,
            possibleAnswers,
            correctAnswer,
            topic
        }

        if (mediaKey !== null) {
            data['mediaKey'] = mediaKey;
        }

        if (mediaLink !== null) {
            data['mediaKey'] = mediaLink.replace('cdn.sdamenglish.com/', '');
        }

        try {
            const method = id ? 'put' : 'post';
            const url = id ? `/api/tests/v1/put/question/${id}` : `/api/tests/v1/post`;
            await axios(url, {
                method,
                data,
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
        <>
            <Admin />
            <div className='admin-test'>
                {id ? <h2><b>Редактируем вопрос c id:</b> {id}</h2> :
                <h2>Добавить новый вопрос</h2>}
                <form className='admin-form' onSubmit={onSubmit}>
                    <label htmlFor='testId'>Номер теста для вопроса</label>
                    <input id='testId' type='number' value={testId} onChange={(e) => setTestId(e.currentTarget.value)}/>
                    <label htmlFor='section'>Выбери название раздела ЕГЭ вопроса</label>
                    <select id='section' value={section} onChange={(e) => setSection(e.currentTarget.value as TSection)}>
                        <option value='listening'>Аудирование</option>
                        <option value='writing'>Письмо</option>
                        <option value='reading'>Чтение</option>
                        <option value='speaking'>Устная часть</option>
                        <option value='grammar'>Грамматика и лексика</option>
                    </select>
                    <label htmlFor='questionNumber'>Номер вопроса как в тесте ЕГЭ (только цифра без буквы)</label>
                    <input id='questionNumber' value={questionNumber} type='number' min={1} max={44} onChange={(e) => setQuestionNumber(e.currentTarget.value)} />
                    <label htmlFor='topic'>Тема вопроса</label>
                    <input id='topic' value={topic} type='text' onChange={e => setTopic(e.currentTarget.value)} />
                    <label htmlFor='questionDescription'>Описание задания (например,
                    "Вы услышите интервью. В заданиях 3–9 запишите в поле ответа цифру 1, 2 или 3,
                    соответствующую выбранному Вами варианту ответа. Вы услышите запись дважды.") - то,
                    что в экзамене в прямоугольнике</label>
                    <input id='questionDescription' value={questionDescription} type='text' onChange={(e) => setQuestionDescription(e.currentTarget.value)} />
                    <label htmlFor='task'>Задание</label>
                    <input id='task' value={task} type='text' onChange={(e) => setTask(e.currentTarget.value)} />
                    <MediaFileLoader
                        testNumber={testId}
                        questionNumber={questionNumber}
                        setMediaKey={setMediaKey}
                    />
                    <label htmlFor='mediaLink'>Если файл уже загружен и есть ссылка на него, добавь ее сюда без http или https (например, cdn.sdamenglish.com/test/3/2.test3task2.mp3):</label>
                    <input id='mediaLink' value={mediaLink ? mediaLink : ''} type='text' onChange={e => setMediaLink(e.currentTarget.value)} />
                    <label htmlFor='text'>Текст</label>
                    <RichTextEditor text={text} setText={setText} />
                    <label htmlFor='possibleAnswers'>Добавь варианты ответов (списком в столбик с соответствующими буквами, цифрами в редакторе)</label>
                    <RichTextEditor text={possibleAnswers} setText={setPossibleAnswers} />
                    <label htmlFor='correctAnswer'>Запиши правильный ответ последовательностью символов без запятых, пробелов и других знаков - ABCDEG или 1234567</label>
                    <input id='correctAnswer' value={correctAnswer} type='text' onChange={(e) => setCorrectAnswer(e.currentTarget.value)}/>
                    <div className='admin-test-button-wrapper'>
                        <button className='general-button' type='submit'>{loading ? 'Загружаем' : !result ? 'Отправить' : result}</button>
                    </div>
                </form>
            </div>
        </>
    )
}
