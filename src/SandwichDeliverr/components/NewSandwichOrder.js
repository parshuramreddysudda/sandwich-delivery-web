import React, { useEffect, useState } from 'react';
import OrderConfig from '../config/OrderConfig';
import SandwichOrdersHelper from '../services/SandwichOrdersHelper';
import DynamicTable from '../../shared-components/DynamicTable/DynamicTable';
import { useHistory } from 'react-router-dom';
import Input from '../../shared-components/Input/Input';
import InputHelper from '../../shared-components/Input/InputHelper';
import SandwichElementConfig from '../config/SanwichElementConfig';

const NewSandwichOrder = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orders, addOrder] = useState([]);
    const [tax, updateTax] = useState(0);
    const [orderTotal, updateOrderTotal] = useState(0);
    const [config, setConfig] = useState(SandwichElementConfig);
    let history = useHistory();
    
    useEffect(() => {
        setMenu(SandwichOrdersHelper.formatAllOrder(OrderConfig.menu));        
        const value = "New Order " + (history.location.state ? history.location.state.length + 1 : 1);
        
        // To reflect unique order name updating 'newOrderName' value
        onChangeHandler('newOrderName', value);
        setLoading(false);
    }, [loading]);

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
        let historyLocation = history.location;
        let newOrder = [{
            'id': historyLocation.state ? historyLocation.state.length + 1 : 1,
            'item': config.newOrderName.value,
            'price': price,
            'quantity': quantity,
            'status': "pending",
            'total': orderTotal
        }];
        let oldOrders = [];
        if (historyLocation.state) {            
            oldOrders = [...historyLocation.state];
            oldOrders.push(...newOrder);
        }
        else {
            oldOrders = [...newOrder];
        }
        history.push({ pathname: '/', state: oldOrders });
    }

    const onChangeHandler = (id, value) => {
        let updatedConfig = { ...config };
        if (id) {
            let element = updatedConfig[id];
            element.value = value;
            element.valid = InputHelper.validate(element);
            updatedConfig[id] = element;
            setConfig({ ...updatedConfig });
        }
    }
    let columns = SandwichOrdersHelper.getAllOrderColumnsForNewOrder();
    return (
        <>
            <header>New orders Page</header>

            <div className="flex-layout">
                <div className="flex-container">
                    {menu.map(menuItem => <>
                        <div key={menuItem.name} className="flex-item">
                            <button className="new-sandwich-order-button"
                                onClick={() => addSandwich(menuItem)}
                            >
                              {menuItem.item} - {menuItem.price}
                            </button>

                        </div>
                    </>
                    )}
                </div>
            </div>
            <br></br>
            <div className="information">
                <p>Click respective Sandwich button multiple times to increase the quantity.</p>
            </div>
            <div className="flex-order-div">
                <div className="firstInput">
                    <Input
                        config={config.newOrderName}
                        onChangeHandler={(id, value) => onChangeHandler(id, value)}
                    />
                </div>
                <div> <button
                    className="create-order-button"
                    disabled={!orders.length || !config.newOrderName.valid}
                    onClick={createOrder}>
                    Create Order
                </button></div>
            </div>
            <div>

                <DynamicTable
                    columns={columns}
                    data={orders}
                    noDataAvailableText="Please click on a Sandwich from the above list"
                />

                <div className="tax-total">
                    {orders && orders.length > 0 && (
                        <>
                            <span>Tax 10% - {tax}</span> 
                            <span>Total - {orderTotal}</span>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default NewSandwichOrder;