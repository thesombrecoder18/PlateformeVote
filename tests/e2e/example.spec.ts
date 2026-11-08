import { test, expect } from "@playwright/test"

test("page d accueil FR", async ({ page }) => {
  await page.goto("/fr")
  await expect(page.getByRole("main")).toBeVisible()
})

test("page d accueil EN", async ({ page }) => {
  await page.goto("/en")
  await expect(page.getByRole("main")).toBeVisible()
})
