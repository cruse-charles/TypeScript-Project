import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '8e2b298aa1464c4088daf249235371a8'
    }
})