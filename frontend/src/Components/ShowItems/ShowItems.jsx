import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowItems = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from Django backend
                const response = await axios.get('http://localhost:8000/api/showItems/');
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
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.category}</td>
                        <td>{item.contact_number}</td>
                    </tr>
                    ))}
                </tbody>
                </table>

        </div>
    );
};

export default ShowItems;
