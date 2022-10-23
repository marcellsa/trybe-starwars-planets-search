import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Table() {
  const { data, name, handleName, column, handleColumn, comparison, handleComparison,
    numericInput, handleNumericInput, handleButtonFilter } = useContext(GlobalContext);

  return (
    <main>
      <h4>Projeto Star Wars - Trybe</h4>
      <form>
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ handleName }
          />
        </label>
      </form>

      <form>
        <label htmlFor="column">
          Coluna
          <select
            data-testid="column-filter"
            name="column"
            id="column"
            value={ column }
            onChange={ handleColumn }
          >
            <option valeu="population">population</option>
            <option valeu="orbital_period">orbital_period</option>
            <option valeu="diameter">diameter</option>
            <option valeu="rotation_period">rotation_period</option>
            <option valeu="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="comparison">
          Operador
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="comparison"
            value={ comparison }
            onChange={ handleComparison }
          >
            <option valeu="maior que">maior que</option>
            <option valeu="menor que">menor que</option>
            <option valeu="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="numericInput">
          <input
            data-testid="value-filter"
            type="number"
            name="numericInput"
            id="numericInput"
            value={ numericInput }
            onChange={ handleNumericInput }
          />
        </label>

        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleButtonFilter }
        >
          Filtrar

        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data?.filter((planet) => planet.name.toLowerCase()
            .includes(name.toLowerCase()))
            .map((info) => (
              <tr key={ info.name }>
                <td>{info.name}</td>
                <td>{info.rotation_period}</td>
                <td>{info.orbital_period}</td>
                <td>{info.diameter}</td>
                <td>{info.climate}</td>
                <td>{info.gravity}</td>
                <td>{info.terrain}</td>
                <td>{info.surface_water}</td>
                <td>{info.population}</td>
                <td>{info.films.map((film) => (<p key={ film }>{film}</p>))}</td>
                <td>{info.created}</td>
                <td>{info.edited}</td>
                <td>{info.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
