import React, { useState, useEffect } from 'react';

const UserModal = ({ user, setIsEditing, setUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
  });
  const [error, setError] = useState('');

  // Initialize formData if user is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        location: user.location,
      });
    }
  }, [user]);

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.location) {
      return 'All fields are required.';
    }
    if (formData.name.length < 3) {
      return 'Name must be at least 3 characters.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Email must be valid.';
    }
    return '';
  };

  const handleSave = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...formData } : u))
    );
    setIsEditing(false);
  };

  if (!user) return null; // If user is undefined, render nothing

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default UserModal;
