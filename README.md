# Scrum Poker
Laravel + Inertia + React app for scrum poker sessions. Creates rooms with anonymous users.

# Table of contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Setting up the database and installing packages](#setting-up-the-database-and-installing-packages)
    - [Vite dev build](#vite-dev-build)
- [Running the tests](#running-the-tests)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

> On windows it's important to checkout the repo with the correct line endings. To achieve this run `git config --global core.autocrlf input` once **before cloning the repo**. Otherwise this can lead to problems when starting the Docker environment or when pushing code to the repo.

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [WSL2 (Windows Only)](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

### Installing

#### Windows Prerequisites

Open a new WSL2 Ubuntu terminal shell and navigate to the cloned project. Then install `make` by executing:

```bash
sudo apt install make
```

After this you are ready to continue with the normal setup.

#### Installing and Running the app

Simply run:

```bash
make install && make up
```

If you want the application to run on a port other than port 80 simply change `APP_PORT` in your .env file. You can do the
same for:
`FORWARD_DB_PORT`

### Setting up the database and installing packages

In order for the application to work you need to migrate the database and install composer packages. To do this
you can ssh to the container:

````bash
make sh
````

and execute the following commands:

```bash
make migrate
```

The database is automatically created based on the credentials in your .env file and can also be reached on your
localhost on the configured `FORWARD_DB_PORT` (3306 by default).

It's also required to run the reverb server locally for development.  To start the server execute;

```bash
make ws
```

### Vite dev build

To build the frontend and run a local dev build run;

```bash
make dev
```

# Running the tests

To run the tests locally you can execute:

```bash
make test
```

This will run all the Feature and Unit tests available for the project.

# Production Build

This repository is setup to be build with Nixpacks.

# License

copyright Remco Speekenbrink
