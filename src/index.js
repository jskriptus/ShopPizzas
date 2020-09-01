import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import './scss/app.scss';

import App from './App';

ReactDOM.render(
    <Router>
        {/*
            Оборачивааем Компонентом react-redux приложение (App).
            <Provider> магическим образом делает store, доступным внутри приложения (App).
            <Provider> используется единожды когда рендерится корневой компонент.
        */}
        <Provider store={store}> 
            <App />
        </Provider>
    </Router>,
    document.getElementById('root'),
);
