import React, { useEffect, useState } from 'react';
import SandwichDeliverrServices from './SandwichDeliverrServices';
import '../Styles/sandwich-deliverr.css'
 
const SandwichDeliverr = () => {
    const [inventory, setInventory] = useState([]);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        console.log('mounted:');
        getInventory();        
    }, [loading]);
    
    const getInventory = () => {
        SandwichDeliverrServices.getInventory().then( inventoryDetails => {
            setInventory(inventoryDetails.data.inventory);
            setMenu(inventoryDetails.data.menu);
            setLoading(false);
        });
    }

    return (
        <div className="flex-container">            
            <div>inventory: {inventory}</div>
            <>
            {props.info}
                {menu.map( menuItem => <>
                    <div key={menuItem.name} className="flex-item"> 
                        <span>{menuItem.name}</span> - <span>{menuItem.price}</span>
                    </div>
                    </>
                )}
            </>
        </div>
    );
}
 
export default SandwichDeliverr;