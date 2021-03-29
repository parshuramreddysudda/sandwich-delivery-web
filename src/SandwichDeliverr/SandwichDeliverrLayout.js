import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    BrowserRouter
} from "react-router-dom";
import AllSandwichOrders from './components/AllSandwichOrders';
import NewSandwichOrder from './components/NewSandwichOrder';
import PageNotFound from './components/PageNotFound';

const SandwichDeliverrLayout = () => {
 
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AllSandwichOrders} />
                <Route exact path="/neworder" component={NewSandwichOrder} />
                <Redirect path="/" to="/404" component={PageNotFound}/>
            </Switch>
        </BrowserRouter>
    );
}
 
export default SandwichDeliverrLayout;