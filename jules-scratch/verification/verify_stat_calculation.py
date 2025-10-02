from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Listen for all console events and print them to the terminal
    page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

    try:
        # Navigate to the page
        page.goto("http://localhost:8080/damage_simulator.html")

        # Wait for the page to load and initial calculations to run
        page.wait_for_selector('#r_atk')

        # Get initial ATK value
        initial_atk = page.locator('#r_atk').inner_text()
        print(f"Initial ATK: {initial_atk}")

        # Click the weapon slot to open the modal
        page.locator('#gear-slot-weapon').click()

        # Wait for the modal to be visible
        expect(page.locator('#equipment-modal-overlay')).to_be_visible()

        # Find and click the "Sword" in the modal
        page.locator('.equipment-card[data-equipment-id="Sword"]').click()

        # Wait for the modal to close
        expect(page.locator('#equipment-modal-overlay')).to_be_hidden()

        # Give a moment for the recalculation to trigger and complete
        page.wait_for_timeout(500)

        # After equipping, the stats are recalculated. We expect the ATK value to be different.
        expect(page.locator('#r_atk')).not_to_have_text(initial_atk, timeout=1000)

        final_atk = page.locator('#r_atk').inner_text()
        print(f"Final ATK after equipping Sword: {final_atk}")

        # Take a screenshot for visual verification
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")
        print("Verification PASSED!")

    except Exception as e:
        print(f"Verification FAILED: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as p:
    run_verification(p)