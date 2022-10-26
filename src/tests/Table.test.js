import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando componente Table', () => {
  test('1) Se tabela é preenchida com as informações dos planetas', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(11);
    }, {timeout: 60000})

    
      const firstPlanet = screen.getByText(/tatooine/i);
      expect(firstPlanet).toBeInTheDocument();

      const lastPlanet = screen.getByRole('cell', { name: /kamino/i });
      expect(lastPlanet).toBeInTheDocument();

      const dagobahClimate = screen.getByText(/kamino/i);
      expect(dagobahClimate).toBeInTheDocument();
    
  });

  test('2) Se possível digitar no input name', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(11);
    }, {timeout: 60000})

    const name = 'Hoth';
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();

    userEvent.type(nameInput, name);

    
      const planet = screen.getByText(/hoth/i);
      expect(planet).toBeInTheDocument();
    
  });

  jest.setTimeout(600000)
  test('3) Se o botão de filtro funciona', async () => {
    render(<App />);
    const columnOption = 'diameter';
    const operatorOption = 'menor que';
    const numericValue = '10000';

    userEvent.selectOptions(screen.getByTestId('column-filter'), columnOption);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), operatorOption);

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(11);
    }, {timeout: 60000})

    const numericInput = screen.getByTestId('value-filter');
    userEvent.type(numericInput, numericValue);

    const filterButton = screen.getByTestId('button-filter')
    expect(filterButton).toBeInTheDocument();

    userEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(4);
    }, {timeout: 60000})
  
  }, 130000);

  test('4) Se o botão de filtro funciona', async () => {
    render(<App />);
    const columnOption = 'population';
    const operatorOption = 'maior que';
    const numericValue = '1000';

    userEvent.selectOptions(screen.getByTestId('column-filter'), columnOption);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), operatorOption);

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(11);
    }, {timeout: 60000})

    const numericInput = screen.getByTestId('value-filter');
    userEvent.type(numericInput, numericValue);

    const filterButton = screen.getByTestId('button-filter')
    expect(filterButton).toBeInTheDocument();

    userEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(8);
    }, {timeout: 60000})
  
  }, 130000);

  test('5) Se o botão de filtro funciona', async () => {
    render(<App />);
    const columnOption = 'surface_water';
    const operatorOption = 'igual a';
    const numericValue = '100';

    userEvent.selectOptions(screen.getByTestId('column-filter'), columnOption);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), operatorOption);

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(11);
    }, {timeout: 60000})

    const numericInput = screen.getByTestId('value-filter');
    userEvent.type(numericInput, numericValue);

    const filterButton = screen.getByTestId('button-filter')
    expect(filterButton).toBeInTheDocument();

    userEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(3);
    }, {timeout: 60000})
  
  }, 130000);
})