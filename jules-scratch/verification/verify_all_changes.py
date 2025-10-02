from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    Verifies all the new features: refinement, disabled inputs, and stat allocation.
    """
    # Listen for console events and print them
    page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

    print("Navigating to the damage simulator...")
    page.goto("http://localhost:8000/damage_simulator.html")
    page.wait_for_load_state("networkidle")

    # --- Verification Step 1: Test Item Refinement and Gear Bonuses ---
    print("Verifying item refinement and gear bonus integration...")

    # Equip "Abyss Shard" (Atk: +20 + 2/lvl, Matk: +10 + 1/lvl)
    page.locator("#gear-slot-weapon").click()
    expect(page.locator("#equipment-modal-overlay")).to_be_visible()
    page.locator("#equipment-modal-search").fill("Abyss Shard")
    page.locator('.equipment-card[data-item-name="Abyss Shard"]').click()
    expect(page.locator("#equipment-modal-overlay")).not_to_be_visible()

    # Test with refinement level 10
    print("Setting weapon refinement to +10...")
    refine_input = page.locator("#refine-weapon")
    refine_input.fill("10")

    # Give calculations a moment to run
    page.wait_for_timeout(500)

    # At refine +10, Atk should be 20 + (2 * 10) = 40
    # Matk should be 10 + (1 * 10) = 20
    expected_weapon_atk = "40"
    expected_weapon_matk = "20"

    weapon_atk_input = page.locator("#p_weapon_atk")
    weapon_matk_input = page.locator("#p_weapon_matk")

    print(f"Checking if Weapon ATK is disabled and has value {expected_weapon_atk}...")
    expect(weapon_atk_input).to_be_disabled()
    expect(weapon_atk_input).to_have_value(expected_weapon_atk)

    print(f"Checking if Weapon MATK is disabled and has value {expected_weapon_matk}...")
    expect(weapon_matk_input).to_be_disabled()
    expect(weapon_matk_input).to_have_value(expected_weapon_matk)

    print("Item refinement and gear bonus verification successful.")

    # --- Verification Step 2: Test Stat Point Allocation with Tiered Costs ---
    print("\nVerifying stat point allocation system with tiered costs...")

    # Set level to 150 to get max points (377)
    page.locator("#p_lv").fill("150")

    print("Checking total points at level 150...")
    expect(page.locator("#total-points")).to_have_text("377")

    # Get the base STR for the default class (Warrior)
    base_str_value = page.locator("#p_str").get_attribute("value")
    base_str = int(base_str_value) if base_str_value else 0

    # Test adding 50 points to STR (should cost 50 points)
    print("Testing first tier of stat cost (1-50)...")
    page.locator("#p_str").fill(str(base_str + 50))
    # 377 - 50 = 327 available
    expect(page.locator("#available-points")).to_have_text("327")

    # Test adding up to 98 points to AGI
    # Cost = 50*1 + (98-50)*2 = 50 + 96 = 146
    print("Testing second tier of stat cost (51-98)...")
    base_agi_value = page.locator("#p_agi").get_attribute("value")
    base_agi = int(base_agi_value) if base_agi_value else 0
    page.locator("#p_agi").fill(str(base_agi + 98))
    # 327 - 146 = 181 available
    expect(page.locator("#available-points")).to_have_text("181")

    # Test adding 99 points to VIT
    # Cost = 50*1 + 48*2 + 1*3 = 50 + 96 + 3 = 149
    print("Testing third tier of stat cost (99)...")
    base_vit_value = page.locator("#p_vit").get_attribute("value")
    base_vit = int(base_vit_value) if base_vit_value else 0
    page.locator("#p_vit").fill(str(base_vit + 99))
    # 181 - 149 = 32 available
    expect(page.locator("#available-points")).to_have_text("32")

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