import { loadingStart, loadingEnd } from '@reducers/loading';
import { LOGIN_REQUEST, loginAsync, LOAD_USER_REQUSET, loadUserAsync } from '@reducers/user';
import axios from 'axios';
import { call, all, fork, takeLatest, put, takeEvery } from 'redux-saga/effects';

async function loadUserAPI() {
	return await axios.get('/user');
}

function* loadUser() {
	try {
		const result = yield call(loadUserAPI);
		yield put(loadUserAsync.success(result.data));
	} catch (error) {
		console.error(error);
		yield put(loadUserAsync.failure(error));
	}
}

function* watchLoadUser() {
	yield takeEvery(LOAD_USER_REQUSET, loadUser);
}

async function loginAPI(loginData: any) {
	return await axios.post(`/user`, loginData);
}

function* login(action: ReturnType<typeof loginAsync.request>) {
	yield put(loadingStart(action.type));
	try {
		const result = yield call(loginAPI, action.payload);
		yield put(loginAsync.success(result.data));
	} catch (error) {
		console.error(error);
		yield put(loginAsync.failure(error));
	}
	yield put(loadingEnd(action.type));
}

function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, login);
}

export default function* userSaga() {
	yield all([fork(watchLogin), fork(watchLoadUser)]);
}
