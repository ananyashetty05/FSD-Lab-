import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditStudent.css';

function EditStudent({ studentId, onComplete, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/student/view/${studentId}`);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        setMessage(`Error loading student: ${error.message}`);
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/student/update/${studentId}`, formData);
      setMessage('✓ Student updated successfully');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.error || error.message}`);
    }
  };

  if (loading) {
    return <p>Loading student data...</p>;
  }

  return (
    <div className="edit-form">
      <h3>Edit Student</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">
            Save Changes
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      {message && <p className={`message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default EditStudent;
