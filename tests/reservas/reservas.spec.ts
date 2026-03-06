import { test, expect } from '@playwright/test';

test('Deve conseguir fazer uma reserva com sucesso!', async ({ page }) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill('teste@dnc.com.br')
  await page.getByLabel(/^senha/i).fill('1234');
  await page.getByRole('button', { name: /^continuar/i}).click();

  await expect(page).toHaveURL("http://localhost:3001/")
  await page.getByText(/hotel teste 1/i).click()

  await expect(page).toHaveURL("http://localhost:3001/hotels/1")

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
  const nextWeek = new Date(new Date().setDate(today.getDate() + 7));

  const formattedDate = (date: Date)=> {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear())
    return `${year}-${month}-${day}`
  }

  await page.getByRole('textbox', { name: /data de check-in/i}).fill(formattedDate(tomorrow))
  await page.getByRole('textbox', { name: /data de check-out/i}).fill(formattedDate(nextWeek))

  await page.getByText(/Reservar/i).click();
  await expect(page).toHaveURL('http:localhost:3001/reservas/1/sucesso');

  expect(page.getByText(/Sua solicitação de reserva foi enviada com sucesso!/i)).toBeDefined()
  

});

