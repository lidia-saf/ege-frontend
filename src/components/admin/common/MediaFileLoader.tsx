import * as React from 'react';
import axios from 'axios';
import './admincommon.css';
import '../../../styles/index.css';
import { CDN_URL } from '../../../utils/constants';

interface IMediaFileLoader {
    testNumber: string;
    questionNumber: string;
    setMediaKey: React.Dispatch<React.SetStateAction<any>>;
}

export const MediaFileLoader: React.FC<IMediaFileLoader> = ({ testNumber, questionNumber, setMediaKey}) => {
    const [file, setFile] = React.useState<any>(null);
    const [fileUploadResult, setFileUploadResult] = React.useState<null | {[x: string]: any}>(null);
    const [loading, setLoading] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const [mediaType, setMediaType] = React.useState('audio');

    const sendImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('filename', `test/${testNumber}/${questionNumber}`);
            setLoading(true);
            try {
                let result = await axios('/api/media/v1/post', {
                    method: 'post',
                    data: formData,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setLoading(false);
                setFileUploadResult(result);
                setMediaKey(result.data.Key);
            } catch (e) {
                setLoading(false);
                setMediaKey(null);
                setFileUploadResult(e);
            }
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setFile(e.target.files[0]);
        }
    }

    React.useEffect(() => {
        setIsValid(questionNumber.length > 0 && testNumber.length > 0)
    }, [questionNumber, testNumber, loading])

    return (
        <div className='mediauploader'>
            <label htmlFor='media'>Добавь аудиофайл или картинку</label>
            <select id='mediaType' onChange={(e) => setMediaType(e.target.value)}>
                <option value='audio'>Аудиофайл</option>
                <option value='image'>Картинка</option>
            </select>
            <input type='file' name='upload' id='fileUpload' onChange={onChange} />
            {!isValid && <div className='mediaupload-warning'>Добавь номер теста и номер вопроса в форме перед загрузкой медиафайла</div>}
            <button disabled={!isValid} onClick={(e) => sendImage(e)}>Загрузить картинку</button>
            {fileUploadResult && fileUploadResult.status === 200 ?
                <>
                    <label htmlFor='fileLink'></label>
                    <input id='fileLink' type='text' name='fileLink' disabled={true} value={`cdn.sdamenglish.com/${fileUploadResult.data.Key}`}/>
                    {mediaType === 'image' && <img src={`${CDN_URL}/${fileUploadResult.data.Key}`} width='150' />}
                    {mediaType === 'audio' &&
                    <audio controls preload='none'>
                        <source src={`${CDN_URL}/${fileUploadResult.data.Key}`} type='audio/mp4' />
                        <p>Your browser does not support HTML5 audio. Use Chrome, please</p>
                    </audio>}
                </> :
            fileUploadResult ? <div>Произошла ошибка, файл не загрузился</div> : null
            }
            {loading && <div className='mediauploader-loading'>Идет загрузка файла...</div>}
        </div>
    )
}
