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

Make sure you setup the .env with the correct values and  run `npm run build` to create a production build.
Thereafter you can use this example docker compose file to run it in production;

```yaml
version: '3'
services:
  #PHP Service
  poker-app:
    build:
      context: ./poker-app
      dockerfile: Dockerfile
    image: poker-app/php
    restart: unless-stopped
    environment:
      SERVICE_NAME: app
      SERVICE_TAGS: dev
    working_dir: /var/www
    volumes:
      - ./poker-app/:/var/www
    networks:
      - poker-app-network
      - web
    depends_on:
      - mysql
    ports:
      - 8080:8080

  #Nginx Service
  webserver:
    image: nginx:alpine
    restart: unless-stopped
    volumes:
      - ./poker-app/:/var/www
      - ./nginx/conf.d/:/etc/nginx/conf.d/
    networks:
      - poker-app-network
      - web
    depends_on:
      - poker-app
    ports:
        - 80:80

  #MySQL Service
  mysql:
    image: mysql:8
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: pokerapp
      MYSQL_ROOT_PASSWORD: password
      SERVICE_TAGS: dev
      SERVICE_NAME: mysql
    volumes:
      - poker-app-data:/var/lib/mysql
    networks:
      - poker-app-network

#Docker Networks
networks:
  poker-app-network:
    driver: bridge
  web:
    external: true

volumes:
  poker-app-data:
    driver: local
```

And with the following nginx conf:

```
server {
    listen 80;
    index index.php index.html;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/public;
    
    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass poker-app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
        gzip_static on;
    }
}
```

Don't forget to migrate the databas by shelling into the app container and running php artisan migrate.

# License

copyright Remco Speekenbrink
