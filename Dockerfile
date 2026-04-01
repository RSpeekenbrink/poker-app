FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    software-properties-common \
    curl \
    wget \
    unzip \
    git \
    nginx \
    supervisor \
    libmariadb-dev \
    && add-apt-repository ppa:ondrej/php -y \
    && apt-get update && apt-get install -y --no-install-recommends \
    php8.5 \
    php8.5-fpm \
    php8.5-cli \
    php8.5-common \
    php8.5-mysql \
    php8.5-pgsql \
    php8.5-sqlite3 \
    php8.5-mbstring \
    php8.5-xml \
    php8.5-curl \
    php8.5-zip \
    php8.5-bcmath \
    php8.5-intl \
    php8.5-gd \
    php8.5-redis \
    php8.5-opcache \
    php8.5-readline \
    php8.5-pcov \
    php8.5-soap \
    php8.5-imap \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy composer files and install PHP deps
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-scripts --ignore-platform-reqs

# Copy package files and install Node deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy application code
COPY . .

# Run post-install scripts and build
RUN composer run-script post-autoload-dump \
    && npm run build

# Copy deploy configs
COPY docker/deploy/nginx.conf /etc/nginx/nginx.conf
COPY docker/deploy/php-fpm.conf /etc/php-fpm.conf
COPY docker/deploy/supervisord.conf /etc/supervisord.conf
COPY docker/deploy/conf.d/ /etc/supervisor/conf.d/

# Create required directories
RUN mkdir -p /var/log/nginx /var/run /run/php \
    && chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Configure php-fpm socket path
RUN sed -i 's|listen = /run/php/php8.5-fpm.sock|listen = 127.0.0.1:9000|' /etc/php/8.5/fpm/pool.d/www.conf \
    && sed -i 's|;clear_env = no|clear_env = no|' /etc/php/8.5/fpm/pool.d/www.conf

EXPOSE 80 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
