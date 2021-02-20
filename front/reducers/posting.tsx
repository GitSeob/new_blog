import { createAction, createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { IPostState, IPost, ICategory } from '@typings/datas';
import { AxiosError } from 'axios';

interface PostingState {
	body: string;
	categories: ICategory[];
	isOpen?: boolean;
}

const initialState: PostingState = {
	body: '',
	categories: [],
	isOpen: false,
};

export const OPEN_CONFIRM_POST = 'posting/OPEN_CONFIRM_POST';
export const CLOSE_CONFIRM_POST = 'posting/CLOSE_CONFIRM_POST';

export const openPosting = createAction(OPEN_CONFIRM_POST)<PostingState>();
export const closePosting = createAction(CLOSE_CONFIRM_POST)();

const actions = {
	openPosting,
	closePosting,
};

type PostingAction = ActionType<typeof actions>;

const postingReducer = createReducer<PostingState, PostingAction>(initialState, {
	[OPEN_CONFIRM_POST]: (state, { payload: body }) => ({
		isOpen: true,
		body: body.body,
		categories: body.categories,
	}),
	[CLOSE_CONFIRM_POST]: (state) => ({
		isOpen: false,
		body: '',
		categories: [],
	}),
});

export default postingReducer;
