import React, { useLayoutEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import SandwichOrdersHelper from '../services/SandwichOrdersHelper';
import DynamicTable from '../../components/DynamicTable/DynamicTable';



const AllSandwichOrders = () => {
    let history = useHistory();
    const [inventory, setInventory] = useState([]);
    const [menu, setMenu] = useState([]);
    const [orders, setOrders] = useState([]);
    // const [loading, setLoading] = useState(false);
    let location = useLocation();
    useLayoutEffect(() => {
        if (location && location.state) {
            console.log('location.state:', location.state);

            let newOrder = location.state;

            console.log('newOrder: ', newOrder);
            if (newOrder) {

                let newOrders = [...orders];
                newOrders.push(newOrder);
                setOrders(newOrders);
                console.log('orders: ', orders);
            }
        }
    }, [location.state]);

    const newOrder = () => {
        history.push({ pathname: '/neworder', state: orders });
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
            {/* {loading && (
                <p>Data is loading </p>
            )} */}
        </>
    );
}

export default AllSandwichOrders;