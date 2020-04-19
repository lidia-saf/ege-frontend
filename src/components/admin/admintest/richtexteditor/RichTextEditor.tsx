import * as React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IRichTextEditor {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export const RichTextEditor: React.FC<IRichTextEditor> = ({ text, setText }) => {

    return (
        <ReactQuill
            value={text}
            onChange={(value: string) => {setText(value)}}
        />
    )
}