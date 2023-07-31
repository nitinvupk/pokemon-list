import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type pokemonList = {
  id: string,
  url: string,
  name: string
}

type PokemonState = {
  loading: boolean,
  pokemonList: pokemonList[],
  error: any,
  totalPage: number,
};

const initialState = {
  loading: true,
  pokemonList: [],
  error: null,
  totalPage: 0,
} as PokemonState;

type Payload = {
  payload: {
    results: pokemonList[];
    count: number;
  }
}

type Error = {
  error: {
    message?:  {}
  }
}

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (data: { page: number, offset: number }) => {
  const { page, offset } = data;
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page * offset}`);
  const res = await response.json();
  return res;
});

export const pokemonData = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state: PokemonState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state: PokemonState, action: Payload) => {
        state.loading = false;
        let data = action.payload.results.map((element: any) => ({
          ...element,
          ['id']: element.url.split("/").splice(-2)[0]
        }));
        state.totalPage = action.payload.count;
        state.pokemonList = data;
      })
      .addCase(fetchUserData.rejected, (state: PokemonState, action: Error) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  reset,
} = pokemonData.actions;
export default pokemonData.reducer;
