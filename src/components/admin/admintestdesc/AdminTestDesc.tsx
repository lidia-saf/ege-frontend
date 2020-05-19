import * as React from 'react';
import '../admintest/admintest.css';
import '../../../styles/index.css';
import axios from 'axios';
import { Admin } from '../Admin';

export const AdminTestDesc: React.FC<{}> = () => {
    const [count, setCount] = React.useState(1);
    const [tag, setTag] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState('');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [descInput, dispatchDescInput] = React.useReducer(
        (state: any, newState: any) => ({...state, ...newState}),
        {}
    );

    const setTagToReducer = () => {
        if (tag !== '') {
            if (!descInput['tags']) {
                dispatchDescInput({'tags': [tag]})
            } else {
                let val = descInput['tags'].slice();
                val.push(tag);
                dispatchDescInput({'tags': val});
            }
            setTag('');
        }
    }

    const checkInputs = () => {
        const { testId, name, type, time, tags } = descInput;

        if (!testId || !name || !type || !time || !tags) {
            setError(true);
            setErrorMessage('Заполни, пожалуйста, все поля формы')
            return false;
        } else {
            setError(false);
            setErrorMessage('');
            return true;
        }
    }

    async function onSubmitButton (e: React.FormEvent) {
        e.preventDefault();
        setTagToReducer();
        const url = `/api/testsdesc`;
        if (!checkInputs()) {return}
        const { testId, name, type, time, tags } = descInput;
        let data = {
            testId,
            name,
            type,
            time,
            tags
        }
        setLoading(true);
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

    const onAddTag = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setTagToReducer()
        setCount(count + 1);
    }

    const onInputChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        dispatchDescInput({[e.currentTarget.id]: e.currentTarget.value})
    }

    const onTagChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTag(e.currentTarget.value);
    }

    return (
        <>
            <Admin />
            <div className='admin-test'>
                <h2>Добавить новое описание теста</h2>
                <form className='admin-form' onSubmit={onSubmitButton}>
                    <label htmlFor='testId'>Номер теста</label>
                    <input name='testId' id='testId' type='text' onChange={(e) => onInputChange(e)}/>
                    <label htmlFor='name'>Название теста</label>
                    <input name='name' id='name' type='text' onChange={(e) => onInputChange(e)} />
                    <label htmlFor='type'>Тип теста</label>
                    <select name='type' id='type' onChange={(e) => onInputChange(e)}>
                        <option value='exam'>ЕГЭ</option>
                        <option value='material'>Материал</option>
                    </select>
                    <label htmlFor={'time'}>Время выполнения в минутах</label>
                    <input type='number' id={'time'} name='time' onChange={(e) => onInputChange(e)}/>
                    {Array(count).fill(0).map((_, index) => {
                        return (
                            <div key={index}>
                                <label htmlFor={`${index}`}>Тег</label>
                                <input id={`${index}`} type='text' name='tags' onChange={(e) => onTagChange(e)} />
                            </div>
                        )
                    })}
                    <button className='admin-testdesc-button' onClick={onAddTag}>Добавить еще один тег</button>
                    {error && <div className='admin-testdesc-error'>{errorMessage}</div>}
                    <button className='general-button' type='submit'>
                        {loading ? 'Идет загрузка' :
                        error ? 'Есть ошибка' :
                        result !== '' ? result :
                        'Отправить описание'}
                    </button>
                </form>
            </div>
        </>
    )
}