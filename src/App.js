import React, { Component } from 'react'
import {
    Switch,
    Route,
    Link,
    Redirect,
    BrowserRouter
} from "react-router-dom";
import AllOrders from './Components/AllOrders';
import NewOrder from './Components/NewOrder';
import NotFound from './Components/NotFound';
export default class Routes extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={AllOrders} />
                        <Route exact path="/NewOrder" component={NewOrder} />
                        <Redirect path="/404" to="/404" component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}
