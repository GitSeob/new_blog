import { createAction, createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { IPostState, IPost } from '@typings/datas';
import { AxiosError } from 'axios';

const initialState: IPostState = {
	post: null,
	isLoadingPost: false,
	isWritingPost: false,
	isRemovingPost: false,
	loadErrorReason: null,
	writeErrorReason: null,
	removeErrorReason: null,
};

export const TOGGLE_CONFIRM_POST = 'post/TOGGLE_CONFIRM_POST';

export const LOAD_POST_REQUEST = 'post/LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'post/LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'post/LOAD_POST_FAILURE';

export const WRITE_POST_REQUEST = 'post/WRITE_POST_REQUEST';
export const WRITE_POST_SUCCESS = 'post/WRITE_POST_SUCCESS';
export const WRITE_POST_FAILURE = 'post/WRITE_POST_FAILURE';

export const UPLOAD_IMAGE_REQUEST = 'post/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'post/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'post/UPLOAD_IMAGE_FAILURE';

export const toggleConfirmPost = createAction(TOGGLE_CONFIRM_POST)();

const loadPostAsync = createAsyncAction(LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE)<
	number,
	IPost,
	AxiosError
>();

const writePostAsync = createAsyncAction(WRITE_POST_REQUEST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE)<
	IPost,
	number,
	AxiosError
>();

const uploadImageAsync = createAsyncAction(UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE)<
	FormData,
	string,
	AxiosError
>();

const actions = {
	toggleConfirmPost,
	loadPostAsync,
	writePostAsync,
	uploadImageAsync,
};

type PostAction = ActionType<typeof actions>;

const postReducer = createReducer<IPostState, PostAction>(initialState, {
	[LOAD_POST_REQUEST]: (state) => ({
		...state,
		isLoadingPost: true,
	}),
	[LOAD_POST_SUCCESS]: (state, { payload: post }) => ({
		...state,
		isLoadingPost: false,
		post: post,
	}),
	[LOAD_POST_FAILURE]: (state, { payload: error }) => ({
		...state,
		isLoadingPost: false,
		loadErrorReason: error,
	}),
});

export default postReducer;
