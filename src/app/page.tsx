"use client";

import React, { useEffect, useState } from "react";
import {
  fetchUserData,
} from "./ReduxToolkit/Feature/PokemonSlice";
import { useAppDispatch, useAppSelector } from "./ReduxToolkit/hooks";

import { CardList } from './Component/CardList';
import { SearchBox } from './Component/SearchBox';
import { Pagination } from './Component/Pagination';
import LoaderImg from "../../public/loader.gif"
import './styles/common.css'
import { NotFound } from "./Component/NotFound";

export default function Home() {
  const { pokemonList, error, loading, totalPage } = useAppSelector((state) => state.pokemonReducer);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const offset = 12;
  const fileteredPokemons = pokemonList.filter(pokemon => pokemon.name && (pokemon.name?.toLowerCase().includes(search && search.toLowerCase()) || pokemon.id?.toLowerCase().includes(search && search.toLowerCase())  || ''));

  useEffect(() => {
    dispatch(fetchUserData({ page, offset }))
  }, [page])

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
          <div className="loaderWrapper">
            <img alt="pokemon" src={LoaderImg.src} />
          </div>
          :
          <>
            {search === '' || fileteredPokemons.length > 0 ?
            <>
              <CardList pokemons={fileteredPokemons}></CardList>
              <Pagination setPage={setPage} page={page} totalPage={totalPage} />
            </>
              :
              <NotFound />
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

