import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const {
  id,
  name,
  averageWeight: { value, measurementUnit },
} = pokemonList[0];

describe('Switch de teste do requisito 6 - Componente Pokemon', () => {
  it('testa se é renderizado um card com as informações de determinado pokemon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByText(/pikachu/i);
    const typePokemon = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const imagePokemon = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokemon).toBeInTheDocument();
    expect(typePokemon.innerHTML).toBe('Electric');
    expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(imagePokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('testa se o card contem um link de navegação para exibir detalhes do pokemon.', async () => {
    const { user } = renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailLink).toHaveAttribute('href', '/pokemon/25');
    await user.click(detailLink);
    expect(window.location.href).toContain('/pokemon/25');
  });

  it('testa se existe ícones de estrela nos pokemons favoritados', async () => {
    const { user } = renderWithRouter(<App />, { route: `/pokemon/${id}` });

    const check = screen.getByLabelText(/pokémon favoritado?/i);

    await user.click(check);
    screen.getByRole('img', { name: `${name} is marked as favorite` });
  });
});
