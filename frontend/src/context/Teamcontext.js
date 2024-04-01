import React, { createContext, useState } from 'react';

const TeamContext = createContext([]);

const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export { TeamContext, TeamProvider };
