import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store/store'

const Root = ({ store, children }) => (
    <Provider store={store}>{children}</Provider>
);

render(
    <Root store={store}>
        <App />
    </Root>,
    document.getElementById('root')
);