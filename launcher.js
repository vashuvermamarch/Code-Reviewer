const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Code Reviewer IDE...');

// Start Backend
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'BackEnd'),
  shell: true,
  stdio: 'pipe'
});

backend.stdout.on('data', (data) => {
  if (data.toString().includes('server is running')) {
    console.log('✅ Backend is ready!');
  }
});

backend.stderr.on('data', (data) => {
  console.error(`[BackEnd Error]: ${data}`);
});

// Start Frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'FrontEnd'),
  shell: true,
  stdio: 'inherit'
});

frontend.on('exit', (code) => {
  console.log(`Frontend process exited with code ${code}`);
  backend.kill();
  process.exit(code);
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
