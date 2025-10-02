from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    Verifies the stat integration and allocation changes.
    """
    # Listen for console events and print them
    page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

    print("Navigating to the damage simulator...")
    page.goto("http://localhost:8000/damage_simulator.html")
    page.wait_for_load_state("networkidle")

    # --- Verification Step 1: Test Gear Bonus Integration ---
    print("Verifying that equipping an item correctly applies stats...")

    # Set level to 100 for predictable per-level stats
    page.locator("#p_lv").fill("100")

    # Click the weapon slot to open the modal
    page.locator("#gear-slot-weapon").click()

    # Wait for the modal to be visible
    expect(page.locator("#equipment-modal-overlay")).to_be_visible()

    # Search for "Abyss Shard" and equip it
    print("Searching for and equipping 'Abyss Shard'...")
    page.locator("#equipment-modal-search").fill("Abyss Shard")
    page.locator('.equipment-card[data-item-name="Abyss Shard"]').click()

    # The modal should close, and the item should be equipped.
    expect(page.locator("#equipment-modal-overlay")).not_to_be_visible()

    # Give calculations a moment to run
    page.wait_for_timeout(500)

    # Verify the stats from "Abyss Shard" (Atk: +20 + 2/lvl, Matk: +10 + 1/lvl)
    # At level 100, this is 220 ATK and 110 MATK.
    expected_weapon_atk = "220"
    expected_weapon_matk = "110"

    weapon_atk_input = page.locator("#p_weapon_atk")
    weapon_matk_input = page.locator("#p_weapon_matk")

    print(f"Checking if Weapon ATK is disabled and has value {expected_weapon_atk}...")
    expect(weapon_atk_input).to_be_disabled()
    expect(weapon_atk_input).to_have_value(expected_weapon_atk)

    print(f"Checking if Weapon MATK is disabled and has value {expected_weapon_matk}...")
    expect(weapon_matk_input).to_be_disabled()
    expect(weapon_matk_input).to_have_value(expected_weapon_matk)

    print("Gear bonus verification successful.")

    # --- Verification Step 2: Test Stat Point Allocation ---
    print("\nVerifying stat point allocation system...")

    # Set level to 150 to get max points (377)
    page.locator("#p_lv").fill("150")

    # Check initial point allocation display
    print("Checking total points at level 150...")
    expect(page.locator("#total-points")).to_have_text("377")

    # Get the base STR for the default class (should be Warrior)
    base_str_value = page.locator("#p_str").get_attribute("value")
    base_str = int(base_str_value) if base_str_value else 0

    # Add points to STR. Max user-added is 99.
    print("Testing stat cap of 99 per stat...")
    page.locator("#p_str").fill(str(base_str + 150)) # Try to add more than 99
    expect(page.locator("#p_str")).to_have_value(str(base_str + 99)) # Should be capped at 99

    # Verify available points are updated correctly
    # 377 total - 99 used = 278 available
    print("Checking available points after capping STR...")
    expect(page.locator("#available-points")).to_have_text("278")

    # Spend all remaining points on AGI
    print("Testing total point cap...")
    base_agi_value = page.locator("#p_agi").get_attribute("value")
    base_agi = int(base_agi_value) if base_agi_value else 0
    page.locator("#p_agi").fill(str(base_agi + 278))

    # Now try to add one more point to VIT, which should fail
    base_vit_value = page.locator("#p_vit").get_attribute("value")
    base_vit = int(base_vit_value) if base_vit_value else 0
    page.locator("#p_vit").fill(str(base_vit + 1))

    # The value should be corrected back because no points are left
    expect(page.locator("#p_vit")).to_have_value(str(base_vit))

    # Verify available points are zero
    print("Checking available points are zero...")
    expect(page.locator("#available-points")).to_have_text("0")

    print("Stat point allocation verification successful.")

    # --- Final Screenshot ---
    screenshot_path = "jules-scratch/verification/verification.png"
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