import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { mediaReducer } from './redux/reducer/mediaReducer';
import { userReducer } from './redux/reducer/userReducer';
import { feedReducer } from './redux/reducer/feedReducer';

const initialState = {};
const middleware = [thunk];
const rootReducer = combineReducers({
    media: mediaReducer,
    user: userReducer,
    feed: feedReducer,
})

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
