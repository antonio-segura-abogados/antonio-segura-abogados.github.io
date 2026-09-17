import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const local = `${root}.venv-librito/bin/python`;
const python = process.env.AS_LIBRITO_PYTHON || (existsSync(local) ? local : 'python3');
const result = spawnSync(python, [`${root}librito/compilar.py`, ...process.argv.slice(2)], { cwd: root, stdio: 'inherit' });
if (result.error) console.error(result.error.message);
if (result.status !== 0) console.error('Preparación inicial: python3 -m venv .venv-librito && .venv-librito/bin/pip install -r librito/requirements.txt');
process.exit(result.status ?? 1);
