import { useState } from 'react';

import { createContext } from 'react';
const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  // tablero aciertos/desaciertos
  const [error, setError] = useState({ show: false, message: '' });

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        cards,
        setCards,
        loading,
        setLoading,
        error,
        setError
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
