import React, { useState,useEffect } from 'react';
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
    const { name, value, files } = e.target;
  
    // If the input is a file input
    if (name === 'image') {
      setFormData({
        ...formData,
        [name]: files[0], 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('image', formData.image); // Append the file

      const response = await axios.post(`http://localhost:8000/api/newItem/?userId=${userId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form data sent successfully:', response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error sending form data:', error);
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="text" title="Only numbers are allowed." pattern="[0-9]*" name="price" value={formData.price} onChange={handleChange} required />
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
          <input required type="file" accept="image/*" name="image" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewItem;
