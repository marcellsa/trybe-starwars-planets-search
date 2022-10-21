import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [data, setData] = useState(null);

  const contextValue = useMemo(() => ({
    data,
  }), [data]);

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        const resultsWoResidentsColumn = results.map(({ residents, ...obj }) => obj);
        setData(resultsWoResidentsColumn);
      } catch (error) {
        throw new Error('API REQUEST ERROR');
      }
    };
    requestAPI();
  }, []);

  return (
    <GlobalContext.Provider value={ contextValue }>
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
