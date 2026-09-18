// Perfil temporal: comprueba la racha real mediante la interfaz del preguntador.
import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const out = fileURLToPath(new URL('.', import.meta.url));
const banco = JSON.parse(await readFile(new URL('../../../recursos-compartidos/ccse/preguntas-2026.json', import.meta.url)));
const byId = new Map(banco.tematicas.flatMap(t => t.preguntas).map(p => [p.id, p]));
const base = process.argv[2] || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errores = [], logs = [], comprobaciones = [];
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 1000 } });
  const page = await context.newPage();
  page.on('pageerror', e => errores.push(e.message));
  page.on('console', m => {
    if (m.type() === 'error') errores.push(m.text());
    if (m.type() === 'log' && m.text().startsWith('[CCSE · prueba]')) logs.push(m.text());
  });
  async function inicio() {
    await page.goto('about:blank');
    await page.goto(`${base}/#/practica`);
    await page.getByRole('heading', { name: 'Más cerca de tu nacionalidad.' }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('.quiz-streak').count(), 0);
  }
  async function tema() {
    await page.getByRole('button', { name: /Repaso por temáticas/ }).click();
    await page.locator('.practice-topic-card').first().click();
    assert.equal(await page.locator('.quiz-streak-count strong').innerText(), '0');
  }
  async function responder(correcto = true) {
    const id = await page.locator('.quiz-card').getAttribute('data-question-id');
    const p = byId.get(id);
    const respuesta = p.opciones.find(o => o.id === p.respuestaCorrecta);
    assert.ok(logs.some(l => l.includes(`${id} · Respuesta correcta: ${respuesta.id.toUpperCase()} — ${respuesta.texto}`)), `Log de ${id}`);
    const indice = p.opciones.findIndex(o => correcto ? o.id === p.respuestaCorrecta : o.id !== p.respuestaCorrecta);
    const logsPrevios = logs.length;
    await page.locator('.quiz-options button').nth(indice).click();
    await page.getByRole('button', { name: 'Comprobar respuesta' }).click();
    await page.locator('.quiz-streak-feedback').waitFor();
    assert.equal(logs.length, logsPrevios, 'Comprobar no duplica el log de la pregunta');
  }
  async function siguiente() {
    await page.getByRole('button', { name: 'Siguiente pregunta' }).click();
    assert.equal(await page.locator('.quiz-energy').count(), 0);
  }
  async function captura(nombre, instante = 220) {
    // Congela el efecto para revisar un fotograma reproducible, incluso si
    // la captura tarda más que la animación.
    await page.locator('.quiz-play').evaluate((el, ms) => {
      for (const animation of el.getAnimations({ subtree: true })) { animation.pause(); animation.currentTime = ms; }
    }, instante);
    await page.locator('.quiz-play').screenshot({ path: `${out}racha-${nombre}.png` });
  }
  await inicio();
  await tema();
  for (let racha = 1; racha <= 12; racha++) {
    await responder();
    assert.equal(await page.locator('.quiz-streak-count strong').innerText(), String(racha));
    assert.equal(await page.locator('.quiz-options button:not(:disabled)').count(), 0);
    const niveles = { 1: 1, 3: 2, 5: 3, 8: 4, 12: 5 };
    if (niveles[racha]) {
      assert.equal(await page.locator('.quiz-play').getAttribute('data-streak-level'), String(niveles[racha]));
      assert.equal(await page.locator('.quiz-energy-ray').count(), 3 + niveles[racha] * 3);
      await captura(String(racha));
    }
    await siguiente();
    assert.equal(await page.locator('.quiz-streak-count strong').innerText(), String(racha));
  }
  comprobaciones.push('12 aciertos consecutivos; cinco intensidades crecientes y racha conservada al avanzar.');
  await responder(false);
  assert.equal(await page.locator('.quiz-streak-count strong').innerText(), '0');
  assert.equal(await page.locator('.quiz-streak-question.is-miss').count(), 1);
  assert.equal(await page.locator('.quiz-energy').count(), 0);
  await captura('fallo', 90);
  await siguiente();
  await responder();
  assert.equal(await page.locator('.quiz-streak-count strong').innerText(), '1');
  comprobaciones.push('El fallo reinicia la racha y activa sacudida/destello rojo; el siguiente acierto inicia una nueva.');
  await page.getByRole('button', { name: 'Salir de la sesión' }).click();
  await page.getByRole('button', { name: 'Guardar y salir', exact: true }).click();
  assert.equal(await page.locator('.quiz-streak').count(), 0);
  await page.locator('.practice-topic-card').first().click();
  assert.equal(await page.locator('.quiz-streak-count strong').innerText(), '0');
  await inicio();
  await tema();
  comprobaciones.push('La racha desaparece fuera del cuestionario y empieza en cero al reabrir y recargar.');
  for (const width of [320, 390, 1100]) {
    await page.setViewportSize({ width, height: 1100 });
    await responder();
    await captura(`ancho-${width}`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await siguiente();
  }
  comprobaciones.push('Sin desbordamientos a 320, 390 y 1100 px; capturas en cada ancho.');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await responder();
  assert.equal(await page.locator('.quiz-play').evaluate(el => el.getAnimations({ subtree: true }).length), 0);
  await siguiente();
  await responder(false);
  assert.equal(await page.locator('.quiz-play').evaluate(el => el.getAnimations({ subtree: true }).length), 0);
  comprobaciones.push('Movimiento reducido: acierto/fallo mantienen texto y color sin animaciones ni sacudidas.');
  await inicio();
  await page.getByRole('button', { name: /Repaso por temáticas/ }).click();
  const breve = banco.tematicas.findIndex(t => t.preguntas.length === 2);
  assert.ok(breve >= 0);
  await page.locator('.practice-topic-card').nth(breve).click();
  await responder();
  await siguiente();
  await responder();
  await page.getByRole('button', { name: 'Ver mi resultado' }).click();
  assert.equal(await page.locator('.quiz-streak, .quiz-energy').count(), 0);
  comprobaciones.push('Al completar el cuestionario desaparecen contador y efectos; la pantalla de resultados conserva su contenido.');
  await inicio();
  await page.getByRole('button', { name: /Simulacro de examen/ }).click();
  await page.getByRole('button', { name: 'Comenzar simulacro' }).click();
  await page.locator('.quiz-options button').first().click();
  assert.equal(await page.locator('.quiz-streak, .quiz-energy, .quiz-streak-feedback').count(), 0);
  await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
  assert.ok(logs.at(-1).includes(await page.locator('.quiz-card').getAttribute('data-question-id')));
  comprobaciones.push('Simulacro con corrección diferida intacta y respuesta correcta en consola al cambiar de pregunta.');
  assert.equal(errores.length, 0, errores.join('\n'));
  await writeFile(`${out}VERIFICACION-RACHAS.json`, JSON.stringify({ fecha: new Date().toISOString(), url: base, comprobaciones, errores, respuestasRegistradasEnConsola: logs.length }, null, 2) + '\n');
  console.log(JSON.stringify({ comprobaciones, errores }, null, 2));
} finally { await browser.close(); }
