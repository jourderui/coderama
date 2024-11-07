import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"
import { Favourite, MoviesMetaSliceState } from "../models/Movie"

const initialState: MoviesMetaSliceState = {
  page: 1,
  searchString: "",
  favourites: []
}

export const moviesMetaSlice = createAppSlice({
  name: "moviesMeta",
  initialState,
  reducers: create => ({
    setPage: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.page = action.payload
      },
    ),
    setSearchString: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.searchString = action.payload
      },
    ),
    addFavourite: create.reducer(
      (state, action: PayloadAction<Favourite>) => {
        const index = state.favourites.findIndex(entry => entry.id === action.payload.id)
        if(index === -1) {
          state.favourites.push(action.payload)
        }
      },
    ),
    removeFavourite: create.reducer(
      (state, action: PayloadAction<string>) => {
        const newFavourites = state.favourites.filter(entry => entry.id !== action.payload)
        state.favourites = newFavourites
      },
    ),
  }),

  selectors: {
    page: moviesMeta => moviesMeta.page,
    searchString: moviesMeta => moviesMeta.searchString,
    favourites: moviesMeta => moviesMeta.favourites
  },
})

export const { setPage, setSearchString, addFavourite, removeFavourite } =
moviesMetaSlice.actions

export const { page, searchString, favourites } = moviesMetaSlice.selectors
