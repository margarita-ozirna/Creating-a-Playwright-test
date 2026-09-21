// spec: specs/add-car.md
import { expect, test } from '@playwright/test';

test.describe('Guest adds Audi TT to Garage', () => {
  test('Guest adds Audi TT to Garage', async ({ page }) => {
    const brand = 'Audi';
    const model = 'TT';
    const mileage = '12000';
    const carName = 'Audi TT';

    const guestLogInButton = page.getByRole('button', {
      name: 'Guest log in',
      exact: true,
    });
    const addCarButton = page.getByRole('button', { name: 'Add car', exact: true });
    const brandSelect = page.getByRole('combobox', { name: 'Brand' });
    const modelSelect = page.getByRole('combobox', { name: 'Model' });
    const mileageInput = page.getByRole('spinbutton', { name: 'Mileage' });
    const addButton = page.getByRole('button', { name: 'Add', exact: true });

    // 1. Відкрити головну сторінку і ввійти як гість.
    await page.goto('/');
    await guestLogInButton.click();

    // 2. Переконатися, що у Garage доступна кнопка Add car.
    await expect(addCarButton).toBeVisible();

    // 3. Натиснути Add car.
    await addCarButton.click();

    // 4. У полі Brand обрати Audi.
    await brandSelect.selectOption({ label: brand });

    // 5. Переконатися, що поле Model стало доступним для вибору залежної моделі.
    await expect(modelSelect).toBeEnabled();

    // 6. У полі Model обрати TT.
    await modelSelect.selectOption({ label: model });

    // 7. У полі Mileage ввести 12000.
    await mileageInput.fill(mileage);

    // 8. Натиснути кнопку Add.
    await addButton.click();

    // 9. Знайти картки автомобілів у Garage.
    const cards = page.getByRole('listitem');

    // 10. Переконатися, що показано рівно одну картку.
    await expect(cards).toHaveCount(1);

    const card = cards.filter({
      has: page.getByText(carName, { exact: true }),
    });

    // 11. Перевірити на картці назву Audi TT.
    await expect(card.getByText(carName, { exact: true })).toBeVisible();

    // 12. Перевірити, що біля назви Audi TT показано емблему автомобіля.
    await expect(card.getByRole('img', { name: model, exact: true })).toBeVisible();

    // 13. Перевірити на картці пробіг 12000.
    await expect(card.getByRole('spinbutton')).toHaveValue(mileage);

    // 14. Перевірити наявність кнопки редагування.
    await expect(card.locator('button.car_edit')).toBeVisible();

    // 15. Перевірити наявність кнопки Add fuel expense.
    await expect(card.getByRole('button', { name: 'Add fuel expense', exact: true })).toBeVisible();

    // 16. Перевірити наявність кнопки Update.
    await expect(card.getByRole('button', { name: 'Update', exact: true })).toBeVisible();
  });
});
