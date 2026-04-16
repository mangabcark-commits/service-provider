#!/bin/bash
# =============================================================
#  Service Finder — EC2 Deployment Script
#  Run this ONCE after SSH-ing into a fresh Ubuntu 22.04 EC2
#  Usage: bash deploy.sh <YOUR_EC2_PUBLIC_IP> <YOUR_GITHUB_REPO_URL>
#  Example: bash deploy.sh 13.234.56.78 https://github.com/you/repo.git
# =============================================================

set -e  # Exit immediately on any error

EC2_IP=${1:?"Usage: bash deploy.sh <EC2_PUBLIC_IP> <GITHUB_REPO_URL>"}
REPO_URL=${2:?"Usage: bash deploy.sh <EC2_PUBLIC_IP> <GITHUB_REPO_URL>"}
REPO_NAME=$(basename "$REPO_URL" .git)
APP_DIR="$HOME/$REPO_NAME/s/v"

echo ""
echo "============================================="
echo " Service Finder — Starting Deployment"
echo " EC2 IP  : $EC2_IP"
echo " Repo    : $REPO_URL"
echo " App Dir : $APP_DIR"
echo "============================================="
echo ""

# ─── Step 1: System Update ────────────────────────────────
echo "[1/9] Updating system packages..."
sudo apt update -y && sudo apt upgrade -y

# ─── Step 2: Install NVM + Node.js ────────────────────────
echo "[2/9] Installing NVM and Node.js LTS..."
if [ ! -d "$HOME/.nvm" ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
source "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
echo "Node: $(node -v) | npm: $(npm -v)"

# ─── Step 3: Install PM2 + Nginx ──────────────────────────
echo "[3/9] Installing PM2 and Nginx..."
npm install -g pm2
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# ─── Step 4: Clone Repository ─────────────────────────────
echo "[4/9] Cloning repository..."
cd "$HOME"
if [ -d "$REPO_NAME" ]; then
  echo "Repo already exists — pulling latest changes..."
  cd "$REPO_NAME" && git pull origin main
else
  git clone "$REPO_URL"
fi
cd "$APP_DIR"

# ─── Step 5: Backend Setup ────────────────────────────────
echo "[5/9] Setting up backend..."
cd "$APP_DIR/backend"
npm install --omit=dev

# Create logs directory for PM2
mkdir -p logs

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
  echo ""
  echo "⚠️  .env not found. Creating from .env.example..."
  cp .env.example .env
  echo ""
  echo "================================================================"
  echo " ACTION REQUIRED: Edit backend/.env before continuing!"
  echo " Fill in: MONGO_URI, JWT_SECRET, and set CLIENT_URL=$EC2_IP"
  echo " Run: nano $APP_DIR/backend/.env"
  echo "================================================================"
  echo ""
  read -rp "Press ENTER after you have saved your .env file..."
fi

# Inject EC2 IP as CLIENT_URL if still localhost
sed -i "s|CLIENT_URL=http://localhost:5173|CLIENT_URL=http://$EC2_IP|g" .env
echo "CLIENT_URL set to: http://$EC2_IP"

# ─── Step 6: Start Backend with PM2 ──────────────────────
echo "[6/9] Starting backend with PM2..."
pm2 delete service-backend 2>/dev/null || true
pm2 start ecosystem.config.cjs --env production
pm2 save

# Set PM2 to auto-start on reboot
PM2_STARTUP=$(pm2 startup systemd -u "$USER" --hp "$HOME" | grep "sudo")
echo "Running: $PM2_STARTUP"
eval "$PM2_STARTUP"
pm2 save

# ─── Step 7: Frontend Build ───────────────────────────────
echo "[7/9] Building frontend..."
cd "$APP_DIR/frontend"
npm install
npm run build
echo "Frontend built → dist/ ready"

# ─── Step 8: Configure Nginx ──────────────────────────────
echo "[8/9] Configuring Nginx..."
sudo tee /etc/nginx/sites-available/service-finder > /dev/null <<EOF
server {
    listen 80;
    server_name $EC2_IP;

    # Serve Vite React Build (dist/)
    root $APP_DIR/frontend/dist;
    index index.html;

    # React Router support (client-side routing)
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Reverse Proxy → Backend API (port 5000)
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Gzip compression for performance
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/service-finder /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t && sudo systemctl reload nginx
echo "Nginx configured and restarted."

# ─── Step 9: Fix Permissions ──────────────────────────────
echo "[9/9] Setting directory permissions..."
chmod -R 755 "$HOME/$REPO_NAME"

# ─── Final Status ─────────────────────────────────────────
echo ""
echo "============================================="
echo " ✅  DEPLOYMENT COMPLETE!"
echo "============================================="
echo ""
echo " 🌐 App URL    : http://$EC2_IP"
echo " 📡 API Health : http://$EC2_IP/api/"
echo ""
echo " PM2 Status:"
pm2 status
echo ""
echo " Nginx Status:"
sudo systemctl status nginx --no-pager -l
echo ""
echo " Backend Logs:"
pm2 logs service-backend --lines 20 --nostream
echo ""
echo "============================================="
echo " Next steps:"
echo "  1. Open http://$EC2_IP in your browser"
echo "  2. (Optional) Setup domain + HTTPS:"
echo "     sudo apt install certbot python3-certbot-nginx -y"
echo "     sudo certbot --nginx -d yourdomain.com"
echo "============================================="
