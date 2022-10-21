import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Table() {
  const { data, name, handleName } = useContext(GlobalContext);

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
          {data?.filter((planet) => planet.name.toLowerCase().includes(name))
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
