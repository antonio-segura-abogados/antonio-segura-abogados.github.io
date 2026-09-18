// Renueva solo las capturas solicitadas de las páginas 8, 9, 16 y 17.
import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../../', import.meta.url));
const base = process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errores = [], capturas = [];
try {
  const context = await browser.newContext({ viewport: { width: 1200, height: 1100 }, deviceScaleFactor: 3 });
  const page = await context.newPage();
  page.on('pageerror', e => errores.push(e.message));
  async function abrir(ruta) {
    await page.goto(`${base}/#${ruta}`);
    await page.locator('[data-capture="phone"]').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '.scene-shell, html, body { background: transparent; } .device-frame { box-shadow: none; }' });
  }
  async function capturar(archivo, estado) {
    await page.locator('.device-scroll').evaluate(el => { el.scrollTop = 0; });
    await page.locator('[data-capture="phone"]').screenshot({ path: `${root}recursos-compartidos/assets/demo/${archivo}`, omitBackground: true });
    capturas.push({ archivo, ruta: new URL(page.url()).hash, estado, escala: 3 });
  }
  await abrir('/entrevista?tour=1');
  assert.ok(!(await page.locator('body').innerText()).includes(base));
  await capturar('08-13/08-objetivo.png', 'Elección de objetivo');
  await page.getByRole('button', { name: 'Comenzar mi entrevista' }).click();
  await page.getByRole('radio', { name: 'Sí, estoy en España', exact: true }).check();
  await capturar('08-13/09-entrevista.png', 'Primera pregunta, ubicación actual');
  await abrir('/practica');
  await page.getByRole('heading', { name: 'Más cerca de tu nacionalidad.' }).waitFor();
  await capturar('14-19/16-practica.png', 'Entrada: preparación y cuatro modos');
  await page.getByRole('button', { name: /Ruta de aprendizaje/ }).click();
  await capturar('14-19/16-practica-ruta.png', 'Primera sección ilustrada y camino de aprendizaje');
  await page.locator('.practice-path-node').first().click();
  const banco = JSON.parse(await readFile(`${root}recursos-compartidos/ccse/preguntas-2026.json`));
  const id = await page.locator('.quiz-card').getAttribute('data-question-id');
  const pregunta = banco.tematicas.flatMap(t => t.preguntas).find(p => p.id === id);
  await page.locator('.quiz-options button').nth(pregunta.opciones.findIndex(o => o.id === pregunta.respuestaCorrecta)).click();
  await page.getByRole('button', { name: 'Comprobar respuesta' }).click();
  await capturar('14-19/16-practica-pregunta.png', 'Respuesta correcta comprobada y racha de sesión');
  await abrir('/consultas/sala-demo');
  await page.getByRole('button', { name: 'Terminar', exact: true }).waitFor();
  await capturar('14-19/17-consultas.png', 'Videollamada inmersiva con controles superpuestos');
  assert.deepEqual(errores, []);
  await writeFile(new URL('./CAPTURAS.json', import.meta.url), JSON.stringify({ fecha: new Date().toISOString(), base, navegador: 'Chrome, perfil temporal limpio', capturas, errores, entrevistaSinUrlVisible: true }, null, 2) + '\n');
  console.log('Seis capturas renovadas; entrevista sin URL visible; sin errores de JavaScript.');
} finally { await browser.close(); }
