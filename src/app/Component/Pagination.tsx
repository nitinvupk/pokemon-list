import React from 'react';
import { useAppDispatch } from '../ReduxToolkit/hooks';
import { setPageNo } from '../ReduxToolkit/Feature/PokemonSlice';

interface PaginationProps {
    page: number;
    totalPage: number;
}

export const Pagination = (props: PaginationProps) => {
    const dispatch = useAppDispatch();
    const renderPages = () => {
        const arr = []
        for (let i = 0 + props.page; i <= 3 + props.page; i++) {
            arr.push(<button className={props.page === i ? 'active-page' : 'numberBox'} key={i} onClick={() =>  dispatch(setPageNo(i))}>{i + 1}</button>)
        }
        return arr
    }

    return (
        <div className='pagesNumbers'>
            {
                props.page !== 0 &&
                <button onClick={() => dispatch(setPageNo(props.page - 1))} disabled={props.page === 0}>
                    Prev
                </button>
            }
            {renderPages()}
            {props.page !== props.totalPage &&
                <button onClick={() => dispatch(setPageNo(props.page + 1))} disabled={props.totalPage / 12 === props.page}>
                    Next
                </button>
            }
        </div>
    )
};