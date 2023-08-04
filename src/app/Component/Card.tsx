import React, { useState } from 'react';
import { useAppDispatch } from "../ReduxToolkit/hooks";
import {
  fetchPokemonDetails,
} from "../ReduxToolkit/Feature/PokemonSlice";
import LoaderImg from "../../../public/loader.gif"
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
  id: string
}

interface CardProps {
  pokemon: Pokemon;
}

export const Card = (props: CardProps) => {
  const dispatch = useAppDispatch();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  return (
    <div className="card-continer">
      <Link href="[details]" as={`/${props.pokemon?.name}`}>
        <div className='cardboxpock' onClick={() => dispatch(fetchPokemonDetails(props.pokemon?.name))}>
          {!imageLoaded && (
            <div className="loader">
              <img alt="pokemon" src={LoaderImg.src} />
            </div>
          )}
          <img
            alt="pokemon"
            src={`https://img.pokemondb.net/artwork/large/${props.pokemon.name}.jpg`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoaded ? 'block' : 'none' }} />
          <h2>{props.pokemon.name[0].toUpperCase() + props.pokemon.name.slice(1)}</h2>
          <h3>{props.pokemon?.id}</h3>
        </div>
      </Link>
    </div>
  )
};

