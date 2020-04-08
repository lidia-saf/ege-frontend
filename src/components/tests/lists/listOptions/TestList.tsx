import * as React from 'react';
import '../testslist.css';
import { useApiToExtractMaxTestId } from '../../testshooks/testhooks';
import { Link } from 'react-router-dom';
import { PersonalResult } from '../../personalResult/PersonalResult';

export const TestList: React.FC<{}> = () => {
    const [maxTestId, setMaxTestId] = React.useState<number>(0);
    useApiToExtractMaxTestId(setMaxTestId);

    return (
        <>
            <ul className='tests-result-list-container'>
                {Array(maxTestId).fill('0').map((_, index) => {
                    return (
                        <div key={index} className='tests-results-list-item-container'>
                            <li className='tests-results-list-item'>
                                <Link to={`/tests/test/${index + 1}`}>
                                    Тренировочный тест ЕГЭ № {index + 1} из банка ФИПИ
                                </Link>
                            </li>
                            <PersonalResult
                                difficulty={'easy'}
                                successResult={{passed: false, score: 0}}
                            />
                        </div>
                    )
                })}
            </ul>
        </>
    )
}