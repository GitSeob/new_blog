import { loadCategoriesAsync, loadPostsAsync } from '@reducers/posts';
import axios, { AxiosResponse } from 'axios';
import { call, all, fork, takeLatest, put } from 'redux-saga/effects';

async function loadCategoriesAPI(postData: any) {
	return await axios.get(`/category`, postData);
}

function* loadCategories(action: ReturnType<typeof loadCategoriesAsync.request>) {
	try {
		const result: AxiosResponse<any> = yield call(loadCategoriesAPI, action.payload);
		yield put(loadCategoriesAsync.success(result));
	} catch (error) {
		console.error(error);
		yield put(loadCategoriesAsync.failure(error));
	}
}

function* watchloadCategories() {
	yield takeLatest(loadCategoriesAsync.request, loadCategories);
}

async function loadAllPostsAPI(query: any) {
	if (query.search)
		return await axios.get(`/post/search?lastId=${query.lastId || 0}&search=${encodeURIComponent(query.search)}`);
	return await axios.get(
		`/post?lastId=${query.lastId || 0}&category=${query.category ? encodeURIComponent(query.category) : '0'}`,
	);
}

function* loadAllPosts(action: ReturnType<typeof loadPostsAsync.request>) {
	try {
		const result: AxiosResponse<any> = yield call(loadAllPostsAPI, action.payload);
		yield put(loadPostsAsync.success(result));
	} catch (error) {
		console.error(error);
		yield put(loadPostsAsync.failure(error));
	}
}

function* watchLoadAllPosts() {
	yield takeLatest(loadPostsAsync.request, loadAllPosts);
}

export default function* postsSaga() {
	yield all([fork(watchloadCategories), fork(watchLoadAllPosts)]);
}
