import axios from 'axios';
import { call, all, fork, takeLatest, put } from 'redux-saga/effects';
import { loadPostAsync, writePostAsync } from '@reducers/post';
import { loadingEnd, loadingStart } from '@reducers/loading';

async function writePostAPI(postData: any) {
	return await axios.post(`/post`, postData);
}

function* writePost(action: ReturnType<typeof writePostAsync.request>) {
	yield put(loadingStart(action.type));
	try {
		const result = yield call(writePostAPI, action.payload);
		yield put(writePostAsync.success(result.data));
	} catch (error) {
		console.error(error);
		yield put(writePostAsync.failure(error));
	}
	yield put(loadingEnd(action.type));
}

function* watchWritePost() {
	yield takeLatest(writePostAsync.request, writePost);
}

async function loadPostAPI(id: any) {
	return await axios.get(`/post/${id}`);
}

function* loadPost(action: ReturnType<typeof loadPostAsync.request>) {
	yield put(loadingStart(action.type));
	try {
		const result = yield call(loadPostAPI, action.payload);
		yield put(loadPostAsync.success(result.data));
	} catch (error) {
		console.error(error);
		yield put(loadPostAsync.failure(error));
	}
	yield put(loadingEnd(action.type));
}

function* watchLoadPost() {
	yield takeLatest(loadPostAsync.request, loadPost);
}

export default function* postSaga() {
	yield all([fork(watchLoadPost), fork(watchWritePost)]);
}
