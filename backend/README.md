# Lunivefy Backend

This directory contains the PHP backend for the Lunivefy application. It's a simple, native PHP application designed to be deployed on a cPanel shared hosting environment.

## Requirements

- PHP 8.0 or higher
- MySQL or MariaDB
- cPanel access (or any web server that runs PHP)

## Installation on cPanel

1.  **Database Setup**:
    *   Log in to your cPanel.
    *   Go to "MySQL Databases" and create a new database (e.g., `yourcpaneluser_lunivefy`).
    *   Create a new database user and assign it a strong password.
    *   Add the user to the database, granting all privileges.
    *   Go to "phpMyAdmin", select your new database, and import the `schema.sql` file from this directory. This will create all the necessary tables.

2.  **Upload Files**:
    *   Using the "File Manager" in cPanel, navigate to the `public_html` directory.
    *   Upload the contents of this `backend` directory into a new folder named `api` inside `public_html`. The final structure should look like `public_html/api/get_services.php`.
    *   **Important**: For security reasons, the `config` directory should ideally be placed outside the `public_html` directory if your hosting allows. If not, you can add a `.htaccess` file inside `public_html/api/config/` with the content `Deny from all` to prevent direct web access.

3.  **Configuration**:
    *   Navigate to `public_html/api/config/` (or its new location).
    *   Edit the `config.php` file.
    *   Fill in your database credentials (host, name, user, password) that you created in step 1.
    *   Fill in your Tripay API credentials.

4.  **Frontend Connection**:
    *   The React frontend is already configured to make API calls to `/api/...`. When you upload your React build files to `public_html`, it will correctly communicate with the backend files in `public_html/api/`.

## API Endpoints

-   `GET /api/get_services.php`: Fetches a list of all active services.
    -   Query Params: `platform`, `type`
-   `GET /api/get_service.php`: Fetches details for a single service.
    -   Query Params: `slug`
-   `POST /api/create_order.php`: Creates a new order and returns a payment link.
    -   Body: JSON payload with `serviceId`, `quantity`, `email`, `target`.
-   `GET /api/get_order_status.php`: Fetches the status of an existing order.
    -   Query Params: `order_code`
-   `POST /api/tripay_callback.php`: Webhook endpoint for Tripay to send payment status updates.
