import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
    list: [],
    loading: false,
    error: null,
    searchTerm: '',
    genreFilter: 'all',
};
const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setGenreFilter: (state, action) => {
            state.genreFilter = action.payload;
        },
        fetchSongs: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSongsSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload;
        },
        fetchSongsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addSong: (state) => {
            state.loading = true;
            state.error = null;
        },
        addSongSuccess: (state, action) => {
            state.list.push(action.payload);
            state.loading = false;
        },
        addSongFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateSong: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updateSongSuccess: (state, action) => {
            const index = state.list.findIndex(song => song.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
                state.loading = false;
            }
        },
        updateSongFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteSong: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteSongSuccess: (state, action) => {
            state.list = state.list.filter(song => song.id !== action.payload);
            state.loading = false;
        },
        deleteSongFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    setSearchTerm,
    setGenreFilter,
    fetchSongs,
    fetchSongsSuccess,
    fetchSongsFailure,
    addSong,
    updateSong,
    deleteSong,
    addSongSuccess,
    addSongFailure,
    updateSongSuccess,
    updateSongFailure,
    deleteSongSuccess,
    deleteSongFailure
} = songSlice.actions;

export default songSlice.reducer;