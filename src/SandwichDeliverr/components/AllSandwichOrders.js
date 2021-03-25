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
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    // const [loading, setLoading] = useState(false);
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

    const checkout = (id) => {
        forceUpdate()
        orders[id].status = 'Checked Out';
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
            <button className="new-order-link" onClick={() => newOrder()}> New Order {location.state ? location.state.length + 1 : 1}</button>
            <p>
                <span>Orders Length: {orders && orders.length}</span>
            </p>
            <input checked={allOrder} onClick={() => changeOrder('All')} type="radio" /> All Orders
            <input checked={activeOrders} onClick={() => changeOrder('Active')} type="radio" /> Active Orders
            <input checked={completeOrders} onClick={() => changeOrder(' ')} type="radio" /> Completed Orders
            <DynamicTable
                columns={columns}
                data={editedOrders ? editedOrders : orders}
                checkout={checkout}
            />
            {loading && (
                <Loader />
            )}
        </>
    );
}

export default AllSandwichOrders;