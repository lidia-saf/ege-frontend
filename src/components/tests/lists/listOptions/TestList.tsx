import * as React from 'react';
import { useSelector } from 'react-redux';
import '../testslist.css';
import { useApiToExtractMaxTestId } from '../../testshooks/testhooks';
import { Link } from 'react-router-dom';
import { PersonalResult } from '../../personalResult/PersonalResult';
import { IAppState } from '../../../../customtypes';

export const TestList: React.FC<{}> = () => {
    useApiToExtractMaxTestId();
    const maxTestId = useSelector(state => (state as IAppState).testsReducer.testMaxValue);
    const loading = useSelector(state => (state as IAppState).testsReducer.loading);

    return (
        <>
            <ul className='tests-result-list-container'>
                {!loading && (Array(maxTestId).fill('0').map((_, index) => {
                    return (
                        <div key={index} className='tests-results-list-item-container'>
                            <li className='tests-results-list-item'>
                                <Link to={`/tests/${index + 1}`}>
                                    Тренировочный тест ЕГЭ № {index + 1} из банка ФИПИ
                                </Link>
                            </li>
                            <PersonalResult
                                difficulty={'easy'}
                                successResult={{passed: false, score: 0}}
                            />
                        </div>
                    )
                }))}
            </ul>
        </>
    )
}