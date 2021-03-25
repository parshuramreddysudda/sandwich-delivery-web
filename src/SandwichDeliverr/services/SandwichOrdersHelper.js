
const SandwichOrdersHelper = {
    getAllOrderColumns,
    formatAllOrder,
    addOrder,
    getAllOrderColumnsForNewOrder
}

function getAllOrderColumnsForNewOrder() {
    return [
        {
            headerName: 'Item',
            name: 'item',
        },
        {
            headerName: 'Quantity',
            name: 'quantity',
        },
        {
            headerName: 'Price',
            name: 'price',
        },
        {
            headerName: 'Total',
            name: 'total',
        }
    ]
}
function getAllOrderColumns() {
    return [
        {
            headerName: 'Id',
            name: 'id',
        },
        {
            headerName: 'Item',
            name: 'item',
        },
        {
            headerName: 'Quantity',
            name: 'quantity',
        },
        {
            headerName: 'Price',
            name: 'price',
        },
        {
            headerName: 'Status',
            name: 'status',
            actionHandler: true,
            actionValue: 'pending'
        },
        {
            headerName: 'Total',
            name: 'total',
        }
    ]
}

function formatAllOrder(orders) {
    if (!orders || !Array.isArray(orders)) {
        return [];
    }

    let formattedOrders = orders.map(order => (
        {
            item: order.name,
            price: order.price,
            quantity: 0,
            total: 0,
        }));
    return formattedOrders;
}

function addOrder(allOrders, order) {
    let orders = [...allOrders];
    let newOrder = { ...order };
    let matchedOrders = orders.filter(order => order.item === newOrder.item);
    if (matchedOrders.length > 0) {
        let elPosition = orders.map(el => el.item).indexOf(newOrder.item);
        orders[elPosition].quantity++;
        orders[elPosition].total = parseInt((orders[elPosition].total + matchedOrders[0].price) * 100) / 100;
        return [...orders];
    }
    newOrder.quantity = 1; newOrder.total = newOrder.price;
    return [...orders, newOrder];

}

export default SandwichOrdersHelper;