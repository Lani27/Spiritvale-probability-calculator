from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Capture and print all console messages
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))

    try:
        # Get the absolute path to the HTML file
        html_file_path = os.path.abspath("damage_simulator.html")

        # Go to the local HTML file
        page.goto(f"file://{html_file_path}")

        # Read the content of the JavaScript verification script
        with open("jules-scratch/verification/verify_with_js.js", "r") as f:
            js_script_content = f.read()

        # Execute the script in the page context
        page.evaluate(js_script_content)

        print("\nJavaScript verification script executed successfully.")

    except Exception as e:
        print(f"An error occurred during Playwright execution: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)