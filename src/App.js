import React, { useEffect, useState } from 'react';
import Header from './compenents/Header';
import Footer from './compenents/Footer';
import UserList from './compenents/UserList'; // Fixed typo in import path
import SearchBar from './compenents/SearchBar'; // Ensure SearchBar is correct
import AddUserModal from './compenents/AddUserModal';
import { fetchUsers, addUserToLocalStorage, removeUserFromLocalStorage } from './services/userService';
import './compenents/matan/UserList.css'; // Fixed typo in import path
import './compenents/matan/App.css'; // Fixed typo in import path
import './compenents/matan/Footer.css'; // Fixed typo in import path
import './compenents/matan/Header.css'; // Fixed typo in import path

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers(50);
      setUsers(data);
      setFilteredUsers(data);
    };
    getUsers();
  }, []);

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

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleSave = (newUser) => {
    const updatedUsers = addUserToLocalStorage(newUser);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = removeUserFromLocalStorage(userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  return (
    <div className="app">
      <Header />
      <main className="app-body">
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

        <button className="add-user-button" onClick={handleAddUser}>
          Add User
        </button>

        <UserList 
          users={filteredUsers} 
          setUsers={setUsers} 
          onDeleteUser={handleDeleteUser} 
        />

        <AddUserModal 
          isOpen={isModalOpen} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;