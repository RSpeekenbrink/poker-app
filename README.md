# Poker App

This is the git repository for my Poker App to make refinements easier.

# Table of contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Setting up the database and installing packages](#setting-up-the-database-and-installing-packages)
- [Running the tests](#running-the-tests)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

> On windows it's incredibly important to checkout the repo with the correct line endings. To achieve this run `git config --global core.autocrlf input` once **before cloning the repo**. Otherwise this can lead to problems when starting the Docker environment or when pushing code to the repo.

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
`FORWARD_DB_PORT`, `FORWARD_MAILHOG_PORT` and `FORWARD_MAILHOG_DASHBOARD_PORT`

#### Mailhog

By default all emails send trough the application get caught by Mailhog which can be opened on the configured port (Default 8025).

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

## Running the tests

To run the tests locally you can execute:

```bash
make test
```

This will run all the Feature and Unit tests available for the project.

## License

copyright vismedia agency
