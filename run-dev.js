import { spawn } from 'child_process';
import path from 'path';

console.log('💃 Launching Sargam Dance Studio (Server + Client)...');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Start Server
const server = spawn(npmCmd, ['--prefix', 'server', 'run', 'start'], {
  stdio: 'inherit',
  shell: true
});

// Start Client
const client = spawn(npmCmd, ['--prefix', 'client', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  server.kill();
  client.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
