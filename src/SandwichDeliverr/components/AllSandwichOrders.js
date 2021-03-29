import React, { useLayoutEffect, useState, useReducer } from 'react';
import { Link, useHistory } from "react-router-dom";
import SandwichOrdersHelper from '../services/SandwichOrdersHelper';
import DynamicTable from '../../shared-components/DynamicTable/DynamicTable';
import Loader from '../../shared-components/LoadingBar';
import './sandwich-orders.css';

const AllSandwichOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeOrders, setActiveOrders] = useState(false);
    const [completeOrders, setCompleteOrders] = useState(false);
    const [allOrder, setAllOrder] = useState(true);
    const [editedOrders, setEditedOrders] = useState();
    /* 
        I faced an issue updating child layout and so used forceUpdate using an online hack 
        https://stackoverflow.com/questions/53215285/how-can-i-force-a-component-to-re-render-with-hooks-in-react/58606536#58606536
    */
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    let history = useHistory();
    let location = history.location;
    useLayoutEffect(() => {
        if (location && location.state) {            
            if (location.state) {
                setOrders(location.state)
            }
        }
        setLoading(false);
    }, [location.state]);

    const checkout = (id) => {        
        forceUpdate()
        if (editedOrders) {
            editedOrders[id].status = 'Checked Out';
        }
        else {
            orders[id].status = 'Checked Out';
        }
        activeOrders ? changeOrder('Active'):changeOrder('All');
    }

    const changeOrder = (name) => {
        if (name === 'Active') {
            setActiveOrders(true)
            setAllOrder(false)
            setCompleteOrders(false);
            setEditedOrders(orders.filter(item => {
                return item.status == 'pending'
            }))
            forceUpdate()
        }
        else if (name === 'All') {
            setAllOrder(true)
            setActiveOrders(false)
            setCompleteOrders(false)
            setEditedOrders(orders)
        }
        else {
            setAllOrder(false)
            setActiveOrders(false)
            setCompleteOrders(true);
            setEditedOrders(orders.filter( item => {
                return item.status !== 'pending'
            }))

        }
    }
    const newOrder = () => {
        history.push({ pathname: '/neworder', state: location.state });
    }
    let columns = SandwichOrdersHelper.getAllOrderColumns();
    return (
        <>
            <div className='main-div'>
            <header className="header">All new Sandwich Ordering Portal </header>
 
                <div className="flex-order-div">
                    <div className="sandwich-radio">
                         <input checked={allOrder} onClick={() => changeOrder('All')} type="radio" /> All Orders &nbsp;
                         <input checked={activeOrders} onClick={() => changeOrder('Active')} type="radio" /> Active Orders  &nbsp;
                         <input checked={completeOrders} onClick={() => changeOrder(' ')} type="radio" /> Completed Orders
                  </div>
                  <div><button className="new-order-link" onClick={() => newOrder()}> New Order </button></div>
                </div>
                <br></br>
                <div className="information">
                    <p>Click on the Orders Buttons for specific orders category </p>
                    <p>The New Order button is used to create a new order in the other page</p>
                </div>
                <DynamicTable
                    columns={columns}
                    data={editedOrders ? editedOrders : orders}
                    checkout={checkout}
                    noDataAvailableText="Please Create an Order"
                />
                {loading && (
                    <Loader />
                )}
            </div>
        </>
    );
}

export default AllSandwichOrders;