import React, { useEffect, useState } from 'react';
import Header from './compenents/Header';
import Footer from './compenents/Footer';
import UserList from './compenents/UserList'; // Fixed typo in import path
import SearchBar from './compenents/SearchBar'; // Ensure SearchBar is correct
import AddUserModal from './compenents/AddUserModal';
import { fetchUsers } from './services/userService';
import './compenents/matan/UserList.css'; // Fixed typo in import path
import './compenents/matan/App.css'; // Fixed typo in import path
import './compenents/matan/Footer.css'; // Fixed typo in import path
import './compenents/matan/Header.css'; // Fixed typo in import path

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    };
    getUsers();
  }, []);

  // Search users based on query
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.id.includes(query) ||
          user.location.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Add user button click handler
  const handleAddUser = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Save new user handler
  const handleSave = (newUser) => {
    // Add unique ID to the new user if not already present
    const userWithId = { ...newUser, id: Date.now().toString() };
  
    // Update the users state
    setUsers((prev) => {
      const updatedUsers = [...prev, userWithId];
      setFilteredUsers(updatedUsers);  // Update filteredUsers too
      return updatedUsers;
    });
  
    // Close the modal after saving
    setIsModalOpen(false);
  };
  

  // Close the modal without saving
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Header />
      <main className="app-body">
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

        <button className="add-user-button" onClick={handleAddUser}>
          Add User
        </button>

        <UserList users={filteredUsers} setUsers={setUsers} />

        {/* Add User Modal */}
        <AddUserModal isOpen={isModalOpen} onSave={handleSave} onCancel={handleCancel} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
