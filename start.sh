#!/usr/bin/env bash
set -euo pipefail

log() {
    printf '[entrypoint] %s\n' "$1"
}

log "Starting container bootstrap"
cd /var/www/html

if [ ! -f vendor/autoload.php ]; then
    log "vendor/autoload.php not found; installing Composer dependencies"
    composer install --no-interaction --prefer-dist --optimize-autoloader
else
    log "vendor/autoload.php found; skipping Composer install"
fi

log "Fixing Laravel writable directories"
chown -R www-data:www-data storage bootstrap/cache || true
chmod -R 775 storage bootstrap/cache || true

log "Handing off to: $*"
exec "$@"