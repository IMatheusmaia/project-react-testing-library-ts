import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Switch de teste do requisito 2', () => {
  it('testando se a página possui condeúdo sobre a pokedex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const about = screen.getByRole('heading', {
      name: /what does this app do\?/i,
    });
    expect(about).toBeInTheDocument();
  });

  it('testando se a página contem um h2 com o conteúdo esperado', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutH2 = screen.getByRole('heading', {
      name: /about pokédex/i, level: 2,
    });
    expect(aboutH2).toBeInTheDocument();
  });

  it('testando se a página contem dois parágrafos na página about', () => {
    renderWithRouter(<App />, { route: '/about' });
    const paragraph1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon\./i,
    );
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them\./i,
    );
    expect(paragraph2).toBeInTheDocument();
  });

  it('tetando se na página about contem uma imagem', () => {
    renderWithRouter(<App />, { route: '/about' });
    const image = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
