"use client";
import React, { useEffect, useState } from "react";
import {
  fetchPokemonData,
} from "./ReduxToolkit/Feature/PokemonSlice";
import { useAppDispatch, useAppSelector } from "./ReduxToolkit/hooks";

import { CardList } from './Component/CardList';
import { SearchBox } from './Component/SearchBox';
import { Pagination } from './Component/Pagination';
import LoaderImg from "../../public/loader.gif"
import './styles/common.css'
import { NotFound } from "./Component/NotFound";

type pokemonList = {
  id: string,
  url: string,
  name: string
}

type state = {
  pokemonReducer: {
    loading: boolean;
    pokemonList: never[];
    error: null;
    totalPage: number;
    pokemonData: {};
    pokemonDetails: {
      id: string;
      height: string;
      name: string;
      weight: string;
      base_experience: string;
      abilities: never[];
      types: never[];
    };
    detailsLoading: boolean;
    detailserror: null;
    currentPage: number;
  };
}

export default function Home() {
  const { pokemonList, error, loading, totalPage, currentPage } = useAppSelector((state: state) => state.pokemonReducer);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>('');
  const offset = 12;
  const fileteredPokemons = pokemonList.filter((pokemon: pokemonList) => pokemon.name && (pokemon.name?.toLowerCase().includes(search && search.toLowerCase()) || pokemon.id?.toLowerCase().includes(search && search.toLowerCase()) || ''));

  useEffect(() => {
    dispatch(fetchPokemonData({ page: currentPage, offset }))
  }, [currentPage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <div className="container-auto">
      <div className="header">
        <h1>Pokemon</h1>
        <div className="serach-fildes">
          <SearchBox
            placeholder='Search Pokemon'
            handleChange={handleChange}
          />
        </div>
      </div>

      {
        loading ?
          <div className="loader">
            <img alt="pokemon" src={LoaderImg.src} />
          </div>
          :
          <>
            {search === '' || fileteredPokemons.length > 0 ?
              <>
                <CardList pokemons={fileteredPokemons}></CardList>
                <Pagination page={currentPage} totalPage={totalPage} />
              </>
              :
              <NotFound pokemon={true} />
            }
            {
              error &&
              <h2>{error}</h2>
            }
          </>
      }
    </div>
  );
}

