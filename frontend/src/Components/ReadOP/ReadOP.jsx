import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadOP = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from Django backend
                const response = await axios.get('http://localhost:8000/api/mydata/');
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
            <h2>Data from Django Backend</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.name} - {item.description}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReadOP;
