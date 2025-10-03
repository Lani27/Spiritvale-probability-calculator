from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the damage simulator
        page.goto("http://localhost:8080/damage_simulator.html")
        page.wait_for_load_state("domcontentloaded")

        # Wait for a key element to be populated by JS, indicating the app is ready
        expect(page.locator("#p_class > option[value='Warrior']")).to_have_attribute("value", "Warrior", timeout=10000)

        # 2. Equip a basic weapon (e.g., a Sword)
        page.locator("#gear-slot-weapon").click()

        # Wait for the modal to appear
        expect(page.locator("#equipment-modal-overlay")).to_be_visible()
        expect(page.locator("#equipment-modal-content")).to_be_visible()

        # Find a simple sword to equip
        page.locator("#equipment-modal-content .item-card", has_text="Sword").first.click()
        page.locator("#equipment-modal-close-btn").click()
        expect(page.locator("#equipment-modal-overlay")).to_be_hidden()


        # 3. Equip the Archangel Card (Enchant Holy)
        page.locator(".card-slot[data-slot-id='weapon']").first.click()
        expect(page.locator("#card-modal-overlay")).to_be_visible()
        page.locator("#card-modal-content .card-preview-card", has_text="Archangel Card").click()
        page.locator("#card-modal-close-btn").click()
        expect(page.locator("#card-modal-overlay")).to_be_hidden()

        # 4. Equip the Skeleton Card (+8% Holy Damage)
        page.locator(".card-slot[data-slot-id='weapon']").nth(1).click()
        expect(page.locator("#card-modal-overlay")).to_be_visible()
        page.locator("#card-modal-content .card-preview-card", has_text="Skeleton Card").click()
        page.locator("#card-modal-close-btn").click()
        expect(page.locator("#card-modal-overlay")).to_be_hidden()

        # 5. Equip Dragon Dusk Card (+10% vs Shadow)
        page.locator(".card-slot[data-slot-id='weapon']").nth(2).click()
        expect(page.locator("#card-modal-overlay")).to_be_visible()
        page.locator("#card-modal-content .card-preview-card", has_text="Dragon Dusk Card").click()
        page.locator("#card-modal-close-btn").click()
        expect(page.locator("#card-modal-overlay")).to_be_hidden()

        # 6. Select the 'Death' monster
        page.locator("#monster_search").fill("Death")
        expect(page.locator("#monster_list")).to_be_visible()
        page.locator("#monster_list > div", has_text="Death").click()

        # 7. Take a screenshot of the results
        results_container = page.locator("#results-container")
        expect(results_container).to_be_visible()

        # Add a small delay to ensure calculations are finished and rendered.
        page.wait_for_timeout(1000)

        results_container.screenshot(path="jules-scratch/verification/elemental_damage_verification.png")
        print("Screenshot saved to jules-scratch/verification/elemental_damage_verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)