import React from 'react';

import { Card } from './Card';

interface Pokemon {
    name: string;
    url:string;
  }
  
  interface CardListProps {
    pokemons: Pokemon[];
  }
  
export const CardList = (props:CardListProps) => (
    <div className='card-list'>
        {props.pokemons.map(pokemon => (
            <Card key={pokemon.name} pokemon={pokemon}></Card>
        ))}
    </div>
);