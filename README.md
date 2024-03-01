# Movie DB

The Movie DB is a website created using React.js

## Prerequisites

Before running the project, make sure you have the installed the following packages on your computer:

- Node.js (v18.15.0 or higher)
- npm (v9.5.0 or higher)

# Getting Started

To clone the repository, run the following command:

```bash
git clone https://github.com/Alessag/themoviedb-project.git
```

After cloning the repository, navigate to the project directory:

```bash
cd themoviedb-project
```

And install the dependencies:

```bash
npm install
```

# Environment Variables

This project utilizes a .env file to store sensitive environment variables, such as API keys

```bash
VITE_API_KEY=aki_key
```

# Available Scripts

In the project directory, you can run the following commands:

### **Development Mode**

This command starts the React.js development server and opens the application in your default browser on the [http://localhost:5173](http://localhost:5173)

```bash
npm run dev
```

### **Build**

This command creates an optimized production build of the React.js application in the build directory

```bash
npm run build
```

### **Start**

This command starts the React.js production server to serve the built application. The server is ready for deployment

```bash
npm run start
```

### **Running Tests**

This section describes how to run different types of tests for the project

#### **Unit Tests (Jest)**

This command runs Jest to execute unit tests

```bash
npm test
```

#### **End-to-End Tests (Cypress)**

##### **Cypress Test Runner Interface**

This command launches a visual interface for the Cypress test runner

Before running Cypress tests, ensure the application is running

```bash
npx cypress open
```

##### **Cypress Test Headless Mode**

This command executes Cypress tests in a headless mode, meaning it runs without a visual interface

```bash
npx cypress run
```

# Development Tools

This project utilizes the following code quality tools:

- **ESLint**: Linter for identifying and reporting code errors, style inconsistencies, and potential bugs.
- **Prettier**: Code formatter that enforces consistent code formatting rules.
- **Husky**: Is a Git hook manager that allows you to run scripts (such as linting and formatting) before committing code.

## **Configuration**

ESLint, Prettier, and Husky are already set up in this project. You can find the configuration files in the project root:

- `.eslintrc.json`: ESLint configuration file.
- `.prettierrc.json`: Prettier configuration file.
- `.husky`: Husky configuration directory, including the pre-commit hook setup.

## **Git Hooks**

This project includes a pre-commit Git hook that runs before each commit. The purpose of this hook is to ensure code quality and maintain consistent standards.

The pre-commit hook is configured using Husky and work performing the following tasks:

- During the pre-commit hook, Husky executes `lint-staged` command, which runs configured linting and formatting tasks on the files staged for commit.
- `lint-staged` runs ESLint and Prettier on the staged files.
- If there are any errors, the commit is aborted and the errors are displayed in the console.

## **Development Extensions**

The project includes a `.vscode` directory with the settings and extensions that are recommended for development.

- **ESLint**: Integrates ESLint JavaScript into VS Code.
- **Prettier - Code formatter**: Integrates Prettier code formatter into VS Code.

## **Recommended code editor**

[Visual Studio Code](https://code.visualstudio.com/) is the recommended code editor for this project.

# Project Setup and Tech Stack

This project uses a variety of tools and libraries to streamline development and testing:

- [React.js](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Redux](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/)
- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/)
- [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io/)
