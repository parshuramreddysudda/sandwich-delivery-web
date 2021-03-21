import React, { Component } from 'react'
import NewOrder from './NewOrder';
import AllOrders from '../AllOrders';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
export default class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Route path="/">
                        <AllOrders /> 
                    </Route>
                    <Route path="/asd">
                        <NewOrder />
                    </Route>
                </Router>

            </div>
        )
    }
}
