#!/bin/bash

# Deployment script for Raspberry Pi (Docker mode)
# Stop the script if any error occurs
set -e

echo "🚀 Starting deployment on Raspberry Pi..."

# 1. Update code on the HOST (Raspberry Pi)
# This updates the files that are mounted into the container via volumes
echo "📦 Downloading latest changes from git..."
git pull origin master

# We use 'homelab' because that's the service name in your docker-compose.yaml
SERVICE="homelab"

# 2. Install PHP dependencies inside the container
echo "🐘 Installing Composer dependencies..."
docker compose exec -T $SERVICE composer install --no-dev --optimize-autoloader

# 3. Install and compile frontend assets inside the container
echo "🎨 Compiling frontend assets..."
docker compose exec -T $SERVICE npm install
docker compose exec -T $SERVICE npm run production

# 4. Run database migrations inside the container
# --force is required because Laravel asks for confirmation in production
echo "🗄️ Running database migrations..."
docker compose exec -T $SERVICE php artisan migrate --force

# 5. Laravel Optimization inside the container
echo "⚡ Optimizing system..."
docker compose exec -T $SERVICE php artisan optimize:clear
docker compose exec -T $SERVICE php artisan config:cache
docker compose exec -T $SERVICE php artisan route:cache
docker compose exec -T $SERVICE php artisan view:cache

echo "✅ Deployment completed successfully. Your container is up to date."
