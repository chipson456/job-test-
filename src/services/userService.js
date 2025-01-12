import axios from 'axios';

export const fetchUsers = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=10');
    const users = response.data.results;
console.log(users);

    return users.map((user) => ({
      id: user.login?.uuid || 'N/A', // Default value if `uuid` is missing
      name: `${user.name?.title || ''} ${user.name?.first || ''} ${user.name?.last || ''}`, // Fallback if name fields are missing
      email: user.email || 'N/A', // Default value if email is missing
      image: user.picture?.medium || '', // Empty string if picture is missing
      location: `${user.location?.street?.name || ''}, ${user.location?.city || ''}, ${user.location?.country || ''}`, // Fallback for location fields
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Return an empty array if there is an error
  }
};
