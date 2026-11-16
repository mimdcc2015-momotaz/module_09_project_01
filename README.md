# Demo Web Shop UI Automation (Playwright + POM)

Automated UI test suite built with **Playwright** and **JavaScript (ES Modules)** following the **Page Object Model (POM)** design pattern for [Demo Web Shop](https://demowebshop.tricentis.com/).

## Covered Scenarios
1. **Q1 — Invalid Login (`tests/q1-invalid-login.spec.js`)**: Validates error messaging and unauthenticated UI state when logging in with invalid credentials.
2. **Q2 — Register + Add to Cart (`tests/q2-register-add-to-cart.spec.js`)**: Registers a unique customer, logs in, navigates to the *Books* category, adds a product to the cart, and verifies item name and quantity.
3. **Q3 — E2E Order Flow (`tests/q3-e2e-order-flow.spec.js`)**: Searches for a product, verifies search results, opens the product, updates quantity, accepts terms of service, completes checkout, confirms the order, and verifies the order details page.

---

## Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Java (JDK 8+)** *(required only for generating/viewing Allure reports locally)*

---

## Setup Instructions

1. **Clone or extract the project folder** and open a terminal inside the root directory:
   ```bash
   cd demowebshop-playwright-pom
