# 1. Imagen base oficial con PHP 8.4 y Apache
FROM php:8.4-apache

# Variables para evitar preguntas interactivas en apt
ENV DEBIAN_FRONTEND=noninteractive

# 2. Instalar dependencias del sistema y extensiones PHP
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

# --- CONFIGURACIÓN DE APACHE PARA LARAVEL ---
# 1. Activar mod_rewrite para que funcionen las rutas de Laravel
RUN a2enmod rewrite

# 2. Copiar tu apache2.conf
COPY apache2.conf /etc/apache2/apache2.conf

# 3. Redirigir el DocumentRoot de Apache a /public (CLAVE PARA ELIMINAR EL 500/403)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/sites-available/*.conf
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/conf-available/*.conf
# --------------------------------------------

# 3. Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Instalar Node.js y NPM
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 5. Establecer directorio de trabajo
WORKDIR /var/www/html

# 6. Copiar los archivos del proyecto
COPY . .

# 6.1. Agregar entrypoint para preparar el contenedor al arrancar
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# 7. Instalar dependencias en la construcción
RUN composer install --no-interaction --optimize-autoloader
RUN npm install && npm run production

# 8. Permisos para Laravel (damos permisos a toda la carpeta del proyecto)
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 9. Puerto expuesto
EXPOSE 80

# 10. Comando de arranque
ENTRYPOINT ["/usr/local/bin/start.sh"]
CMD ["apache2-foreground"]
