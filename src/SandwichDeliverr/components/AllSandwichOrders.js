import React, { useLayoutEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import SandwichOrdersHelper from '../services/SandwichOrdersHelper';
import DynamicTable from '../../components/DynamicTable/DynamicTable';
import Loader from '../../components/LoadingBar';



const AllSandwichOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [loading, setLoading] = useState(false);
    let history = useHistory();
    let location=history.location;
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

    const newOrder = () => {
        history.push({ pathname: '/neworder', state: location.state });
    }
    let columns = SandwichOrdersHelper.getAllOrderColumns();
    return (
        <>
            <Link className="new-order-link" to="neworder"> New Order </Link>
            <button className="button" onClick={() => newOrder()}>New Order</button>
            <p>
                <span>Orders Length: {orders && orders.length}</span>
            </p>
            <DynamicTable
                columns={columns}
                data={orders}
            />

            {loading && (
                <Loader />
            )}
        </>
    );
}

export default AllSandwichOrders;