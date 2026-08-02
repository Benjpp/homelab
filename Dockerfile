# 1. Imagen base oficial con PHP 8.4 y FPM/Apache ligero
FROM php:8.4-cli

# Variables para evitar preguntas interactivas en apt
ENV DEBIAN_FRONTEND=noninteractive

# 2. Instalar dependencias del sistema y extensiones de PHP que usaste (línea 58 de tu historial)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones necesarias de PHP para Laravel
RUN docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd

# 3. Instalar Composer (para manejar las dependencias de Laravel)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Instalar Node.js y NPM (necesario para Vite, líneas 54 y 63)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 5. Establecer el directorio de trabajo
WORKDIR /var/www/html

# 6. Copiar los archivos del proyecto al contenedor
COPY . .

# 7. Instalar dependencias del proyecto (PHP y Node)
RUN composer install --no-interaction --optimize-autoloader --no-dev
RUN npm install && npm run build

# 8. Dar permisos correctos a las carpetas de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 9. Puerto expuesto
EXPOSE 8000

# 10. Comando de arranque
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
