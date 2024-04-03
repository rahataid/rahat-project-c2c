# Rahat Crypto2Crypto

## Prerequisites

Before getting started, ensure that your system meets the following prerequisites:

- Postgres Database
- Node.js version 20.\* (Recommended)
- NestJS/CLI Installed
- Redis Database Server

## Getting Started

To run the project locally, follow these steps:
### Clone the Repository

```bash
git clone git@github.com:rahataid/rahat-project-c2c.git
```

### Install Dependencies
Navigate to the project directory and install dependencies using PNPM:

```bash
pnpm install
```
### Configure Environment
Copy the provided `.env.example` file to `.env` and update the environment variables according to your configuration:

```bash
cp .env.example .env
```

### Start the application

Run `npx nx serve c2c` to start the development server. Happy coding!

### Build for production

Run `npx nx build c2c` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

### Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).
