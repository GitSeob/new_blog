import { createAction, createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { IPostState, IPost } from '@typings/datas';
import { AxiosError } from 'axios';

const initialState = {
	body: '',
	isOpen: false,
};

export const OPEN_CONFIRM_POST = 'posting/OPEN_CONFIRM_POST';
export const CLOSE_CONFIRM_POST = 'posting/CLOSE_CONFIRM_POST';

export const openPosting = createAction(OPEN_CONFIRM_POST)<string>();
export const closePosting = createAction(CLOSE_CONFIRM_POST)();

const actions = {
	openPosting,
	closePosting,
};

type PostingAction = ActionType<typeof actions>;

const postingReducer = createReducer<typeof initialState, PostingAction>(initialState, {
	[OPEN_CONFIRM_POST]: (state, { payload: body }) => ({
		isOpen: true,
		body: body,
	}),
	[CLOSE_CONFIRM_POST]: (state) => ({
		isOpen: false,
		body: '',
	}),
});

export default postingReducer;
