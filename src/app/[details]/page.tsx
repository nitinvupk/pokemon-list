"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "../ReduxToolkit/hooks";

import { NotFound } from "../Component/NotFound";
import {
  fetchPokemonDetails, setPageNo,
} from "../ReduxToolkit/Feature/PokemonSlice";
import LoaderImg from "../../../public/loader.gif"
import '../styles/common.css'

type abilities = {
  ability: {
    name: string
  }
}

type types = {
  type: {
    name: string
  }
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

const PokemonDetailPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname()
  const { detailserror, detailsLoading, pokemonDetails, currentPage } = useAppSelector((state: state) => state.pokemonReducer);

  useEffect(() => {
    dispatch(fetchPokemonDetails(pathname.slice(1)))
  }, [pathname.slice(1)])

  if (!detailsLoading && pokemonDetails.id === '') {
    return <NotFound pokemon={false} />;
  }

  const handleBack = () => {
    dispatch(setPageNo(currentPage))
    router.push('/')
  }

  return (
    <>
      {detailsLoading ?
        <div className="loaderWrapper">
          <img alt="pokemon" src={LoaderImg.src} />
        </div>
        :
        <div>

          <h1 className="main-head">{pokemonDetails && pokemonDetails.name}</h1>
          <div className="pokemon-image">
            <button className="btn-back" onClick={() => handleBack()}>Back</button>
            <div className="pokemon-img-sec">
              <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${pokemonDetails.name}.jpg`} />
            </div>
            <div className="pokemon-section">
              <div className="pokemon-content">
                <div>
                  <h2>Height</h2>
                  <span>{pokemonDetails.height}</span>
                </div>
                <div>
                  <h2>Weight</h2>
                  <span>{pokemonDetails.weight}</span>
                </div>
                <div>
                  <h2>Category</h2>
                  <span>{pokemonDetails.weight}</span>
                </div>
                <div>
                  <h2>ID</h2>
                  <span>{pokemonDetails.id}</span>
                </div>
                <div>
                  <h2>Base Experience</h2>
                  <span>{pokemonDetails.base_experience}</span>
                </div>
              </div>
              <h2 className="pokemon-head">Abilities</h2>
              <div className="ability-list">
                {pokemonDetails?.abilities.map((ability: abilities) => (
                  <div key={ability?.ability.name}>{ability.ability.name}</div>
                ))}
              </div>
              <h2 className="pokemon-head">Types</h2>
              <div className="ability-list">
                {pokemonDetails?.types.map((type: types) => (
                  <div key={type.type.name}>{type.type.name}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      }
      {
        detailserror &&
        <h2>{detailserror}</h2>
      }
    </>
  );
};

export default PokemonDetailPage;
