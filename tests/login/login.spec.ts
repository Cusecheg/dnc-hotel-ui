import { test, expect } from '@playwright/test';

test('Deve realizar a autenticão com sucesso!', async ({ page }) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill('teste@dnc.com.br')
  await page.getByLabel(/^senha/i).fill('1234');
  await page.getByRole('button', { name: /^continuar/i}).click();

  await expect(page).toHaveURL("http://localhost:3001/")

});

test('Deve manter o suário na tela de login caso a senha seja invalida!', async ({ page }) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill('teste@dnc.com.br')
  await page.getByLabel(/^senha/i).fill('12345');
  await page.getByRole('button', { name: /^continuar/i}).click();

  await expect(page).toHaveURL("http://localhost:3001/login")

});


test('Deve pedir para preencher campos obrigatórios', async ({ page }) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill('teste@dnc.com.br')
  await page.getByRole('button', { name: /^continuar/i}).click();

  await expect(page).toHaveURL("http://localhost:3001/login");
  await expect(page.getByLabel(/^senha/i)).toBeFocused();

});