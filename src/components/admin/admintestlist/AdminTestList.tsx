import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useApiToExtractAllQuestions } from '../../tests/testshooks/testhooks';
import { IAppState } from '../../../customtypes';
import { IQuestion } from '../../tests/types';
import { sectionTranspiler } from '../../tests/utils/utils';
import { Link } from 'react-router-dom';
import './admintestlist.css';
import SVG from 'react-inlinesvg';
import EditIcon from '../../../images/edit_icon.svg';
import DeleteIcon from '../../../images/delete_icon.svg';
import { Admin } from '../Admin';

export const AdminTestList = () => {
    const loading = useSelector(state => (state as IAppState).testsReducer.loading);
    const questions = useSelector(state => (state as IAppState).testsReducer.questions);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useApiToExtractAllQuestions('testId');

    const onDeleteButtonClick = async (id: string) => {
        try {
            await axios.delete(`/api/tests/v1/delete/${id}`);
            setTimeout(() => {
                setDeleteSuccess(true)}, 3000)
        } catch (e) {
            console.log(e)
            setDeleteSuccess(false)
        }
    }

    return (
        <div className='admin-testlist'>
            <Admin />
            {deleteSuccess && <p className='delete-success'>Вопрос удален, перезагрузите страницу</p>}
            <ul className='admin-testlist-container'>
                <li className='admin-testlist-list-item'>
                    <p className='admin-testlist-questionId'>ID вопроса</p>
                    <p className='admin-testlist-number'>№ теста</p>
                    <p className='admin-testlist-number'>№ вопроса</p>
                    <p className='admin-testlist-section'>Раздел</p>
                    <p className='admin-testlist-task'>Задание</p>
                    <p className='admin-testlist-action-column'>Действиe</p>
                </li>
                {!loading ? questions.length > 0 ? (questions as IQuestion[]).map((item, index) => {
                    return (
                            <li className='admin-testlist-list-item' key={index}>
                                <p className='admin-testlist-questionId'>{item._id}</p>
                                <p className='admin-testlist-number'>{item['_source'].testId}</p>
                                <p className='admin-testlist-number'>{item['_source'].questionNumber}</p>
                                <p className='admin-testlist-section'>{sectionTranspiler[item['_source'].section]}</p>
                                <p className='admin-testlist-task'>{item['_source'].task}</p>
                                <div className='admin-testlist-action-column'>
                                    <Link className='admin-testlist-action' to={`/admin/question/${item._id}`}>
                                        <SVG src={EditIcon} />
                                    </Link>
                                    <button
                                    className='admin-testlist-action admin-testlist-button'
                                    onClick={() => onDeleteButtonClick(item._id)}>
                                        <SVG src={DeleteIcon} />
                                    </button>
                                </div>
                            </li>
                        )
                }) : <div className='question-result-error'>Извините, что-то пошло не так...</div> :
                <div className='general-loader' />}
            </ul>
        </div>
    )
}