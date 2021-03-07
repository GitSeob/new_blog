import { createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { IPost, IUser, ICategory } from '@typings/datas';
import { IPostsState } from '@typings/reducer';
import { AxiosError, AxiosResponse } from 'axios';

const initialState: IPostsState = {
	Category: [],
	posts: [],
	numberOfPosts: 0,
	isLoaddingPosts: false,
	loadPostsErrorReason: null,
	EndOfPosts: false,
	findPostCount: 0,
};

export const LOAD_POSTS_REQUEST = 'posts/LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'posts/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'posts/LOAD_POSTS_FAILURE';

export const LOAD_CATEGORIES_REQUEST = 'posts/LOAD_CATEGORIES_REQUEST';
export const LOAD_CATEGORIES_SUCCESS = 'posts/LOAD_CATEGORIES_SUCCESS';
export const LOAD_CATEGORIES_FAILURE = 'posts/LOAD_CATEGORIES_FAILURE';

export const LOAD_SEARCH_REQUEST = 'posts/LOAD_SEARCH_REQUEST';
export const LOAD_SEARCH_SUCCESS = 'posts/LOAD_SEARCH_SUCCESS';
export const LOAD_SEARCH_FAILURE = 'posts/LOAD_SEARCH_FAILURE';

interface test {
	user?: IUser;
	category?: string;
	lastId?: number;
}

export const loadPostsAsync = createAsyncAction(LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE)<
	test,
	AxiosResponse<any>,
	AxiosError
>();

interface LoadCategoryType {
	categories: ICategory[] & { postCount: number }[];
	numberOfPosts: number;
}

export const loadCategoriesAsync = createAsyncAction(
	LOAD_CATEGORIES_REQUEST,
	LOAD_CATEGORIES_SUCCESS,
	LOAD_CATEGORIES_FAILURE,
)<null, AxiosResponse<LoadCategoryType>, AxiosError>();

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
	[LOAD_POSTS_SUCCESS]: (state, { payload }) => ({
		...state,
		isLoaddingPosts: false,
		posts: state.posts.concat(payload.data.posts),
		findPostCount: payload.data.findPostCount,
		EndOfPosts: payload.data.length !== 8,
	}),
	[LOAD_POSTS_FAILURE]: (state, { payload: error }) => ({
		...state,
		isLoaddingPosts: false,
		loadPostsErrorReason: error.response ? error.response.data : 'Error!',
	}),
	[LOAD_CATEGORIES_REQUEST]: (state) => ({
		...state,
	}),
	[LOAD_CATEGORIES_SUCCESS]: (state, { payload }) => ({
		...state,
		Category: payload.data.categories,
		numberOfPosts: payload.data.numberOfPosts,
	}),
	[LOAD_CATEGORIES_FAILURE]: (state, { payload: error }) => ({
		...state,
	}),
});

export default postsReducer;
