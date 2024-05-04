import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Requests = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:8000/api/myPurchases/?userId=${userId}`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
             <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map((purchase, index) => (
                        <div key={index}>
                            <h3>Item Name: {purchase.item_details.name}</h3>
                            <p>Description: {purchase.item_details.description}</p>
                            <p>Item ID: {purchase.item_details.id}</p>
                            <p>Price: ${purchase.item_details.price}</p>
                            <p>Category: {purchase.item_details.category}</p>
                            <p>Contact Number: {purchase.item_details.contact_number}</p>
                            <p>Buyer Name: {purchase.buyer_name}</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>

        </div>
    );
};

export default Requests;
