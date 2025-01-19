import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, setUsers, onDeleteUser }) => {
  if (!users || users.length === 0) {
    return <p>No users found.</p>; // Display a message if no users are available
  }
  console.log('component', users);

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          setUsers={setUsers} 
          onDeleteUser={onDeleteUser} // Pass the delete handler to UserCard
        />
      ))}
    </div>
  );
};

export default UserList;