import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PokemonState = {
  loading: boolean,
  pokemonList: any[],
  error: any,
  totalPage: any,
  searchedData: any
};

const initialState = {
  loading: true,
  pokemonList: [],
  error: null,
  totalPage: null,
  searchedData: [],
} as PokemonState;

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (data: any) => {
  const {page, offset} = data;
  let response =await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page * offset}`);
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
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: any) => {
        state.loading = false;
        let data = action.payload.results.map((element: any) => ({
          ...element,
          ['id']: element.url.split("/").splice(-2)[0]
        }));
        state.totalPage = action.payload.count;
        state.pokemonList = data;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  reset,
} = pokemonData.actions;
export default pokemonData.reducer;
