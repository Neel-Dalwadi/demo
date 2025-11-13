import axios from 'axios';

const api = axios.create({
    baseURL:"https://v6.exchangerate-api.com/v6/90274ccd818052ff8b1893db"

})

export const getCurrency = async(fromCurrency, toCurrency, amount) => {
    return await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
}