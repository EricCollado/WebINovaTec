import{ createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [clientID, setClientID] = useState(null);
 
  const updateClientID = (newClientID) => {
    setClientID(newClientID);
  };
  return (
    <ClientContext.Provider value={{ clientID, updateClientID  }}>
      {children}
    </ClientContext.Provider>
  );
};

ClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ClientContext, ClientProvider };
