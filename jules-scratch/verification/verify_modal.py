import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Go to the page and wait for everything to settle down
        await page.goto("http://localhost:8000/damage_simulator.html", wait_until="networkidle")

        # Wait for the first build tab to be rendered, which implies the container is also present.
        await expect(page.locator(".build-tab").first).to_be_visible()

        # Explicitly wait for the modal overlay to be hidden before interacting with the page
        await expect(page.locator("#custom-modal-overlay")).to_be_hidden()

        # Find the first build tab and click its edit button
        first_build_tab = page.locator(".build-tab").first
        edit_button = first_build_tab.locator(".edit-build-btn")
        await edit_button.click()

        # Wait for the modal to appear
        modal = page.locator("#custom-modal-overlay")
        await expect(modal).to_be_visible()

        # Take a screenshot of the modal
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())