#!/bin/bash

# OpenSearch Quick Start Script
# Automates SSH tunnel setup and configuration

echo "🔍 OpenSearch Quick Start"
echo "========================="
echo ""

# Check if tunnel is already running
if lsof -i :9201 > /dev/null 2>&1; then
    echo "✅ SSH tunnel is already running"
else
    echo "🚀 Starting SSH tunnel..."
    nohup ssh -o ServerAliveInterval=60 \
      -L 9201:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 \
      -N rick_gao@jumphost-sg.castlery.com > /tmp/ssh-tunnel.log 2>&1 &
    
    echo "⏳ Waiting for connection..."
    sleep 3
    
    if lsof -i :9201 > /dev/null 2>&1; then
        echo "✅ SSH tunnel started successfully"
    else
        echo "❌ SSH tunnel failed to start"
        echo "Please check SSH configuration"
        exit 1
    fi
fi

echo ""
echo "🧪 Testing OpenSearch connection..."
if curl -k -u "hackathon:01\$sCyKeS\!ZnTlh*Mf" https://localhost:9201/_cluster/health > /dev/null 2>&1; then
    echo "✅ OpenSearch connection successful"
else
    echo "❌ OpenSearch connection failed"
    exit 1
fi

echo ""
echo "📝 Checking .env configuration..."
if grep -q "ENABLE_OPENSEARCH_SYNC=true" .env; then
    echo "✅ OpenSearch sync is enabled"
else
    echo "⚠️  OpenSearch sync is not enabled"
    echo ""
    read -p "Enable OpenSearch sync? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if grep -q "ENABLE_OPENSEARCH_SYNC" .env; then
            sed -i.bak 's/ENABLE_OPENSEARCH_SYNC=.*/ENABLE_OPENSEARCH_SYNC=true/' .env
        else
            echo "ENABLE_OPENSEARCH_SYNC=true" >> .env
        fi
        echo "✅ OpenSearch sync enabled"
        echo "⚠️  Please restart Medusa server"
    fi
fi

echo ""
echo "🎉 Done!"
echo ""
echo "Next steps:"
echo "1. Restart Medusa: yarn dev --filter=medusa"
echo "2. Test sync: node test-opensearch-sync.js"
echo ""
echo "Stop tunnel: pkill -f 'ssh.*9201'"
echo "Documentation: ../../docs/OPENSEARCH.md"
