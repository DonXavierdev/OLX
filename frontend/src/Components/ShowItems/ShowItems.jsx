import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowItems = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:8000/api/showItems/?userId=${userId}`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleButton = async (itemId) => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post(`http://localhost:8000/api/purchase/?userId=${userId}&itemId=${itemId}`);
            console.log('Purchase sent', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
            // Handle errors here
        }
    };

    const handleNameSearch = (event) => {
        setSearchName(event.target.value);
    };

    const handleCategorySearch = (event) => {
        setSearchCategory(event.target.value);
    };

    const filteredItems = data.filter(item => {
        return (
            item.name.toLowerCase().includes(searchName.toLowerCase()) &&
            item.category.toLowerCase().includes(searchCategory.toLowerCase())
        );
    });

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchName}
                    onChange={handleNameSearch}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search by category..."
                    value={searchCategory}
                    onChange={handleCategorySearch}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Contact Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.contact_number}</td>
                            <td><button onClick={() => handleButton(item.id)}>Buy</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowItems;
