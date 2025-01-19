import React, { useState } from 'react';
import UserModal from './UserModal';

const UserCard = ({ user, setUsers,onDeleteUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  
  const handleDelete = () => {
    // Confirm deletion
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      // Call the onDeleteUser function with the user's ID
      console.log('Attempting to delete user:', user.id); // Debug log
      onDeleteUser(user.id);
    }
  };

  const handleEdit = (updatedUserData) => {
    // Update users in local state
    setUsers((prevUsers) => 
      prevUsers.map((u) => 
        u.id === user.id 
          ? { 
              ...u, 
              name: updatedUserData.name || u.name,
              email: updatedUserData.email || u.email,
              location: updatedUserData.location || u.location
            } 
          : u
      )
    );

    // Update users in local storage
    const storedUsers = JSON.parse(localStorage.getItem('cachedUsers') || '[]');
    const updatedStoredUsers = storedUsers.map((u) => 
      u.id === user.id 
        ? { 
            ...u, 
            name: updatedUserData.name || u.name,
            email: updatedUserData.email || u.email,
            location: updatedUserData.location || u.location
          } 
        : u
    );
    
    // Save updated users to local storage
    localStorage.setItem('cachedUsers', JSON.stringify(updatedStoredUsers));

    // Close the editing modal
    setIsEditing(false);
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
        <UserModal 
          user={user} 
          setIsEditing={setIsEditing} 
          onSave={handleEdit} 
        />
      )}
    </div>
  );
};

export default UserCard;