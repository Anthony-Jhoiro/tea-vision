import HomePage from './HomePage.svelte';
import { render } from '@testing-library/svelte';
import { Tea } from 'domains';

const tea1: Tea = {
  id: 'fleur_bleu',
  name: 'Fleur Bleu',
  type: 'black_tea',
  imageUrl: '',
  brand: 'DAHMANN',
  brewingTemperatureInCelsius: 0,
  description: '',
  maximumBrewingTimeInMinutes: 0,
  minimumBrewingTimeInMinutes: 0,
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.mock('svelte-routing', async () => ({
      Link: (await import('../../../test/mocks/Link.svelte')).default,
    }));
  });

  test('should render the home page', async () => {
    const canvas = render(HomePage, {
      teas: [tea1],
    });
    expect(canvas.getByText(tea1.name)).toBeInTheDocument();

    const links = canvas.getAllByRole('link');

    const teaLink = links.find(
      (link) => link.getAttribute('href') === `/teas/${tea1.id}`,
    );
    expect(teaLink).toBeInTheDocument();

    const newLink = links.find((link) => link.getAttribute('href') === `/new`);
    expect(newLink).toBeInTheDocument();
  });
});
