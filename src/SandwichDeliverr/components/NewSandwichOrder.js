import React
,  { useEffect, useState } 
from 'react';
import OrderConfig from '../services/OrderConfig';
import SandwichOrdersHelper from '../services/SandwichOrdersHelper';
import DynamicTable from '../../components/DynamicTable/DynamicTable';
import { useHistory } from 'react-router-dom';

const NewSandwichOrder = () => {
    const [inventory, setInventory] = useState([]);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orders, addOrder] = useState([]);
    const [tax, updateTax] = useState(0);
    const [orderTotal, updateOrderTotal] = useState(0);
    let history = useHistory();
    
    useEffect(()=> {
        // console.log('mounted:');
        getInventory();        
    }, [loading]);
    
    const getInventory = () => {
        setInventory(OrderConfig.inventory);
        setMenu(SandwichOrdersHelper.formatAllOrder(OrderConfig.menu));
        setLoading(false);        
    }
    const addSandwich = sandwichOrder => {
        console.log('Before adding sandwich');
        console.log('sandwichOrder: ', sandwichOrder);
        console.log('orders: ', orders);
        let newOrders = SandwichOrdersHelper.addOrder(orders, sandwichOrder);        
        addOrder(newOrders);
        console.log('After orders added: ', newOrders);
        let totals = newOrders.map(order => order.total);
        let total = 0;
        if(totals.length > 0){
            total = totals.reduce((sum,total) => sum+total);
        }
        updateTax(parseInt(total * 10)/100);
        updateOrderTotal(parseInt(total * 110)/100);
    }
    const createOrder = () => {

        let quantityList = orders.map(order => order.quantity);
        let priceList = orders.map(order => order.price);
        let price = 0, quantity = 0;
        if(priceList.length > 0){
            price = priceList.reduce((sum,p) => sum+p);
        }
        if(quantityList.length > 0){
            quantity = quantityList.reduce((sum,q) => sum+q);
        }
        let newOrder = {
            'item':'new-order', 
            'price':price,
            'quantity':quantity, 
            'total':orderTotal
        };


        history.push({pathname: '/', state: newOrder});
    }
    let columns = SandwichOrdersHelper.getAllOrderColumns();
    return (
        <>
        <div className="flex-layout">
            <div className="flex-container">            
                {menu.map( menuItem => <>
                    <div key={menuItem.name} className="flex-item"> 
                        <button className="new-sandwich-order-button"
                        onClick = { ()=> addSandwich(menuItem)}
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
                    columns = {columns}
                    data = {orders}
            />
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
            <button className="create-order-button" onClick = { ()=> createOrder()}>
                Create Order
            </button>
        </div>
    </>
    );
}
 
export default NewSandwichOrder;