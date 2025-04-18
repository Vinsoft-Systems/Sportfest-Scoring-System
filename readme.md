# FastAPI Web example Application

This is a simple FastAPI-rtk web example application.

## How to run the project

1. Clone the repository:

   ```bash
   git clone https://github.com/dttctcs/fastapi-rtk-skeleton.git
   ```

2. Change into the project directory:

   ```bash
   cd fastapi-rtk-skeleton
   ```

3. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

4. Activate the virtual environment:

   - On macOS and Linux:

     ```bash
     source venv/bin/activate
     ```

   - On Windows:

     ```bash
     venv\Scripts\activate
     ```

5. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

6. Run the web server:
   ```
   fastapi dev --port 8080
   ```

7 Go to the `webapp` directory and run the following command to start the web application:

```bash
pnpm install
pnpm run dev
```

8. Open your web browser and visit `http://localhost:5173` to access the application.

## How to add more pages?

1. Create a new page component in the `webapp/src/pages` directory. You can use the `Home` or `Examples` component as a template.

2. Add it to `index.js` in the `webapp/src/pages` directory.

3. Add the route to the `constants.js` file in the `webapp/src` directory.

4. Your new page should now be available at the navigation bar.

## How to add user?

1. For admin, run the following command to create a new user:

```bash
fastapi-rtk security create-admin
```

or

```bash
fastapi-rtk security create-admin --username admin --password admin
```

2. For normal user, run the following command to create a new user:

```bash
fastapi-rtk security create-user
```

or

```bash
fastapi-rtk security create-user --username user --password user
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
