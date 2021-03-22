import React, { Component } from 'react'

import '../Styles/AllOrders.css';
import { Link } from 'react-router-dom';

// ... your class implementation

var cart= { id:1,value:"Asd"};

export default class AllOrders extends Component {

  

    render() {
        return (
            <div>
                <h1 className="mainHeading">All New Sandwich Delivery Services</h1>

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
                    <div className="tbl-header">
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="tbl-content">
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <tbody>
                              
                                <tr>
                                    <td>AAC</td>
                                    <td>AUSTRALIAN COMPANY </td>
                                    <td>$1.38</td>
                                    <td>+2.01</td>
                                    <td>-0.36%</td>
                                </tr>
                    

                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        )
    }
}
