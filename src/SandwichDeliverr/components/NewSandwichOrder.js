import React
, { useEffect, useState }
    from 'react';
import OrderConfig from '../services/OrderConfig';
import SandwichOrdersHelper from '../services/SandwichOrdersHelper';
import DynamicTable from '../../components/DynamicTable/DynamicTable';
import { useHistory } from 'react-router-dom';

const NewSandwichOrder = () => {
    const [inventory, setInventory] = useState([]);
    const [input, setInput] = useState("Order Name");
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orders, addOrder] = useState([]);
    const [tax, updateTax] = useState(0);
    const [orderTotal, updateOrderTotal] = useState(0);
    const [inputError, setInputError] = useState(false);
    let history = useHistory();
    useEffect(() => {
        // console.log('mounted:');
        getInventory();
        const value=input+(history.location.state?history.location.state.length:1);
        setInput(value);
    }, [loading]);

    const getInventory = () => {
        setInventory(OrderConfig.inventory);
        setMenu(SandwichOrdersHelper.formatAllOrder(OrderConfig.menu));
        setLoading(false);
    }
    const addSandwich = sandwichOrder => {
        let newOrders = SandwichOrdersHelper.addOrder(orders, sandwichOrder);
        addOrder(newOrders);
        let totals = newOrders.map(order => order.total);
        let total = 0;
        if (totals.length > 0) {
            total = totals.reduce((sum, total) => sum + total);
        }
        updateTax(parseInt(total * 10) / 100);
        updateOrderTotal(parseInt(total * 110) / 100);
    }
    const checkForm = () => {
        if (input.length > 2)
            createOrder()
        else
            setInputError(true)
    }
    const createOrder = () => {

        let quantityList = orders.map(order => order.quantity);
        let priceList = orders.map(order => order.price);
        let price = 0, quantity = 0;
        if (priceList.length > 0) {
            price = priceList.reduce((sum, p) => sum + p);
        }
        if (quantityList.length > 0) {
            quantity = quantityList.reduce((sum, q) => sum + q);
        }
        let historyLocation=history.location;
        let newOrder = [{
            'id': historyLocation.state ? historyLocation.state.length + 1 : 1,
            'item': input,
            'price': price,
            'quantity': quantity,
            'status':"pending",
            'total': orderTotal
        }];
        let oldOrders = [];
        if (historyLocation.state) {
            console.log("History files", historyLocation.state)
            oldOrders = [...historyLocation.state];
            oldOrders.push(...newOrder);
        }
        else {
            oldOrders = [...newOrder];
        }
        console.log("Orders are ", oldOrders)
        setInputError(false);
        history.push({ pathname: '/', state: oldOrders });
    }

    const validateInput = (e) => {
        setInput(e.target.value)
    }
    let columns = SandwichOrdersHelper.getAllOrderColumnsForNewOrder();
    return (
        <>
            <div className="flex-layout">
                <div className="flex-container">
                    {menu.map(menuItem => <>
                        <div key={menuItem.name} className="flex-item">
                            <button className="new-sandwich-order-button"
                                onClick={() => addSandwich(menuItem)}
                            >
                                <span>{menuItem.item} - {menuItem.price}</span>
                            </button>

                        </div>
                    </>
                    )}
                </div>
            </div>
            <div>
                <DynamicTable
                    columns={columns}
                    data={orders}
                />
                <div >
                    <p>Enter the name</p>

                    <input onChange={validateInput} value={input} />
                </div>
                {/* <ul>
                {
                currenOrders.map( (currentOrder, index) => (
                    <li key={index}>{currentOrder.name} - {currentOrder.price}</li>
                ))}
            </ul> */}
                {orders && orders.length > 0 && (
                    <ul>
                        <li>Tax 10% - {tax}</li>
                        <li>Total - {orderTotal}</li>
                    </ul>
                )}
                <button className="create-order-button" onClick={() => checkForm()}>
                    Create Order
            </button>
                {inputError && <h3>Please Input Order Name</h3>}
            </div>
        </>
    );
}

export default NewSandwichOrder;