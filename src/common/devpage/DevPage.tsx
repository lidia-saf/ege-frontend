import * as React from 'react';
import SVG from 'react-inlinesvg';
import DevIcon from '../../images/dev_icon.svg';
import './devpage.css';

export const DevPage: React.FC<{}> = () => {
    return (
        <div className='devpage'>
            <SVG src={DevIcon} />
            <h2>{`<`}Страничка в разработке{`/>`}</h2>
        </div>
    )
}
