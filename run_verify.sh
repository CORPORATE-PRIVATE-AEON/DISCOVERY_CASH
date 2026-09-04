TT#!/bin/bash
cd /workspaces/DISCOVERY_CASH && node test_verify.js > /workspaces/DISCOVERY_CASH/verify_result.txt 2>&1
echo "EXIT_CODE=$?" >> /workspaces/DISCOVERY_CASH/verify_result.txt
