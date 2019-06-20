import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Update from './Form/Product/Part/Update'
import Create from './Form/Product/Part/Create'

export default class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/part/:company/create/workspace" component={Create} />
                    <Route path="/part/:user/create/profile" component={Create} />
                    <Route path="/part/:part/settings" component={Update} />
                </Switch>
            </Router>
        )
    }
}