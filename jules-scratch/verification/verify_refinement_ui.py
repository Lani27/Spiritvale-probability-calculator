from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    Verifies the new refinement UI with + and - buttons.
    """
    print("Navigating to the damage simulator...")
    page.goto("http://localhost:8000/damage_simulator.html")
    page.wait_for_load_state("networkidle")

    # --- Verification Step 1: Equip an item ---
    print("Equipping 'Abyss Shard'...")
    page.locator("#gear-slot-weapon").click()
    expect(page.locator("#equipment-modal-overlay")).to_be_visible()
    page.locator("#equipment-modal-search").fill("Abyss Shard")
    page.locator('.equipment-card[data-item-name="Abyss Shard"]').click()
    expect(page.locator("#equipment-modal-overlay")).not_to_be_visible()

    # --- Verification Step 2: Test '+' button ---
    print("Testing the '+' refinement button...")
    refine_wrapper = page.locator("#gear-slot-wrapper-weapon")
    plus_button = refine_wrapper.locator(".refine-plus")
    refine_display = refine_wrapper.locator(".refine-display")

    # Click '+' 5 times
    for _ in range(5):
        plus_button.click()

    # Verify display and stats
    print("Verifying refinement level is +5...")
    expect(refine_display).to_have_text("+5")

    # At refine +5, Atk should be 20 + (2 * 5) = 30
    # Matk should be 10 + (1 * 5) = 15
    print("Verifying stats for +5 refinement...")
    expect(page.locator("#p_weapon_atk")).to_have_value("30")
    expect(page.locator("#p_weapon_matk")).to_have_value("15")

    # --- Verification Step 3: Test '-' button ---
    print("Testing the '-' refinement button...")
    minus_button = refine_wrapper.locator(".refine-minus")

    # Click '-' 2 times
    for _ in range(2):
        minus_button.click()

    # Verify display and stats
    print("Verifying refinement level is +3...")
    expect(refine_display).to_have_text("+3")

    # At refine +3, Atk should be 20 + (2 * 3) = 26
    # Matk should be 10 + (1 * 3) = 13
    print("Verifying stats for +3 refinement...")
    expect(page.locator("#p_weapon_atk")).to_have_value("26")
    expect(page.locator("#p_weapon_matk")).to_have_value("13")

    print("Refinement UI verification successful.")

    # --- Final Screenshot ---
    screenshot_path = "jules-scratch/verification/refinement_verification.png"
    print(f"Taking screenshot: {screenshot_path}")
    page.screenshot(path=screenshot_path)
    print("Verification script finished successfully.")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_verification(page)
        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    main()