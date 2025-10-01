from playwright.sync_api import sync_playwright, expect

def verify_card_sprites():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the database page and the cards section
        page.goto('http://localhost:8000/database.html#cards')

        # Wait for the card list to be populated, indicating the page has loaded
        expect(page.locator('#cards-list > div > div').first).to_be_visible()

        # Take a screenshot of the cards section
        page.locator("#cards-list").screenshot(path='jules-scratch/verification/verification.png')

        browser.close()

if __name__ == "__main__":
    verify_card_sprites()