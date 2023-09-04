import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Switch de teste do requisito 5 - Componente Pokedex', () => {
  it('testa se o componente Pokedex contem um título h2 com o texto específico', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      name: /encountered pokémon/i });
    expect(h2).toBeInTheDocument();
  });

  it('testa se o próximo pokemon da lista é exibido ao click', async () => {
    const { user } = renderWithRouter(<App />);
    const next = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[1].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[2].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[3].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[4].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[5].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[6].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[7].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[8].name)).toBeInTheDocument();
    await user.click(next);
    expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
  });

  it('testa se o componente Pokedex tem botões de filtro', async () => {
    const { user } = renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const buttonA = screen.getByRole('button', { name: 'All' });
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });

    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    expect(buttonA).toBeInTheDocument();
    await user.click(buttonFire);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    await user.click(buttonA);
    expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[1].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[2].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[3].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[4].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[5].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[6].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[7].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[8].name)).toBeInTheDocument();
    await user.click(buttonNext);
    expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
  });

  it('testa se o componente Pokedex contem o botão de reset do filtro', async () => {
    const { user } = renderWithRouter(<App />);
    const reset = screen.getByRole('button', {
      name: /all/i,
    });
    expect(reset).toBeInTheDocument();
    const fireButton = screen.getByRole('button', {
      name: /fire/i,
    });
    await user.click(fireButton);
    const fireType = screen.getByText(/charmander/i);
    expect(fireType).toBeInTheDocument();
    await user.click(reset);
    const first = screen.getByText(/pikachu/i);
    expect(first).toBeInTheDocument();
  });
});
