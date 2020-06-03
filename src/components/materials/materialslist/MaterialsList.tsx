import * as React from 'react';
import { Filters } from './Filters/Filters';
import './materialslist.css';
import { Content } from './content/Content';

export const MaterialsList: React.FC<{}> = () => {
    return (
        <>
            <h3 className='materials-heading'>Learn something new</h3>
            <div className='materials'>
                <Filters />
                <Content />
            </div>
        </>
    )
}