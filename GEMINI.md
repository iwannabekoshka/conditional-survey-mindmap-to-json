# Project Overview

This project is a web application for creating conditional surveys using a mind-map interface. It allows users to visually build a survey by adding questions as nodes and defining answers as edges that connect the questions. The resulting survey structure can be exported as a JSON file, and a previously created survey can be imported from a JSON file.

The application is built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). The mind-map functionality is implemented using the [@xyflow/react](https://reactflow.dev/) library.

# Building and Running

To get the project running locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the application in development mode. You can view it in your browser at the address provided in the console (usually `http://localhost:5173`).

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` folder with the production-ready files.

4.  **Preview the production build:**
    ```bash
    npm run preview
    ```
    This will serve the production build locally for previewing.

# Development Conventions

## Linting

The project uses [ESLint](https://eslint.org/) for code linting. To check the code for linting errors, run:

```bash
npm run lint
```

## File Structure

-   `src/main.jsx`: The entry point of the application.
-   `src/App.jsx`: The main application component that contains the mind-map interface and the core logic for handling nodes and edges.
-   `src/components/`: Contains the React components used in the application, such as custom nodes and edges for the mind map.
-   `src/utils/`: Contains utility functions, such as the function for downloading the survey as a JSON file.
-   `src/state/`: Contains the React context for managing the state of the survey.
-   `public/`: Contains static assets.
-   `vite.config.js`: The configuration file for Vite.
-   `eslint.config.js`: The configuration file for ESLint.
