#!/bin/bash

# Deploy to Cloudflare Workers with delivery reconciliation
echo "🚀 Deploying Huaxia Gateway with Delivery Reconciliation..."

# Install dependencies
npm install

# Build the worker
npm run build || echo "No build step needed"

# Deploy
npx wrangler deploy --env production

# Trigger initial reconciliation
echo "🔄 Triggering initial reconciliation..."
curl -X POST https://huaxia-gateway.workers.dev/api/reconcile

echo "✅ Deployment complete!"