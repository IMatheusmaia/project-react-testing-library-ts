import { screen, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemon } from '../pages';

describe('Switch de teste do requisito 3', () => {
  it('Testa se uma mensagem específica é exibida quando não há pokemon favorito', () => {
    render(<FavoritePokemon />);
    const notFavorite = screen.getByText(/no favorite pokémon found/i);
    expect(notFavorite).toBeInTheDocument();
  });

  it('Testa se uma mensagem específica compatível é exibida para um pokemon favoritado', async () => {
    const { user } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    await user.click(details);
    const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
    await user.click(favoritePokemon);
    const favLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    await user.click(favLink);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
