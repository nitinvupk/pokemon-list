import React,{ ChangeEvent } from 'react';
interface SearchBoxProps {
    placeholder: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox = ({ placeholder, handleChange }:SearchBoxProps) => (
    <input
        className='search'
        type='search'
        placeholder={placeholder}
        onChange={handleChange}
    />
);

