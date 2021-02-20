import { createAction, createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { ICategoryHead, IPost, IPostsState } from '@typings/datas';
import { AxiosError } from 'axios';

const initialState: IPostsState = {
	Category: [],
	posts: [],
	isLoaddingPosts: false,
	isLoadedPosts: false,
	loadPostsErrorReason: null,
};

export const LOAD_POSTS_REQUEST = 'posts/LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'posts/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'posts/LOAD_POSTS_FAILURE';

export const LOAD_CATEGORIES_REQUEST = 'posts/LOAD_CATEGORIES_REQUEST';
export const LOAD_CATEGORIES_SUCCESS = 'posts/LOAD_CATEGORIES_SUCCESS';
export const LOAD_CATEGORIES_FAILURE = 'posts/LOAD_CATEGORIES_FAILURE';

export const loadPostsAsync = createAsyncAction(LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE)<
	null,
	IPost[],
	AxiosError
>();

export const loadCategoriesAsync = createAsyncAction(
	LOAD_CATEGORIES_REQUEST,
	LOAD_CATEGORIES_SUCCESS,
	LOAD_CATEGORIES_FAILURE,
)<null, ICategoryHead[], AxiosError>();

const actions = {
	loadPostsAsync,
	loadCategoriesAsync,
};

type PostsAction = ActionType<typeof actions>;

const postsReducer = createReducer<IPostsState, PostsAction>(initialState, {
	[LOAD_POSTS_REQUEST]: (state) => ({
		...state,
		isLoaddingPosts: true,
	}),
	[LOAD_POSTS_SUCCESS]: (state, { payload: posts }) => ({
		...state,
		isLoaddingPosts: false,
		posts: state.posts.concat(posts),
	}),
	[LOAD_POSTS_FAILURE]: (state, { payload: error }) => ({
		...state,
		isLoaddingPosts: false,
		loadPostsErrorReason: error,
	}),
	[LOAD_CATEGORIES_REQUEST]: (state) => ({
		...state,
	}),
	[LOAD_CATEGORIES_SUCCESS]: (state, { payload: Category }) => ({
		...state,
		Category: Category,
	}),
	[LOAD_CATEGORIES_FAILURE]: (state, { payload: error }) => ({
		...state,
	}),
});

export default postsReducer;
