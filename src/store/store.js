import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../reducers/Reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
    const store = createStore(
      Reducer,
      composeEnhancer(applyMiddleware(thunk)),
    );
    return store;
};

export default configureStore;
