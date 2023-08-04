import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

type pokemonList = {
  id: string,
  url: string,
  name: string
}

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

type pokemonDetails = {
  id?: string,
  height?: string,
  name?: string,
  weight?: string,
  base_experience?: string,
  abilities?: abilities[],
  types?: types[]
}

type PokemonState = {
  loading: boolean,
  pokemonList: pokemonList[],
  error: any,
  totalPage: number,
  pokemonDetails: pokemonDetails;
  detailsLoading: boolean,
  detailserror: any,
  currentPage: number;
};

const pokemonDetailsInitials = {
  id: '',
  height: '',
  name: '',
  weight: '',
  base_experience: '',
  abilities: [],
  types: []
}

const initialState = {
  loading: true,
  pokemonList: [],
  error: null,
  totalPage: 0,
  pokemonData: {},
  pokemonDetails: pokemonDetailsInitials,
  detailsLoading: true,
  detailserror: null,
  currentPage: 0,
}

type Payload = {
  payload: {
    results: pokemonList[];
    count: number;
    name: string;
    pokemonDetails: pokemonDetails;
  }
}

type Error = {
  error: {
    message?: {}
  }
}

export const fetchPokemonData = createAsyncThunk('user/fetchPokemonData', async (data: { page: number, offset: number }) => {
  const { page, offset } = data;
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page * offset}`);
  const res = await response.json();
  return res;
});

export const fetchPokemonDetails = createAsyncThunk('user/fetchPokemonDetails', async (pokemonName: string) => {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const res = await response.json();
  return res;
});


export const pokemonData = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {
    reset: () => initialState,
    setPageNo: (state, action) => {
      return {...state, currentPage: action.payload}}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonData.pending, (state: PokemonState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonData.fulfilled, (state: PokemonState, action: Payload) => {
        state.loading = false;
        let data = action.payload.results.map((element: any) => ({
          ...element,
          ['id']: element.url.split("/").splice(-2)[0]
        }));
        state.totalPage = action.payload.count;
        state.pokemonList = data;
      })
      .addCase(fetchPokemonData.rejected, (state: PokemonState, action: Error) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPokemonDetails.pending, (state: PokemonState) => {
        state.detailsLoading = true;
        state.detailserror = null;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state: PokemonState, action: Payload) => {
        state.detailsLoading = false;
        state.pokemonDetails = action.payload;
      })
      .addCase(fetchPokemonDetails.rejected, (state: PokemonState, action: Error) => {
        state.detailsLoading = false;
        state.detailserror = action.error.message;
      });
  },
});


export const {
  reset,
  setPageNo
} = pokemonData.actions;
export default pokemonData.reducer;
