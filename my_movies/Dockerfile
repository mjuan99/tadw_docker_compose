FROM php:8.2-apache

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    libzip-dev \
    zip

# Enable mod_rewrite
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy the application code
COPY ./my_movies /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

WORKDIR /var/www/html
RUN echo "APP_NAME=Laravel" > .env \
    && echo "APP_ENV=local" >> .env \
    && echo "APP_KEY=base64:AoqwHzgKC84+qV+AFbPpkNJMzCtg3FYzwwJ6w3czbuk=" >> .env \
    && echo "APP_DEBUG=true" >> .env \
    && echo "APP_URL=http://localhost" >> .env \
    && echo "" >> .env \
    && echo "DB_CONNECTION=mysql" >> .env \
    && echo "DB_HOST=your_mysql_host" >> .env \
    && echo "DB_PORT=3306" >> .env \
    && echo "DB_DATABASE=your_database" >> .env \
    && echo "DB_USERNAME=your_username" >> .env \
    && echo "DB_PASSWORD=your_password" >> .env \
    && echo "" >> .env \
    && echo "CACHE_DRIVER=file" >> .env \
    && echo "QUEUE_CONNECTION=sync" >> .env \
    && echo "SESSION_DRIVER=file" >> .env \
    && echo "SESSION_LIFETIME=120" >> .env

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV COMPOSER_ALLOW_SUPERUSER=1

# Install project dependencies
RUN composer install
