import axios from 'axios';

export const fetchUsers = async (numberOfUsers = 50) => {
  try {
    // First, check local storage for existing users
    const storedUsers = localStorage.getItem('cachedUsers');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }

    // If no local users, fetch from API
    const response = await axios.get(`https://randomuser.me/api/?results=${numberOfUsers}`);
    const apiUsers = response.data.results.map((user) => ({
      id: user.login?.uuid || `user-${Date.now()}-${Math.random()}`,
      name: `${user.name?.title || ''} ${user.name?.first || ''} ${user.name?.last || ''}`,
      email: user.email || 'N/A',
      image: user.picture?.medium || 'https://via.placeholder.com/150',
      location: `${user.location?.street?.name || ''}, ${user.location?.city || ''}, ${user.location?.country || ''}`
    }));

    // Store API users in local storage
    localStorage.setItem('cachedUsers', JSON.stringify(apiUsers));

    return apiUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Function to clear cached users
export const clearCachedUsers = () => {
  localStorage.removeItem('cachedUsers');
};

export const addUserToLocalStorage = (newUser) => {
  // Retrieve existing users from local storage
  const existingUsers = JSON.parse(localStorage.getItem('cachedUsers') || '[]');
  
  // Create a new user with a unique ID
  const userToAdd = {
    ...newUser,
    id: `user-${Date.now()}-${Math.random()}`,
    image: newUser.image || 'https://via.placeholder.com/150'
  };

  // Add the new user to the existing users
  const updatedUsers = [...existingUsers, userToAdd];

  // Save the updated users back to local storage
  localStorage.setItem('cachedUsers', JSON.stringify(updatedUsers));

  return updatedUsers;
};

export const removeUserFromLocalStorage = (userId) => {
  // Retrieve existing users from local storage
  const existingUsers = JSON.parse(localStorage.getItem('cachedUsers') || '[]');
  
  // Filter out the user with the specified ID
  const updatedUsers = existingUsers.filter(user => user.id !== userId);

  // Save the updated users back to local storage
  localStorage.setItem('cachedUsers', JSON.stringify(updatedUsers));

  return updatedUsers;
};