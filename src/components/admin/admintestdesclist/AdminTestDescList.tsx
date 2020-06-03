import * as React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useApiToExtractTestDescriptions } from '../../../components/tests/testshooks/testhooks';
import { IAppState } from '../../../customtypes';
import { useState } from 'react';
import { Admin } from '../Admin';
import { ITestDescription } from 'components/tests/types';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import EditIcon from '../../../images/edit_icon.svg';
import DeleteIcon from '../../../images/delete_icon.svg';

export const AdminTestDescList = () => {
    const loading = useSelector(state => (state as IAppState).testDescriptionsReducer.loading);
    const descriptions = useSelector(state => (state as IAppState).testDescriptionsReducer.testDescriptions);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useApiToExtractTestDescriptions();

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
                    <p className='admin-testlist-questionId'>ID описания</p>
                    <p className='admin-testlist-number'>№ теста</p>
                    <p className='admin-testlist-name'>Название теста</p>
                    <p className='admin-testlist-type'>Тип задания</p>
                    <p className='admin-testlist-number'>Время (мин)</p>
                    <p className='admin-testlist-section'>Теги</p>
                    <p className='admin-testlist-action-column'>Действиe</p>
                </li>
                {!loading ? descriptions.length > 0 ? (descriptions as ITestDescription[]).map((item, index) => {
                    return (
                            <li className='admin-testlist-list-item' key={index}>
                                <p className='admin-testlist-questionId'>{item._id}</p>
                                <p className='admin-testlist-number'>{item['_source'].testId}</p>
                                <p className='admin-testlist-name'>{item['_source'].name}</p>
                                <p className='admin-testlist-type'>{item['_source'].type}</p>
                                <p className='admin-testlist-number'>{item['_source'].time}</p>
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