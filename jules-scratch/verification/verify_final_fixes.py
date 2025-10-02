import re
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the damage simulator page
        page.goto("http://localhost:8000/damage_simulator.html")
        page.wait_for_timeout(1000) # wait for page to load

        # 2. Verify "Other Bonuses & Buffs" is gone
        bonuses_card = page.locator("h2:has-text('Other Bonuses & Buffs')")
        expect(bonuses_card).to_have_count(0)
        print("UI Cleanup: 'Other Bonuses & Buffs' section successfully removed.")

        # 3. Get initial ATK value
        initial_atk_value = page.locator("#r_atk").inner_text()
        print(f"Initial ATK: {initial_atk_value}")

        # 4. Click on the 'Head' gear slot to open the modal
        head_slot = page.locator("#gear-slot-head")
        head_slot.click()

        # 5. Wait for modal to be visible and select an item
        equipment_modal = page.locator("#equipment-modal-overlay")
        expect(equipment_modal).to_be_visible()

        # Select "Golden Crown"
        golden_crown_card = equipment_modal.locator(".equipment-card[data-action='equip']", has_text="Golden Crown")
        golden_crown_card.click()

        # 6. Verify the modal is closed and the item is equipped
        expect(equipment_modal).to_be_hidden()
        equipped_item_name = head_slot.locator("span")
        expect(equipped_item_name).to_have_text("Golden Crown")
        print("Item equip successful.")

        # 7. Verify the refine controls are visible and click the '+' button
        refine_controls = page.locator("#gear-slot-wrapper-head .refine-controls")
        expect(refine_controls).not_to_have_class(re.compile("hidden"))

        refine_plus_button = refine_controls.locator(".refine-plus")
        refine_plus_button.click()
        refine_plus_button.click()

        # 8. Verify the refinement level is updated
        refine_display = refine_controls.locator(".refine-display")
        expect(refine_display).to_have_text("+2")
        print("Refinement buttons working correctly.")

        page.wait_for_timeout(500) # wait for calculation

        # 9. Verify that stats have changed
        final_atk_locator = page.locator("#r_atk")
        final_atk_value = final_atk_locator.inner_text()
        print(f"Final ATK: {final_atk_value}")

        expect(final_atk_locator).not_to_have_text(initial_atk_value)
        print("Stat calculation successful: ATK value changed as expected.")

        # 10. Take a screenshot for visual confirmation
        page.screenshot(path="jules-scratch/verification/verification.png")

        print("Verification script completed successfully.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)