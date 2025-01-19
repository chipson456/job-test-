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

    // Update users in local state
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...formData } : u))
    );

    // Update users in local storage
    const storedUsers = JSON.parse(localStorage.getItem('cachedUsers') || '[]');
    const updatedStoredUsers = storedUsers.map((u) => 
      u.id === user.id ? { ...u, ...formData } : u
    );
    localStorage.setItem('cachedUsers', JSON.stringify(updatedStoredUsers));

    // Close the editing modal
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setError('');
  };

  if (!user) return null; // If user is undefined, render nothing

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;