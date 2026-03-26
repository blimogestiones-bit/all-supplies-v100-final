#!/bin/bash

cd /vercel/share/v0-project

# Configure git
git config user.email "v0@vercel.dev"
git config user.name "v0 Assistant"

# Add all changes
git add -A

# Commit changes
git commit -m "feat: rebuild products catalog with 3-column grid layout and descriptions"

# Push to main branch
git push origin main

echo "Changes pushed to main branch successfully!"
