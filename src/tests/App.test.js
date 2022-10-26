import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('1) Se o título "Projeto Star Wars - Trybe" aparece na tela', () => {
  render(<App />);
  const ttitle = screen.getByRole('heading', { name: /projeto star wars \- trybe/i });
  expect(ttitle).toBeInTheDocument();
});
