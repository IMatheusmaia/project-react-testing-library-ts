import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Switch de teste do requisito 1 - Componente App', () => {
  it('testa se App contem os seguintes links: home, about, favorite pokemon', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();

    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favorite).toBeInTheDocument();
  });

  it('testa se ao clinar no link home é redirecionado para rota /', async () => {
    const { user } = renderWithRouter(<App />);
    await user.click(screen.getByRole('link', { name: /home/i }));
    const titleHome = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(titleHome).toBeInTheDocument();
  });

  it('testa se ao clinar no link favorite pokémon é redirecionado para rota /favorites', async () => {
    const { user } = renderWithRouter(<App />);
    await user.click(screen.getByRole('link', { name: /favorite pokémon/i }));
    const titleFav = screen.getByRole('heading', {
      name: /favorite pokémon/i,
    });
    expect(titleFav).toBeInTheDocument();
  });

  it('testa se a aplicação redireciona para página NotFound ao escrever uma rota desconhecida', () => {
    renderWithRouter(<App />, { route: '/any' });
    const titleNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(titleNotFound).toBeInTheDocument();
  });
});
