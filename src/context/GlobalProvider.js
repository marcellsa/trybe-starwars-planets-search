import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numericInput, setNumericInput] = useState(0);
  const [columnOptions, setColumnOptios] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [filtersUsed, setFiltersUsed] = useState([]);

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

  const handleButtonFilter = useCallback(() => {
    console.log(data);
    if (comparison === 'maior que') {
      const numericValuesFilter = data
        .filter((element) => Number(element[column]) > Number(numericInput));
      setData(numericValuesFilter);
      setFiltersUsed([...filtersUsed, { column, comparison, numericInput }]);
      setColumnOptios(() => columnOptions.filter((option) => option !== column));
      setColumn(columnOptions[0]);
    } else if (comparison === 'menor que') {
      const numericValuesFilter = data
        .filter((element) => Number(element[column]) < Number(numericInput));
      setData(numericValuesFilter);
      setFiltersUsed([...filtersUsed, { column, comparison, numericInput }]);
      setColumnOptios(() => columnOptions.filter((option) => option !== column));
      setColumn(columnOptions[0]);
    } else {
      const numericValuesFilter = data
        .filter((element) => Number(element[column]) === Number(numericInput));
      setData(numericValuesFilter);
      setFiltersUsed([...filtersUsed, { column, comparison, numericInput }]);
      setColumnOptios(() => columnOptions.filter((option) => option !== column));
      setColumn(columnOptions[0]);
    }
  }, [column, comparison, data, numericInput, filtersUsed, columnOptions]);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const resultsWoResidentsColumn = results.map(({ residents, ...obj }) => obj);
      setData(resultsWoResidentsColumn);
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
    columnOptions,
    filtersUsed,
  }), [data, name, column, comparison, numericInput,
    handleButtonFilter, columnOptions, filtersUsed]);

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
