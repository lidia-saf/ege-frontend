import * as React from 'react';
import Select, { Styles } from 'react-select';
import './searchbar.css';
import '../../../styles/index.css';
import SearchIcon from '../../../images/search_icon.svg';
import SVG from 'react-inlinesvg';
import { Props } from 'react-select/src/styles';
import { IFilterOption } from '../Tests';

interface ISearchBar {
    setFilterOption: React.Dispatch<React.SetStateAction<IFilterOption>>;
}

const options = [
    { value: 'question', label: 'Вопрос' },
    { value: 'test', label: 'Тест' },
    { value: 'section', label: 'Раздел' },
    { value: 'material', label: 'Тема' }
]

const selectStyles = {
    control: (styles: Partial<Styles>, { isFocused }: Props) => ({ ...styles,
        backgroundColor: 'white',
        height: '50px',
        width: '300px',
        boxShadow: '0 0 0 1px hsl(0,0%,80%)',
        borderColor: isFocused ? '#4754a1' : 'hsl(0,0%,80%)',
        '&:hover': {
            borderColor: '#4754a1',
            boxShadow: '0 0 0 1px #4754a1'
        }
    }),
    selectContainer: (styles: Partial<Styles>) => ({
        ...styles,
        cursor: 'pointer'
    }),
    option: (styles: Partial<Styles>, { data, isDisabled, isFocused, isSelected }: Props) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? 'white'
          : isFocused
          ? 'white'
          : null,
        color: isDisabled
          ? '#ccc'
          : '#4754a1',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
          ...styles[':active'],
          backgroundColor: 'white'
        }
      };
    },
    input: (styles: Partial<Styles>) => ({ ...styles
    }),
    placeholder: (styles: Partial<Styles>) => ({ ...styles}),
    singleValue: (styles: Partial<Styles>) => ({ ...styles})
  };

export const SearchBar: React.FC<ISearchBar> = ({ setFilterOption }) => {
    const onSelectChange = (option) => {
        setFilterOption(option.value);
    }

    return (
        <>
            <form className='search-form-container'>
                <input
                    type='text'
                    className='search-bar-input'
                    id='search-bar'
                    placeholder='Поиск...'
                />
                <Select
                    options={options}
                    placeholder='Фильтр'
                    styles={selectStyles}
                    onChange={onSelectChange}
                />
                <button className='search-button'>
                    <SVG src={SearchIcon} />
                </button>
            </form>

        </>
    )
}