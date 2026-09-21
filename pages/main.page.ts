import { type Locator, type Page } from '@playwright/test';

export class MainPage {
  readonly guestLogInButton: Locator;
  readonly exactGuestLogInButton: Locator;
  readonly garageHeading: Locator;

  constructor(private readonly page: Page) {
    this.guestLogInButton = page.getByRole('button', { name: /guest log in/i });
    this.exactGuestLogInButton = page.getByRole('button', {
      name: 'Guest log in',
      exact: true,
    });
    this.garageHeading = page.getByRole('heading', { name: /garage/i });
  }

  async openAsGuest(): Promise<void> {
    await this.page.goto('/');
    await this.exactGuestLogInButton.click();
  }
}
