# Sportfest-Scoring-System

This project is dedicated to the Sportfest Scoring System, which is a web application for managing and scoring sports events. It is built using FastAPI for the backend and React for the frontend.

## How to run the project

1. Clone the repository:

   ```bash
   git clone https://github.com/Vinsoft-Systems/Sportfest-Scoring-System
   ```

2. Change into the project directory:

   ```bash
   cd Sportfest-Scoring-System
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

7 Go to the `frontend` directory and run the following command to start the web application:

```bash
pnpm install
pnpm run dev
```

8. Open your web browser and visit `http://localhost:5173` to access the application.

## How to add more pages?

1. Create a new page component in the `frontend/src/pages` directory. You can use the `Home` or `Examples` component as a template.

2. Add it to `index.js` in the `frontend/src/pages` directory.

3. Add the route to the `constants.js` file in the `frontend/src` directory.

4. Your new page should now be available at the navigation bar.