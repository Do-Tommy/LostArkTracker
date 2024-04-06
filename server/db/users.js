const users = [
  {
    id: 1,
    username: 'test123',
    password: 'test123'
  },
  {
    id: 2,
    username: 'ryan123',
    password: 'test123'
  },

  {
    id: 3,
    username: 'tommy123',
    password: 'test123'
  },
  {
    id: 4,
    username: 'kris123',
    password: 'test123'
  },

];
 
export function getUserByID(id) {
  for (const user of users) {
    if (user.id === id) {
      return user;
    }
  }
  return null;
}

export function getUserByUsername(username) {
  for (const user of users) {
    if (user.username === username) {
      return user;
    }
  }
  return null;
}