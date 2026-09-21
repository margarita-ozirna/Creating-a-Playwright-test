// spec: specs/instructions-search.md
import { expect, test } from '@playwright/test';
import { InstructionsPage } from '../pages/instructions.page';
import { MainPage } from '../pages/main.page';

test.describe('Гість шукає інструкції для BMW X5', () => {
  test('Гість знаходить інструкції для BMW X5', async ({ page }) => {
    const mainPage = new MainPage(page);
    const instructionsPage = new InstructionsPage(page);

    // 1. Відкрити головну сторінку і ввійти як гість.
    await mainPage.openAsGuest();
    await expect(mainPage.exactGuestLogInButton).toBeVisible();

    // 2. Переконатися, що пункт Instructions доступний.
    await expect(instructionsPage.instructionsLink).toBeVisible();

    // 3. Перейти до Instructions через пункт меню.
    await instructionsPage.open();
    await expect(instructionsPage.instructionsHeading).toBeVisible();
    await expect(instructionsPage.brandButton).toBeVisible();
    await expect(instructionsPage.modelButton).toBeVisible();
    await expect(instructionsPage.ttButton).toBeVisible();
    await expect(instructionsPage.searchButton).toBeVisible();

    // 4. У Brand вибрати BMW, у Model вибрати X5.
    await instructionsPage.search('BMW', 'X5');
    await expect(instructionsPage.selectedModelButton('X5')).toBeVisible();

    // 5. Натиснути Search.
    const results = instructionsPage.results('BMW X5');
    await expect(results.cards.first()).toBeVisible();

    // 6. Для кожної показаної картки перевірити її назву.
    // 7. Для кожної показаної картки перевірити дію завантаження.
    for (let index = 0; index < await results.cards.count(); index += 1) {
      await expect(results.carNames.nth(index)).toBeVisible();
      await expect(results.downloadLinks.nth(index)).toBeVisible();
    }
  });
});
