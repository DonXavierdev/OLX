import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function NewItem() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    contactNumber: '',
    image: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:8000/api/newItem/', { ...formData, userId });
      console.log('Form data sent successfully:', response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error sending form data:', error);
      // Handle errors here
    }
  };

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        navigate('/showUserItem');
      }, 1000); // Redirect after 2 seconds
    }
  }, [showSuccess, navigate]);

  return (
    <div>
      {showSuccess && (<Alert severity="success">This is a success Alert.</Alert>)}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="text" title="Only numbers are allowed."pattern="[0-9]*" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Contact Number:
          <input title="Please enter a valid contact number. Only numbers are allowed." type="text" pattern="[0-9]*"  name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" name="image" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewItem;
