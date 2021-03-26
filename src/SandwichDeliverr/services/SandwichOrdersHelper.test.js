import React from 'react'
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });
import Helper from '../services/SandwichOrdersHelper';


describe('Testing SandwichOrdersHelper.js', () => {
    test('should return 4 table column names for New Order Table', () => {
        const result = [
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
        ];
        expect(Helper.getAllOrderColumnsForNewOrder()).toEqual(result);
    })
    test('should return all Orders columns for Main page or All Delivery page', () => {
        const result = [
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
        ];
        expect(Helper.getAllOrderColumns()).toEqual(result);

    })

    describe('Checking addOrder Function', () => {

        test('should be able to add order to array if not there ', () => {
            const newOrder = { item: "Turkey", price: 10.99, quantity: 0, total: 10.99 };
            const allOrders = Helper.addOrder([], newOrder);
            expect(allOrders.length).toEqual(1);
            expect(allOrders[0].quantity).toEqual(1);
        })
        test('should be able to update array if the item is found', () => {
            const newOrder = { item: "Turkey", price: 10.99, quantity: 0, total: 10.99 };
            const allOrders = [
                { item: "Turkey", price: 10.99, quantity: 2, total: 21.98 },
                { item: "Vegetarian", price: 8.99, quantity: 1, total: 8.99 },
                { item: "BLT", price: 9.99, quantity: 1, total: 9.99 }
            ];
            const newOrders = Helper.addOrder(allOrders, newOrder);
            expect(newOrders.length).toEqual(3);
            let index = newOrders.map(el => el.item).indexOf(newOrder.item);
            expect(newOrders[index].quantity).toEqual(3);
            expect(newOrders[index].total).toEqual(newOrder.total + 21.98);
        })

    })
    describe('Checking FormatAllOrder  function', () => {

        test('should handle empty Array', () => {
            const result = [];
            expect(Helper.formatAllOrder([])).toEqual(result)
        })
        test('should handle not an array Paramter', () => {
            expect(Helper.formatAllOrder({})).toEqual([])
        })
        test('should format the orders', () => {
            const order = [{ name: "test", price: 465 }];
            const result = [{ item: 'test', price: 465, quantity: 0, total: 0 }];
            expect(Helper.formatAllOrder(order)).toEqual(result)
        })
        test('should handle if price is not given', () => {
            const order = [{ name: "test" }];
            const result = [{ item: 'test', price: 0, quantity: 0, total: 0 }];
            expect(Helper.formatAllOrder(order)).toEqual(result)
        })
        
    })

})

