import React, { Component } from 'react'

import '../Styles/AllOrders.css';
import { Link } from 'react-router-dom';
import Table from './Table'
// ... your class implementation


export default class AllOrders extends Component {


   
    
    render() {
        const headings = [
            "Item name",
            "Quantity",
            "Price",
            "Total"
        ];
        
        const cart = [
            { name: "asd", quantity: 3, price: 45, total: 57 },
            { name: "asad", quantity: 3, price: 45, total: 57 }
        ]
        return (
            <div>
                <h1 className="mainHeading">All Sandwich Orders</h1>

                <div className="buttonDiv">
                    <Link
                        to="/NewOrder"
                        info={cart}
                    >
                        <button className="orderButton">
                            Create Order
                         </button>
                    </Link>
                </div>
                <section>
                    <div>
                        <Table
                            headings={headings }
                            cart={cart}
                        />
                    </div>
                </section>
            </div>
        )
    }
}
