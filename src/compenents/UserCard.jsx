import React, { useState } from 'react';
import UserModal from './UserModal';

const UserCard = ({ user, setUsers }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));  // Make sure `setUsers` is here
    }
  };

  return (
    <div className="user-card">
      <img src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.location}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {isEditing && (
        <UserModal user={user} setIsEditing={setIsEditing} setUsers={setUsers} />
      )}
    </div>
  );
};

export default UserCard;

