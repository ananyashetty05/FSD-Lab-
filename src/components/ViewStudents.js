import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditStudent from './EditStudent';
import './ViewStudents.css';

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/student/view');
      setStudents(response.data);
      setMessage('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:3000/student/delete/${id}`);
        setMessage('✓ Student deleted successfully');
        fetchStudents();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage(`✗ Error: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  const handleUpdateComplete = () => {
    setEditingId(null);
    fetchStudents();
    setMessage('✓ Student updated successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return <div className="card"><p>Loading students...</p></div>;
  }

  return (
    <div className="card view-students-card">
      <h2>View Students</h2>
      {message && <p className={`message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</p>}

      {editingId && (
        <EditStudent
          studentId={editingId}
          onComplete={handleUpdateComplete}
          onCancel={() => setEditingId(null)}
        />
      )}

      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <div className="students-list">
          {students.map((student) => (
            <div key={student._id} className="student-card">
              <div className="student-info">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Course:</strong> {student.course}</p>
              </div>
              <div className="student-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(student._id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn-refresh" onClick={fetchStudents}>
        Refresh
      </button>
    </div>
  );
}

export default ViewStudents;
