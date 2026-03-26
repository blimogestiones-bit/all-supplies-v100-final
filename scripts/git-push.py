import subprocess
import sys
import os

# Use absolute path to project
project_path = '/vercel/share/v0-project'
os.chdir(project_path)
print(f'[v0] Changed to project directory: {os.getcwd()}')

# Verify git repo exists
if not os.path.exists('.git'):
    print('[v0] ERROR: .git directory not found')
    sys.exit(1)

print('[v0] Git repository found')

try:
    # Configure git
    subprocess.run(['git', 'config', 'user.email', 'v0@vercel.com'], check=True)
    subprocess.run(['git', 'config', 'user.name', 'v0 Assistant'], check=True)
    
    # Add all changes
    subprocess.run(['git', 'add', '.'], check=True)
    
    # Commit changes
    result = subprocess.run(
        ['git', 'commit', '-m', 'Complete redesign: Enhanced hero, products carousel, full catalog, certifications, allies sections, and professional oil & gas styling'],
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        print('[v0] Commit successful')
    elif 'nothing to commit' in result.stdout or 'nothing to commit' in result.stderr:
        print('[v0] No changes to commit')
    else:
        print(f'[v0] Commit output: {result.stdout}')
        print(f'[v0] Commit errors: {result.stderr}')
    
    # Push to main
    push_result = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True)
    
    if push_result.returncode == 0:
        print('[v0] Push to main branch successful!')
        print('[v0] Changes deployed to GitHub and Vercel')
    else:
        print(f'[v0] Push output: {push_result.stdout}')
        print(f'[v0] Push errors: {push_result.stderr}')
        sys.exit(1)

except subprocess.CalledProcessError as e:
    print(f'[v0] Git command failed: {e}')
    sys.exit(1)
except Exception as e:
    print(f'[v0] Error: {str(e)}')
    sys.exit(1)
