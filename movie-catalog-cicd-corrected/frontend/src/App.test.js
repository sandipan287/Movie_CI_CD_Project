import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi' }]) }));
});

afterEach(() => jest.restoreAllMocks());

test('renders movie returned by the API', async () => {
  render(<App />);
  expect(await screen.findByText('Inception')).toBeInTheDocument();
});
