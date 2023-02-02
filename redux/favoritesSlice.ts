import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type FavoritesState = {
    favorites: Array<string>,
};

export type FavoritePayload = {
    mealId: string,
};

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialState,
    reducers: {
        addFavorite: (state: FavoritesState, action: PayloadAction<FavoritePayload>): void => {
            state.favorites.push(action.payload.mealId);
        },
        removeFavorite: (state: FavoritesState, action: PayloadAction<FavoritePayload>): void => {
            state.favorites.splice(state.favorites.indexOf(action.payload.mealId), 1);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
