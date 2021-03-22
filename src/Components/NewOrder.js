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
        "Total"
    ]
    const cart=[
        [{name:"name"}]

    ]

    return (
        <div className="flex-container">
            {/* <div>inventory: {inventory}</div> */}
            <>
                {menu.map(menuItem => <>
                    <div key={menuItem.name} className="flex-item">
                        <span>{menuItem.name}</span> - <span>{menuItem.price}</span>
                    </div>
                </>
                )}

                <Table
                    header="Table Heading"
                    tableData={menu}
                    headings={headings}
                />

            </>
        </div>
    );
}

export default SandwichDeliver;