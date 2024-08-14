import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

interface FavoritesState {
  favorites: number[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(id => id !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
      enqueueSnackbar('Favorites updated successfully!', { variant: 'success' });
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;