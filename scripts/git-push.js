import { execSync } from 'child_process';

try {
  console.log('[v0] Configuring git...');
  execSync('git config user.email "v0@vercel.dev"', { cwd: '/vercel/share/v0-project', stdio: 'inherit' });
  execSync('git config user.name "v0 Assistant"', { cwd: '/vercel/share/v0-project', stdio: 'inherit' });

  console.log('[v0] Adding all changes...');
  execSync('git add -A', { cwd: '/vercel/share/v0-project', stdio: 'inherit' });

  console.log('[v0] Committing changes...');
  execSync('git commit -m "feat: rebuild products catalog with 3-column grid layout and descriptions"', { cwd: '/vercel/share/v0-project', stdio: 'inherit' });

  console.log('[v0] Pushing to main branch...');
  execSync('git push origin main', { cwd: '/vercel/share/v0-project', stdio: 'inherit' });

  console.log('[v0] Successfully pushed changes to main branch!');
} catch (error) {
  console.error('[v0] Error during git operations:', error.message);
  process.exit(1);
}
