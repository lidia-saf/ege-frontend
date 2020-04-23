import * as React from 'react';
import AttentionIcon from '../../../images/attention_icon.svg';
import SVG from 'react-inlinesvg';
import '../../../styles/index.css';

export const AnswerFormat: React.FC<{}> = () => (
    <h4 className='test-page-h4'>
        <SVG src={AttentionIcon} />
        Указывайте ответы на вопросы заглавными печатными буквами без пробелов и запятых ('ABCDEF' или 'DONEDID')
    </h4>
);
