import * as React from 'react';
// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';
import './testsCommon.css';
import '../../../styles/index.css';

export const VoiceRecorder: React.FC<{duration: number}> = ({ duration }) => {
    const [isRecording, setIsRecording] = React.useState(false);
    const [blobUrl, setBlobUrl] = React.useState('');
    const [error, setError] = React.useState(false);
    const [mp3Recorder, setMp3Recorder] = React.useState(new MicRecorder({bitRate: 128}));
    const [timer, setTimer] = React.useState<any>(null);
    const [finished, setIsFinished] = React.useState(false);

    const stopRecording = () => {
        mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                setBlobUrl(blobURL)
                setIsRecording(false)
                setIsFinished(true);
            })
            .catch((e: Error) => setError(true));
    }

    const startTimeout = () => {
        if (!timer) {
            const time = setTimeout(() => {
                stopRecording();
            }, duration * 1000);
            setTimer(time);
        } else {
            clearTimeout(timer);
        }
    }

    const startRecording = (e: React.SyntheticEvent) => {
        e.preventDefault();
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then((stream) => {
                mp3Recorder
                    .start()
                    .then(() => {
                        setError(false);
                        setIsRecording(true);
                        setIsFinished(false);
                        startTimeout();
                    }).catch(() => setError(true));
        })
    }

    return (
        <div className='voice-recorder'>
            <p className='voice-recorder-notification'>Нажмите "начать", чтобы записать ответ.
            &nbsp;У вас будет одна попытка и время или как в задании ЕГЭ, или 2 минуты. Вы можете сохранить аудио к себе на устройство или прослушать его.
            &nbsp;Пока что мы не проверяем записанные ответы.</p>
            {!finished && <button className='general-small-button' onClick={startRecording} disabled={isRecording}>Начать</button>}
            {isRecording && <p className='voice-recorder-notification'>Запись началась</p>}
            {finished && <>
                <p className='voice-recorder-notification'>Время вышло</p>
                <a className='general-small-link' href={blobUrl} target='_blank'>Скачать аудиофайл</a>
            </>}
            <audio src={blobUrl} id='player' controls></audio>
        </div>
    )
}