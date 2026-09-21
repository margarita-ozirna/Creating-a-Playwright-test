import { type Locator, type Page } from '@playwright/test';

export class InstructionsPage {
  readonly instructionsLink: Locator;
  readonly instructionsHeading: Locator;
  readonly brandButton: Locator;
  readonly modelButton: Locator;
  readonly ttButton: Locator;
  readonly searchButton: Locator;
  private readonly cards: Locator;

  constructor(private readonly page: Page) {
    this.instructionsLink = page.getByRole('link', { name: 'Instructions', exact: true });
    this.instructionsHeading = page.getByRole('heading', { name: 'Instructions', exact: true });
    this.brandButton = page.getByRole('button', { name: 'Audi', exact: true });
    this.modelButton = page.getByRole('button', { name: '3', exact: true });
    this.ttButton = page.getByRole('button', { name: 'TT', exact: true });
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.cards = page.getByRole('listitem');
  }

  async open(): Promise<void> {
    await this.instructionsLink.click();
  }

  async search(brand: string, model: string): Promise<void> {
    await this.brandButton.click();
    await this.page.getByText(brand, { exact: true }).click();
    await this.modelButton.click();
    await this.page.getByText(model, { exact: true }).click();
    await this.searchButton.click();
  }

  selectedModelButton(model: string): Locator {
    return this.page.getByRole('button', { name: model, exact: true });
  }

  results(carName: string): { cards: Locator; carNames: Locator; downloadLinks: Locator } {
    return {
      cards: this.cards,
      carNames: this.cards.getByText(new RegExp(`^${carName}$`)),
      downloadLinks: this.cards.getByRole('link', { name: 'Download', exact: true }),
    };
  }
}
