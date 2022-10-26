import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando componente Table', () => {
  test('1) Se tabela é preenchida com as informações dos planetas', () => {
    render(<App />);

    setTimeout(() => {
      const firstPlanet = screen.getByText(/tatooine/i);
      expect(firstPlanet).toBeInTheDocument();

      const lastPlanet = screen.getByRole('cell', { name: /kamino/i });
      expect(lastPlanet).toBeInTheDocument();

      const dagobahClimate = screen.getByText(/kamino/i);
      expect(dagobahClimate).toBeInTheDocument();
    }, 3000);
  });

  test('2) Se possível digitar no input name', () => {
    render(<App />);
    const name = 'Hoth';
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();

    userEvent.type(nameInput, name);

    setTimeout(() => {
      const planet = screen.getByText(/hoth/i);
      expect(planet).toBeInTheDocument();
    }, 3000)
  });

  test('3) Se o botão de filtro funciona', () => {
    render(<App />);
    const columnOption = 'diamenter';
    const operatorOption = 'menor que';
    const numericValue = '10000';

    
    userEvent.selectOptions(screen.getByTestId('column-filter'),[columnOption]);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'),[operatorOption]);
    
    const numericInput = screen.getByTestId('value-filter');
    userEvent.type(numericInput, numericValue);

    const filterButton = screen.getByTestId('button-filter')
    expect(filterButton).toBeInTheDocument();

    userEvent.click(filterButton);
    
    setTimeout(() => {
      const planet1 = screen.getByText(/hoth/i);
      expect(planet1).toBeInTheDocument();
      const planet2 = screen.getByText(/Endor/i);
      expect(planet2).toBeInTheDocument();
      const planet3 = screen.getByText(/tatooine/i);
      expect(planet3).not.toBeInTheDocument();
    }, 3000)
  });
})