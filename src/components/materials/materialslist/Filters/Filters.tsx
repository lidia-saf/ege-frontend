import * as React from 'react';
import './filters.css';

const applicableFilters = ['past simple', 'present simple', 'gerund', 'nouns', 'adjectives']

export const Filters: React.FC<{}> = () => {
    const [filtersShown, setFiltersShown] = React.useState<boolean>(false);
    return (
        <div className='filters-container'>
            <div className='filters-input'>
                <input className='filters-effect' type='text' placeholder='Что будем учить?' />
                <span className='focus-border'></span>
            </div>
            <div className='filters-checkboxes'>
                {applicableFilters.map((item, indx) => {
                    if (!filtersShown && indx > 2) {
                        return
                    }
                    return (
                        <label key={indx} className='filter-label'>
                            {item}
                            <input type='checkbox' />
                            <span className='filter-checkmark'></span>
                        </label>
                    )
                })}
                <button
                    className='filters-button'
                    onClick={() => setFiltersShown(!filtersShown)}>
                    {!filtersShown ? 'Все фильтры' : 'Скрыть фильтры'}
                </button>
            </div>
        </div>
    )
}