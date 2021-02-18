import { createAction, createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { IPost, IPostsState } from '@typings/datas';
import { AxiosError } from 'axios';

const initialState: IPostsState = {
	posts: [],
	isLoaddingPosts: false,
	isLoadedPosts: false,
	loadPostsErrorReason: null,
};

export const LOAD_POSTS_REQUEST = 'posts/LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'posts/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'posts/LOAD_POSTS_FAILURE';

export const loadPostsAsync = createAsyncAction(LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE)<
	null,
	IPost[],
	AxiosError
>();

const actions = {
	loadPostsAsync,
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
});

export default postsReducer;
