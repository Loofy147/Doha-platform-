import re
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the products page
        page.goto("http://localhost:9002/products", timeout=60000)

        # Wait for the page to load and products to be visible
        expect(page.locator('h1:has-text("اكتشفي إبداعات وخدمات فريدة")')).to_be_visible(timeout=30000)

        # 2. Find the first product card and click its wishlist button
        first_product_card = page.locator('div.grid > div:has(h3)').first
        expect(first_product_card).to_be_visible(timeout=10000)

        product_name_element = first_product_card.locator('h3')
        expect(product_name_element).to_be_visible()
        product_name = product_name_element.inner_text()

        wishlist_button = first_product_card.get_by_role("button", name="إضافة إلى المفضلة")
        expect(wishlist_button).to_be_enabled()
        wishlist_button.click()

        # 3. Verify the navbar count updates
        navbar_wishlist_link = page.locator('header').get_by_role('link', name=re.compile("المفضلة"))
        expect(navbar_wishlist_link.locator('span')).to_have_text('1')

        # 4. Navigate to the wishlist page by clicking the link
        navbar_wishlist_link.click()

        # 5. Verify the product is on the wishlist page
        expect(page.locator('h1:has-text("قائمة أمنياتكِ")')).to_be_visible(timeout=10000)

        # Explicitly wait for the product card to be visible on the wishlist page
        wishlist_product_card = page.locator(f'div.grid > div:has-text("{product_name}")')
        expect(wishlist_product_card).to_be_visible(timeout=10000)

        # 6. Take a screenshot
        page.screenshot(path="jules-scratch/verification/wishlist_verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)