import { compose, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';

declare module 'redux' {
	export interface Store {
		sagaTask: any;
	}
}

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(reducers, enhancer);
	store.sagaTask = sagaMiddleware.run(sagas);
	return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
