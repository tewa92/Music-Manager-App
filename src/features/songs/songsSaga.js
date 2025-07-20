import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from './songsSlice';

// API endpoint
const API_URL = 'https://music-manager-app-backend.onrender.com/api/songs';
// Fetch songs from the API
function* fetchSongsSaga() {
    try {
        const response = yield call(axios.get, API_URL);
        yield put(fetchSongsSuccess(response.data));
    } catch (error) {
        yield put(fetchSongsFailure(error.message));
    }
}

// Add a new song
function* addSongSaga(action) {
    try {
        const response = yield call(axios.post, API_URL, action.payload);
        yield put(addSongSuccess(response.data));
    } catch (error) {
        yield put(addSongFailure(error.message));
    }
}
// Update an existing song
function* updateSongSaga(action) {
    try {
        const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
        yield put(updateSongSuccess(response.data));
    } catch (error) {
        yield put(updateSongFailure(error.message));
    }
}
// Delete a song
function* deleteSongSaga(action) {
    try {
        yield call(axios.delete, `${API_URL}/${action.payload}`);
        yield put(deleteSongSuccess(action.payload));
    } catch (error) {
        yield put(deleteSongFailure(error.message));
    }
}
// Watcher saga to listen for actions
export default function* songsSaga() {
    yield takeLatest(fetchSongs.type, fetchSongsSaga);
    yield takeLatest(addSong.type, addSongSaga);
    yield takeLatest(updateSong.type, updateSongSaga);
    yield takeLatest(deleteSong.type, deleteSongSaga);
}
// This saga handles fetching, adding, updating, and deleting songs from the API.
// It uses axios for HTTP requests and redux-saga effects like call, put, and takeLatest.
//
// The fetchSongsSaga fetches the list of songs, addSongSaga adds a new song,
// updateSongSaga updates an existing song, and deleteSongSaga deletes a song.


