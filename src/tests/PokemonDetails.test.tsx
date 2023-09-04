import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

const {
  id,
  name,
  foundAt,
} = pokemonList[0];

describe('Switch de teste do requisito 7 - Componente PokemonDetails', () => {
  it('testa se as informações esperadas são exibidas', () => {
    renderWithRouter(<App />, { route: `/pokemon/${id}` });
    const details = screen.getByRole('heading', { name: `${name} Details` });
    expect(details).toBeInTheDocument();
    const h2 = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(h2).toBeInTheDocument();
    const inteli = screen.getByText(/this intelligent pokémon/i);
    expect(inteli).toBeInTheDocument();
  });

  it('testa a existência de mapa de localização de pokemon', () => {
    renderWithRouter(<App />, { route: `/pokemon/${id}` });

    const imageLoc = screen.getAllByRole('img', { name: `${name} location` });

    expect(screen.getByRole('heading', { level: 2, name: `Game Locations of ${name}` })).toBeInTheDocument();

    const [localA, localB] = foundAt;
    const [imgA, imgB] = imageLoc;

    expect(imageLoc).toHaveLength(foundAt.length);
    expect(imgA).toHaveAttribute('src', localA.map);
    expect(imgB).toHaveAttribute('src', localB.map);

    expect(screen.getByText(localA.location)).toBeInTheDocument();
    expect(screen.getByText(localB.location)).toBeInTheDocument();
  });

  it('testa se um pokemon podes ser favoritado na página de detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route: `/pokemon/${id}` });
    const check = screen.getByLabelText(/pokémon favoritado?/i);
    await user.click(check);
    screen.getByRole('img', { name: `${name} is marked as favorite` });
  });
});
