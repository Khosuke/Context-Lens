import { test, expect } from '@playwright/test';

test('Context Lens graph loads with valid query', async ({ page }) => {
  await page.goto('/');
  
  const input = page.locator('input');
  const button = page.getByRole('button', { name: 'Rechercher' });

  await input.fill('solutions acoustiques de sonorisation');
  await button.click();

  const graph = page.locator('result-graph');
  await expect(graph).toBeVisible({ timeout: 10000 });

  const dataAttr = await graph.getAttribute('data');
  const data = JSON.parse(dataAttr ?? '{}');

  expect(data.nodes.length).toBeLessThanOrEqual(15);
  expect(data.edges.length).toBeGreaterThan(0);
});
