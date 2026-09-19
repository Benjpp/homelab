#!/bin/bash

# Deployment script for Raspberry Pi
# Stop the script if any error occurs
set -e

echo "🚀 Starting deployment on Raspberry Pi..."

# 1. Update code from master
echo "📦 Downloading latest changes from git..."
git pull origin master

# 2. Install PHP dependencies (without development dependencies)
echo "🐘 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

# 3. Install and compile frontend dependencies
echo "🎨 Compiling frontend assets..."
npm install
npm run build

# 4. Run database migrations
# --force is required because Laravel asks for confirmation in production
echo "🗄️ Running database migrations..."
php artisan migrate --force

# 5. Laravel Optimization
echo "⚡ Optimizing system..."
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Deployment completed successfully. Your application is up to date."
