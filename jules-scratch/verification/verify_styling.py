from playwright.sync_api import sync_playwright, Page, expect
import os

def run_verification(page: Page):
    base_path = f"file://{os.getcwd()}"

    # Verify Stat Roll Calculator (index.html)
    page.goto(f"{base_path}/index.html")
    page.wait_for_load_state("networkidle")
    expect(page.locator("#main-content h1")).to_have_text("Stat Roll Calculator")
    page.screenshot(path="jules-scratch/verification/screenshot-index.png")

    # Verify Damage & Stat Simulator (damage_simulator.html)
    page.goto(f"{base_path}/damage_simulator.html")
    page.wait_for_load_state("networkidle")
    expect(page.locator("#main-content h1")).to_have_text("Damage & Stat Simulator")
    page.screenshot(path="jules-scratch/verification/screenshot-damage-simulator.png")

    # Verify Database - Equipment (default)
    page.goto(f"{base_path}/database.html")
    page.wait_for_load_state("networkidle")
    # Check that the default view is equipment
    expect(page.locator("#equipment h1")).to_have_text("Equipment")
    # Check that the correct sidebar link is active
    expect(page.locator('a[href="database.html#equipment"]')).to_have_class("sidebar-link active-link")
    page.screenshot(path="jules-scratch/verification/screenshot-database-equipment.png")

    # Verify Database - Cards
    page.goto(f"{base_path}/database.html#cards")
    page.wait_for_load_state("networkidle")
    # Check that the cards section is visible
    expect(page.locator("#cards h1")).to_have_text("Cards")
    # Check that the correct sidebar link is active
    expect(page.locator('a[href="database.html#cards"]')).to_have_class("sidebar-link active-link")
    page.screenshot(path="jules-scratch/verification/screenshot-database-cards.png")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    run_verification(page)
    browser.close()

print("Verification script executed successfully.")