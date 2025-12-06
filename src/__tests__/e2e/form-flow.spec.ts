import { expect, test } from '@playwright/test';

test.describe('Form Flow', () => {
	test('should navigate through all form phases', async ({ page }) => {
		await page.goto('/');

		// Verify we start on the candidate form
		await expect(
			page.getByRole('heading', { name: /candidate/i })
		).toBeVisible();

		// Fill candidate information
		await page.fill('[data-testid="name-input"]', 'Dwight Schrute');
		await page.fill(
			'[data-testid="email-input"]',
			'dwight.schrute@dundermifflin.com'
		);
		await page.fill('[data-testid="phone-input"]', '555-123-4567');

		// Navigate to next phase
		await page.click('[data-testid="next-button"]');

		// Verify we're on the job form
		await expect(page.getByRole('heading', { name: /job/i })).toBeVisible();
	});

	test('should show validation errors for required fields', async ({
		page,
	}) => {
		await page.goto('/');

		// Try to proceed without filling required fields
		await page.click('[data-testid="next-button"]');

		// Should show validation errors
		await expect(page.getByText(/required/i)).toBeVisible();
	});
});
