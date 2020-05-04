import * as React from 'react';
import { useSelector } from 'react-redux';
import '../testslist.css';
import { useApiToExtractMaxTestId, useApiToExtractTestDescriptions } from '../../testshooks/testhooks';
import { Link } from 'react-router-dom';
import { PersonalResult } from '../../personalResult/PersonalResult';
import { IAppState } from '../../../../customtypes';
import { ITestDescription } from 'components/tests/types';

export const TestList: React.FC<{}> = () => {
    useApiToExtractMaxTestId();
    useApiToExtractTestDescriptions();
    const loading = useSelector(state => (state as IAppState).testDescriptionsReducer.loading);
    const testsDescriptions = useSelector(state => (state as IAppState).testDescriptionsReducer.testDescriptions);

    return (
        <>
            <ul className='tests-result-list-container'>
                {(!loading && testsDescriptions.length) > 0 ? (testsDescriptions as ITestDescription[]).map((item, index) => {
                    return (
                        <div key={index} className='tests-results-list-item-container'>
                            <li className='tests-results-list-item'>
                                <Link to={`/tests/${item['_source'].testId}`}>
                                    {item['_source'].name}
                                </Link>
                            </li>
                            <PersonalResult
                                type={item['_source'].type}
                                time={item['_source'].time}
                            />
                            <Link className='tests-invisible-link' to={`/tests/${item['_source'].testId}`} />
                        </div>
                    )
                }) :
                <div className='general-loader' />}
            </ul>
        </>
    )
}