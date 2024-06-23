import TeaCard, { teaVariants } from './TeaCard.svelte';
import { render } from '@testing-library/svelte';
import { teaTypes } from 'domains';

describe('TeaCard', () => {
  test.each([teaTypes])('should render the tea card', async (teaType) => {
    const canvas = render(TeaCard, {
      tea: {
        id: 'fleur_bleu',
        name: 'Fleur Bleu',
        type: teaType,
        imageUrl: '',
        brand: 'DAHMANN',
        brewingTemperatureInCelsius: 0,
        description: '',
        maximumBrewingTimeInMinutes: 0,
        minimumBrewingTimeInMinutes: 0,
      },
    });

    expect(canvas.getByText('Fleur Bleu')).toBeInTheDocument();
    const leaf = canvas.getByTestId('tea-type-icon');
    expect(leaf).toHaveClass(teaVariants[teaType]);
  });
});
