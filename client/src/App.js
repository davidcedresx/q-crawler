import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Panel from './pages/panel'
import Search from './pages/search'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Panel />
                </Route>
                <Route path="/search" exact>
                    <Search />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
