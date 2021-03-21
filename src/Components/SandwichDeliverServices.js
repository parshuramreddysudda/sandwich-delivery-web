import axios from "axios"
const SandwichDeliverrServices = {
    getInventory
}

function getInventory() {
    return axios.get('data.json').then(invertoryResponse => {
        return Promise.resolve(invertoryResponse);
    }); 
}
 
export default SandwichDeliverrServices;