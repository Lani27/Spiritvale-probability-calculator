import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the HTML file
        # This is necessary because `page.goto` with a relative path can be flaky
        # depending on the working directory.
        html_file_path = os.path.abspath('damage_simulator.html')

        # Use the file:// protocol to open the local file
        page.goto(f'file://{html_file_path}')

        # 1. Check the "Simulate DPS with Skills" checkbox
        simulate_skills_checkbox = page.locator('#simulate_skills')
        expect(simulate_skills_checkbox).to_be_visible()
        simulate_skills_checkbox.check()

        # 2. Set the number of skills to 1 (it defaults to 1, but let's be explicit)
        num_skills_input = page.locator('#num_skills')
        expect(num_skills_input).to_be_visible()
        num_skills_input.fill('1')

        # Wait for the skill card to be generated and visible
        skill_card = page.locator('#skill-inputs-container .skill-card')
        expect(skill_card).to_be_visible()

        # 3. Find the "Cast Time (s)" input and set a decimal value
        cast_time_input = page.locator('#skill-1-cast-time')
        expect(cast_time_input).to_be_visible()

        # Input a value that was previously invalid
        test_value = '0.8'
        cast_time_input.fill(test_value)

        # 4. Assert that the value was set correctly
        expect(cast_time_input).to_have_value(test_value)

        # 5. Take a screenshot for visual confirmation
        page.screenshot(path='jules-scratch/verification/verification.png')

        browser.close()

if __name__ == "__main__":
    run_verification()