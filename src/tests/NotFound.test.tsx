import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Switch de teste do requisito 4 - Componente NotFound', () => {
  it('testando se no componente contem um testo do tipo h2 com um texto específico', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  it('testando se no componente contem uma imagem com texto alternativo', () => {
    renderWithRouter(<NotFound />);
    const alt = screen.getByAltText(
      'Clefairy pushing buttons randomly with text I have no idea what i\'m doing',
    );
    expect(alt).toBeInTheDocument();
  });
});
