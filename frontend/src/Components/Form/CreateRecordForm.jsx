import React, { useState } from 'react';
import axios from 'axios';

const CreateRecordForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post('http://localhost:8000/api/create/', {
                name: name,
                description: description
            });
            console.log(response.data);
            // Reset form fields or show a success message
        } catch (error) {
            console.error('Error creating record:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name" />
            <input type="text"  required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <button type="submit">Create Record</button>
        </form>
    );
};

export default CreateRecordForm;
