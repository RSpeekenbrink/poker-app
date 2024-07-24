FROM php:8.3-fpm

LABEL maintainer="RSpeekenbrink"

COPY composer.lock composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    nodejs \
    supervisor \
    libzip-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql zip exif pcntl

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy files
COPY . /var/www
COPY --chown=www:www . /var/www

COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY docker/start-container /usr/local/bin/start-container

# Composer and artisan cache stuff
USER www
RUN composer install --no-dev --ansi --no-interaction && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    composer dump-autoload --no-dev --no-interaction && \
    composer clear-cache --no-interaction;

# Expose port 9000 and start php-fpm server
EXPOSE 9000
EXPOSE 8080
CMD ["php-fpm"]

ENTRYPOINT ["start-container"]

