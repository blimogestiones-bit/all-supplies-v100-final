#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

try {
  // Navigate to project root
  const projectRoot = path.resolve(__dirname, '..');
  process.chdir(projectRoot);
  
  console.log(`[v0] Working directory: ${process.cwd()}`);
  
  // Check if we're in a git repo
  try {
    execSync('git status', { stdio: 'ignore' });
  } catch {
    console.error('[v0] Not a git repository');
    process.exit(1);
  }
  
  // Stage all changes
  console.log('[v0] Staging changes...');
  execSync('git add -A');
  
  // Commit changes
  console.log('[v0] Creating commit...');
  execSync('git commit -m "Complete redesign: Enhanced hero, products carousel, full catalog, certifications, allies sections, and professional oil & gas styling"', { stdio: 'inherit' });
  
  // Push to main
  console.log('[v0] Pushing to main branch...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('[v0] SUCCESS: All changes pushed to GitHub!');
} catch (error) {
  console.error('[v0] Error during git operations:', error.message);
  process.exit(1);
}
