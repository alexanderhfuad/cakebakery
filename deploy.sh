#!/bin/bash

# Brielicious Bakery - Hostinger Deployment Script
# Usage: ./deploy.sh [user@domain] [remote_path]

REMOTE_USER="${1:-admin@yourdomain.com}"
REMOTE_PATH="${2:-~/public_html}"

echo "🚀 Brielicious Bakery - Deployment Script"
echo "=========================================="
echo "Remote: $REMOTE_USER:$REMOTE_PATH"
echo ""

# Step 1: Build frontend
echo "📦 Building frontend..."
npm run build --workspace=frontend
if [ $? -ne 0 ]; then
  echo "❌ Frontend build failed!"
  exit 1
fi
echo "✅ Frontend built successfully"
echo ""

# Step 2: Create temp deployment folder
echo "📁 Preparing deployment package..."
DEPLOY_DIR="./deploy-temp"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy frontend build
cp -r frontend/dist $DEPLOY_DIR/

# Copy backend files
cp -r backend/src $DEPLOY_DIR/
cp backend/package.json $DEPLOY_DIR/
cp backend/tsconfig.json $DEPLOY_DIR/

# Copy .htaccess
cp .htaccess $DEPLOY_DIR/

# Copy root package.json
cp package.json $DEPLOY_DIR/

# Create .env template reminder
echo "# ⚠️ IMPORTANT: Update these values before uploading to server" > $DEPLOY_DIR/.env.template
echo "PORT=3001" >> $DEPLOY_DIR/.env.template
echo "CLIENT_URL=https://yourdomain.com" >> $DEPLOY_DIR/.env.template
echo "SUPABASE_URL=your_supabase_url" >> $DEPLOY_DIR/.env.template
echo "SUPABASE_SERVICE_ROLE_KEY=your_service_role_key" >> $DEPLOY_DIR/.env.template

echo "✅ Deployment package ready: $DEPLOY_DIR/"
echo ""

# Step 3: Sync to remote server
if command -v rsync &> /dev/null; then
  echo "🔄 Syncing to server via rsync..."
  rsync -avz --delete $DEPLOY_DIR/ $REMOTE_USER:$REMOTE_PATH/
  if [ $? -eq 0 ]; then
    echo "✅ Synced successfully!"
  else
    echo "❌ Rsync failed! Make sure SSH is configured correctly."
    exit 1
  fi
else
  echo "⚠️  rsync not found. Using alternative upload method:"
  echo "1. Upload the contents of $DEPLOY_DIR manually via FTP/SFTP"
  echo "2. Or use: scp -r $DEPLOY_DIR/* $REMOTE_USER:$REMOTE_PATH/"
fi

echo ""
echo "🔧 Post-deployment setup on server:"
echo "1. SSH into server: ssh $REMOTE_USER"
echo "2. Navigate: cd public_html"
echo "3. Set permissions:"
echo "   chmod -R 755 ."
echo "   chmod 644 *.html"
echo "   chmod 600 .env"
echo "4. Install backend dependencies: npm install --production"
echo "5. Verify: curl http://localhost:3001/api/health"
echo ""
echo "✨ Deployment package ready! Visit Hostinger cPanel for final steps."
