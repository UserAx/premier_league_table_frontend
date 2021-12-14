import React from 'react';
import ReactDom from 'react-dom';
import AppRoute from './routes/AppRoute';
import configureStore from './store/store';
import {Provider} from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// import {setUser} from './actions/user';
// import User from './mockData/TestData';

export const store = configureStore();

const JSX = () => (
    <Provider store={store}>
        <AppRoute />
    </Provider>
);

const renderApp = () => {
    ReactDom.render(<JSX/>, document.getElementById('root'));
}

renderApp();
// store.dispatch({type: PURGE});
// store.dispatch(setUser(User, User.tokens[0]));

//commit number: 18-fixed-css