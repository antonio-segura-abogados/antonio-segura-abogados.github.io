import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { comprobarEntrevista } from './comprobar.mjs';
const captures = '/private/tmp/asa-auditoria-entrevista';
await mkdir(captures, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const base = process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
  async function open(route) {
    await page.goto('about:blank'); await page.goto(`${base}/#${route}`);
    await page.locator('.scene-shell').waitFor(); await page.evaluate(() => document.fonts.ready);
  }
  const cases = await comprobarEntrevista(page, open, captures);
  assert.deepEqual(errors, []);
  await writeFile('vertical/diseno/entrevista/VERIFICACION-UI.json', JSON.stringify({ fecha: '2026-09-18', resultado: 'correcto', casos: cases, anchosSelectores: [1440, 390, 320], comprobaciones: ['Selector país, provincia y nacionalidades; tildes, teclado y selección múltiple', '41 recorridos completos en ordenador y móvil', 'Resumen correcto y sin preguntas improcedentes', 'Edición atómica: cancelar, quitar/reponer selección y cambiar de rama', 'Conservación de respuestas válidas y preguntas nuevas pendientes', 'Fechas inválidas con explicación y avance deshabilitado', 'Dos acciones finales, confirmación simulada y reinicio', 'Sin desbordamiento horizontal ni errores JavaScript'], capturas: captures }, null, 2) + '\n');
} finally { await browser.close(); }
