import { createAction, createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { IPost } from '@typings/datas';
import { IPostState } from '@typings/reducer';
import { AxiosError, AxiosResponse } from 'axios';

const initialState: IPostState = {
	post: null,
	writeSuccess: -1,
	isEditedPost: false,
	isRemovedPost: false,
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

export const REMOVE_POST_REQUEST = 'post/REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'post/REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'post/REMOVE_POST_FAILURE';

export const UPLOAD_IMAGE_REQUEST = 'post/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'post/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'post/UPLOAD_IMAGE_FAILURE';

export const toggleConfirmPost = createAction(TOGGLE_CONFIRM_POST)();

export const loadPostAsync = createAsyncAction(LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE)<
	number,
	IPost,
	AxiosError
>();

export const writePostAsync = createAsyncAction(WRITE_POST_REQUEST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE)<
	IPost,
	IPost,
	AxiosError
>();

export const removePostAsync = createAsyncAction(REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE)<
	number,
	AxiosResponse,
	AxiosError
>();

export const uploadImageAsync = createAsyncAction(UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE)<
	FormData,
	string,
	AxiosError
>();

const actions = {
	toggleConfirmPost,
	loadPostAsync,
	writePostAsync,
	uploadImageAsync,
	removePostAsync,
};

type PostAction = ActionType<typeof actions>;

const postReducer = createReducer<IPostState, PostAction>(initialState, {
	[LOAD_POST_REQUEST]: (state) => ({
		...state,
	}),
	[LOAD_POST_SUCCESS]: (state, { payload: post }) => ({
		...state,
		post: post,
	}),
	[LOAD_POST_FAILURE]: (state, { payload: error }) => ({
		...state,
		loadErrorReason: error.response ? error.response.data : 'Error!',
	}),
	[WRITE_POST_REQUEST]: (state) => ({
		...state,
	}),
	[WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
		...state,
		post: post,
		isEditedPost: post.isEdited ? true : false,
		writeSuccess: post.id,
	}),
	[WRITE_POST_FAILURE]: (state, { payload: error }) => ({
		...state,
		writeErrorReason: error.response ? error.response.data : 'Error!',
	}),
	[REMOVE_POST_REQUEST]: (state) => ({
		...state,
	}),
	[REMOVE_POST_SUCCESS]: (state) => ({
		...state,
		isRemovedPost: true,
	}),
	[REMOVE_POST_FAILURE]: (state, { payload: error }) => ({
		...state,
		removeErrorReason: error.response ? error.response.data : 'Error!',
	}),
});

export default postReducer;
