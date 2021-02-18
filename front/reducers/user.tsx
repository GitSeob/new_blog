import { ILogin, IUser, IUserState } from '@typings/datas';
import { AxiosError } from 'axios';
import { createAsyncAction, createReducer, ActionType } from 'typesafe-actions';

const initialState = {
	user: null,
	isLoggedIn: false,
	isLoggingIn: false,
	isLoggingOut: false,
	loginErrorReason: '',
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const loginAsync = createAsyncAction(LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE)<ILogin, IUser, AxiosError>();

const logoutAsync = createAsyncAction(LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE)<null, string, AxiosError>();

const actions = {
	loginAsync,
	logoutAsync,
};

type UserAction = ActionType<typeof actions>;

const userReducer = createReducer<IUserState, UserAction>(initialState, {});

export default userReducer;
