# Deployment Guide — Khan Meditour

## Quick deploy (manual, via SSH)

```bash
# 1. SSH into your server
ssh root@159.198.47.4

# 2. Go to the project directory
cd /home/Meditour/src/meditour/frontend

# 3. Pull the latest code from GitHub
git pull origin main

# 4. Install dependencies (only needed if package.json changed)
npm install

# 5. Build the site
npm run build

# 6. Clear the old files from the web directory
rm -rf /home/Meditour/web/khanmeditour.com/public_html/*

# 7. Copy the new build output to the web directory
cp -r /home/Meditour/src/meditour/frontend/.vercel/output/static/* /home/Meditour/web/khanmeditour.com/public_html/

# 8. Fix file ownership
chown -R Meditour:www-data /home/Meditour/web/khanmeditour.com/public_html/

# 9. Verify the site
curl -s https://khanmeditour.com | head -5
```

---

## One-command deploy script

Save this as `/home/Meditour/src/meditour/deploy.sh`:

```bash
#!/bin/bash
set -e

echo "=== Deploying khanmeditour.com ==="

cd /home/Meditour/src/meditour/frontend

echo "1. Pulling latest code..."
git pull origin main

echo "2. Installing dependencies..."
npm install

echo "3. Building site..."
npm run build

echo "4. Deploying to public_html..."
rm -rf /home/Meditour/web/khanmeditour.com/public_html/*
cp -r .vercel/output/static/* /home/Meditour/web/khanmeditour.com/public_html/
chown -R Meditour:www-data /home/Meditour/web/khanmeditour.com/public_html/

echo "5. Verifying..."
PAGE_SIZE=$(curl -s https://khanmeditour.com | wc -c)
echo "   Home page size: $PAGE_SIZE bytes"

echo "=== Deploy complete ==="
```

Make it executable:
```bash
chmod +x /home/Meditour/src/meditour/deploy.sh
```

Then deploy with one command:
```bash
/home/Meditour/src/meditour/deploy.sh
```

---

## Automated CI/CD with GitHub Actions (optional, future)

To auto-deploy on every push to `main`, add a GitHub Actions workflow.

### Step 1: Create an SSH key for deployment

On your server:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_deploy
```

### Step 2: Add the private key to GitHub

Go to: `https://github.com/Dr-Olami/meditour/settings/secrets/actions`

Add a new repository secret:
- Name: `SERVER_SSH_KEY`
- Value: (paste the private key from `cat ~/.ssh/github_deploy`)

Add another secret:
- Name: `SERVER_HOST`
- Value: `159.198.47.4`

### Step 3: Create the deploy workflow

Create `frontend/.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: root
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /home/Meditour/src/meditour/frontend
            git pull origin main
            npm install
            npm run build
            rm -rf /home/Meditour/web/khanmeditour.com/public_html/*
            cp -r .vercel/output/static/* /home/Meditour/web/khanmeditour.com/public_html/
            chown -R Meditour:www-data /home/Meditour/web/khanmeditour.com/public_html/
```

After this, every `git push origin main` will automatically:
1. Run the CI checks (lint, test, build)
2. SSH into your server
3. Pull, build, and deploy

---

## Architecture overview

```
GitHub (Dr-Olami/meditour)
    │
    ├── Local dev (your machine)
    │     └── npm run dev
    │
    ├── Vercel preview (meditour-zeta.vercel.app)
    │     └── npx vercel --prod
    │
    └── Production server (khanmeditour.com)
          ├── Source:  /home/Meditour/src/meditour/frontend/
          ├── Build:   /home/Meditour/src/meditour/frontend/.vercel/output/static/
          └── Served:  /home/Meditour/web/khanmeditour.com/public_html/
                └── Nginx (HestiaCP) → Cloudflare → khanmeditour.com
```

## Key paths on the server

| Purpose | Path |
|---|---|
| Git repo | `/home/Meditour/src/meditour/` |
| Frontend source | `/home/Meditour/src/meditour/frontend/` |
| Build output | `/home/Meditour/src/meditour/frontend/.vercel/output/static/` |
| Web root (nginx serves) | `/home/Meditour/web/khanmeditour.com/public_html/` |
| Nginx config | `/home/Meditour/conf/web/khanmeditour.com/nginx.conf` |
| Sitemap | `/home/Meditour/web/khanmeditour.com/public_html/sitemap-0.xml` |
