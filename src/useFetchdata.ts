import { useState, useEffect } from 'react';

const fetchData = async () => {
const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0FrWEWjkIHUNsC4600jWk1VQkbS6a5bJmwZXmNAaG-p5BQd_hhEa_MlVGX5mgOivDTAjt-U6WN4KK/pub?gid=0&single=true&output=csv');
const data = await response.text();
return data;
};

const formatCSV = (csv: string) => {
const rows = csv.split('\n').slice(1);
return rows.map((row) => {
    const [product, price, quantity, unit] = row.split(',');
    const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    const formattedItem = { 
    product: capitalize(product), 
    price: parseFloat(price), 
    quantity: parseInt(quantity, 10), 
    unit: unit.trim() 
    };
    return formattedItem;
});
};

const useFetchData = () => {
const [data, setData] = useState<{ product: string, price: number, quantity: number, unit: string }[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchDataAndSet = async () => {
    try {
        const csvData = await fetchData();
        const formattedData = formatCSV(csvData);
        setData(formattedData);
    } catch (error) {
        console.log(error);
        setError('Error fetching data');
    } finally {
        setLoading(false);
    }
    };
    fetchDataAndSet();
}, []);

return { data, loading, error };
};

export{useFetchData};