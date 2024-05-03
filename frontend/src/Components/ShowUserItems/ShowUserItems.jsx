import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowUserItems = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:8000/api/showUserItems/?userId=${userId}`);
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
                    {data.map((item, index) => (
                            <li key={index}>
                                <h3>{item.name}</h3>
                                <p>Description: {item.description}</p>
                                <p>Price: ${item.price}</p>
                                <p>Category: {item.category}</p>
                                <p>Contact Number: {item.contact_number}</p>
                            </li>
                        ))}
                </ul>
            )}
        </div>

        </div>
    );
};

export default ShowUserItems;
