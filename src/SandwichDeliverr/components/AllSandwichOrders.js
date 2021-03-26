import React, { useLayoutEffect, useState, useReducer } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import SandwichOrdersHelper from '../services/SandwichOrdersHelper';
import DynamicTable from '../../components/DynamicTable/DynamicTable';
import Loader from '../../components/LoadingBar';


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
            console.log('location.state:', location.state);
            if (location.state) {
                setOrders(location.state)
                console.log("All Order Page Orders are  ", orders)
            }
        }
        setLoading(false);
    }, [location.state]);

    // const checkout = (id) => {
    //     forceUpdate()
    //     orders[id].status = 'Checked Out';
    //     setOrders(orders)
    // }
    const checkout = (id) => {
        forceUpdate()
        if (editedOrders) {
            editedOrders[id].status = 'Checked Out';
        }
        else {
            orders[id].status = 'Checked Out';
        }
        setOrders(orders)
    }

    const changeOrder = (name) => {
        if (name === 'Active') {
            setActiveOrders(true)
            setAllOrder(false)
            setCompleteOrders(false);
            setEditedOrders(orders.filter(function (item) {
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
            setEditedOrders(orders.filter(function (item) {
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
            <div className='Main-Div'>
            <header className="header">All new Sandwich Ordering Portal </header>
                <p>
                    {/* Debugging Purpose */}
                    {/* <span>Orders Length: {editedOrders? editedOrders.length:orders.length}</span> */}
                </p>
                <div className="flex-order-div">
                    <div className="firstInput">
                         <input checked={allOrder} onClick={() => changeOrder('All')} type="radio" /> All Orders<br/>
                         <input checked={activeOrders} onClick={() => changeOrder('Active')} type="radio" /> Active Orders<br/>
                         <input checked={completeOrders} onClick={() => changeOrder(' ')} type="radio" /> Completed Orders
                  </div>
                    <div><button className="new-order-link" onClick={() => newOrder()}> New Order {location.state ? location.state.length + 1 : 1}</button></div>
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