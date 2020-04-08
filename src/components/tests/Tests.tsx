import * as React from 'react';
import { SearchBar } from './search/SearchBar';
import { ResultsList } from './lists/ResultsList';

interface ITests {};

export type IFilterOption = 'test' | 'question' | 'section' | 'material';

export const Tests: React.FC<ITests> = () => {
    const [filterOption, setFilterOption] = React.useState<IFilterOption>('test');

    return (
        <div>
            <SearchBar
                setFilterOption={setFilterOption}
            />
            <ResultsList
                filterOption={filterOption}
            />
        </div>
    )
}