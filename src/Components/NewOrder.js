import React, { useEffect, useState } from 'react';
import SandwichDeliverrServices from './SandwichDeliverServices'
import '../Styles/sandwich-deliverr.css'
import Table from './Table';

const SandwichDeliver = () => {
    const [inventory, setInventory] = useState([]);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('mounted:');
        getInventory();
    }, [loading]);

    const getInventory = () => {
        SandwichDeliverrServices.getInventory().then(inventoryDetails => {
            setInventory(inventoryDetails.data.inventory);
            setMenu(inventoryDetails.data.menu);
            setLoading(false);
        });
    }
    const headings = [
        "Item name",
        "Quantity",
        "Price",
        "Total"
    ];
    function getItemName(name) {
        console.log(name)
        
    }

    const cart = [
        { name: "asd", quantity: 3, price: 45, total: 57 },
        { name: "asad", quantity: 3, price: 45, total: 57 }
    ]

    return (
        <div >
            {/* <div>inventory: {inventory}</div> */}
            <>
                <div className="flex-container">
                    {menu.map(menuItem => (
                        <button key={menuItem.name} onClick={() => getItemName(menuItem.name)}>
                            <span>{menuItem.name}</span> - <span>{menuItem.price}</span>
                        </button>
                    ))}
                </div>
                <div className="">
                </div>
                <h2 className="mainHeading">Create your Order</h2>
                <div className="table">
                    <Table
                        tableData={cart}
                        headings={headings}
                    />
                </div>

            </>
        </div>
    );
}

export default SandwichDeliver;