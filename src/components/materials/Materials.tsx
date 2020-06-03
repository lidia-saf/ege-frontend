import * as React from 'react';
import './materials.css'
import { MaterialsList } from './materialslist/MaterialsList';

interface IMaterials {};

export const Materials: React.FC<IMaterials> = () => (
    <>
        <MaterialsList />
    </>
)
