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
    php8.3 \
    php8.3-fpm \
    php8.3-cli \
    php8.3-common \
    php8.3-mysql \
    php8.3-pgsql \
    php8.3-sqlite3 \
    php8.3-mbstring \
    php8.3-xml \
    php8.3-curl \
    php8.3-zip \
    php8.3-bcmath \
    php8.3-intl \
    php8.3-gd \
    php8.3-redis \
    php8.3-opcache \
    php8.3-readline \
    php8.3-pcov \
    php8.3-soap \
    php8.3-imap \
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
RUN sed -i 's|listen = /run/php/php8.3-fpm.sock|listen = 127.0.0.1:9000|' /etc/php/8.3/fpm/pool.d/www.conf \
    && sed -i 's|;clear_env = no|clear_env = no|' /etc/php/8.3/fpm/pool.d/www.conf

EXPOSE 80 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
