import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numericInput, setNumericInput] = useState(0);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleComparison = ({ target }) => {
    setComparison(target.value);
  };

  const handleNumericInput = ({ target }) => {
    setNumericInput(target.value);
  };

  // criar um array para colunas, guardar um estado para guardar que filtro foi utilizado

  const handleButtonFilter = useCallback(() => {
    if (comparison === 'maior que') {
      const numericValuesFilter = data
        .filter((element) => Number(element[column]) > Number(numericInput));
      setData(numericValuesFilter);
    } else if (comparison === 'menor que') {
      const numericValuesFilter = data
        .filter((element) => Number(element[column]) < Number(numericInput));
      setData(numericValuesFilter);
    } else if (comparison === 'igual a') {
      const numericValuesFilter = data
        .filter((element) => Number(element[column]) === Number(numericInput));
      setData(numericValuesFilter);
    }
  }, [column, comparison, data, numericInput]);

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

  const contextValue = useMemo(() => ({
    data,
    name,
    handleName,
    column,
    handleColumn,
    comparison,
    handleComparison,
    numericInput,
    handleNumericInput,
    handleButtonFilter,
  }), [data, name, column, comparison, numericInput, handleButtonFilter]);

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
