import * as React from 'react';
import { IFilterOption } from '../Tests';
import './testslist.css';
import { TestList } from './listOptions/TestList';
import { QuestionList } from './listOptions/QuestionList';

interface IResultsList {
    filterOption: IFilterOption;
}

const listOptions: {[x: string]: React.FC} = {
    'test': TestList,
    'question': QuestionList,
    'section': TestList,
    'material': TestList
}

export const ResultsList: React.FC<IResultsList> = ({ filterOption }) => {
    let Comp = listOptions[filterOption];

    return <Comp />;
}