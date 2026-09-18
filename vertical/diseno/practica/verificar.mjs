// Verificación local con un perfil temporal, sin usar sesiones personales.
import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const out = fileURLToPath(new URL('.', import.meta.url));
const banco = JSON.parse(await readFile(new URL('../../../recursos-compartidos/ccse/preguntas-2026.json', import.meta.url)));
const byId = new Map(banco.tematicas.flatMap(t => t.preguntas).map(p => [p.id, p]));
const base = process.argv[2] || process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errors = [], pruebas = [];
let page;
try {
  const context = await browser.newContext({ viewport: { width: 1100, height: 1100 }, deviceScaleFactor: 1.5 });
  page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', message => { if (message.type() === 'error') console.error('Consola:', message.text()); });
  page.on('requestfailed', request => console.error('Petición fallida:', request.url(), request.failure()));
  async function open() {
    await page.goto(`${base}/#/practica`);
    await page.getByRole('heading', { name: 'Más cerca de tu nacionalidad.' }).waitFor();
    await page.evaluate(() => document.fonts.ready);
  }
  async function reset() { await page.getByRole('button', { name: 'Reiniciar', exact: true }).click(); }
  async function capture(name) { await page.locator('[data-capture="phone"]').screenshot({ path: `${out}${name}.png` }); }
  async function gallery() {
    await page.getByRole('button', { name: /Explorar secciones/ }).click();
    assert.equal(await page.locator('.practice-topic-card').count(), 20);
  }
  async function chooseSection(index) {
    await gallery();
    const card = page.locator(`[data-topic-id="${banco.tematicas[index].id}"]`);
    const icon = await card.locator('img').getAttribute('src');
    await card.click();
    assert.equal(await page.locator('.practice-section-banner img').getAttribute('src'), icon);
  }
  async function checkIcons() {
    const sources = await page.locator('.practice-topic-card img').evaluateAll(async images => {
      await Promise.all(images.map(image => image.decode()));
      return images.map(image => ({ src: image.currentSrc, width: image.naturalWidth, size: image.getBoundingClientRect().width, alt: image.alt }));
    });
    assert.equal(sources.length, 20);
    assert.equal(new Set(sources.map(image => image.src)).size, 20);
    assert.ok(sources.every(image => image.width > 0 && image.size >= 112 && image.alt === ''));
  }
  async function quizAnswer(correct = true) {
    const code = await page.locator('.quiz-card').getAttribute('data-question-id');
    const q = byId.get(code);
    const i = q.opciones.findIndex(o => correct ? o.id === q.respuestaCorrecta : o.id !== q.respuestaCorrecta);
    await page.locator('.quiz-options button').nth(i).click();
    await page.getByRole('button', { name: 'Comprobar respuesta' }).click();
    return code;
  }
  await open();
  await capture('01-inicio-escritorio');
  await page.getByRole('button', { name: /Empezar mi ruta/ }).click();
  await capture('02-ruta-escritorio');
  await gallery();
  await checkIcons();
  assert.equal(await page.locator('.practice-topic-card[aria-current="step"]').count(), 1);
  await capture('11-secciones-escritorio');
  await page.getByRole('button', { name: 'Mi ruta', exact: true }).click();
  for (const [i, tema] of banco.tematicas.entries()) {
    await chooseSection(i);
    assert.equal(await page.locator('.practice-path-node').count(), Math.max(1, tema.subcategorias.length) + 1);
    assert.match(await page.locator('.practice-section-banner').innerText(), new RegExp(`${tema.totalPreguntas} preguntas`));
    await page.getByRole('button', { name: 'Repaso final', exact: true }).click();
    assert.match(await page.locator('.practice-session-meta').innerText(), new RegExp(`Pregunta 1 de ${tema.totalPreguntas}`));
    await page.getByRole('button', { name: 'Salir de la sesión' }).click();
    assert.equal(await page.getByRole('dialog').isVisible(), true);
    assert.equal(await page.locator('.device-viewport > .scene-dialog-layer').count(), 1);
    await page.getByRole('button', { name: 'Guardar y salir' }).click();
  }
  pruebas.push('Galería de 20 secciones con SVG distintos y cargados; la cabecera conserva el icono elegido. Cada sección abre sus temas y el repaso final completo. Diálogos contenidos en el marco.');
  await chooseSection(5);
  await page.locator('.practice-path-node').first().click();
  assert.equal(await page.getByRole('button', { name: 'Comprobar respuesta' }).isDisabled(), true);
  await quizAnswer(false);
  assert.equal(await page.locator('.quiz-options button:disabled').count(), 3);
  await page.getByRole('button', { name: 'Siguiente pregunta' }).click();
  await quizAnswer(true);
  await page.getByRole('button', { name: 'Ver mi resultado' }).click();
  assert.match(await page.locator('.practice-result-score').innerText(), /1.*2/);
  await page.getByRole('button', { name: 'Volver a mi ruta' }).click();
  assert.equal(await page.locator('.practice-learning-path .is-complete').count(), 1);
  await page.getByRole('button', { name: 'Repaso final', exact: true }).click();
  await quizAnswer(true);
  await page.getByRole('button', { name: 'Siguiente pregunta' }).click();
  await quizAnswer(true);
  await page.getByRole('button', { name: 'Ver mi resultado' }).click();
  await page.getByRole('button', { name: 'Volver a mi ruta' }).click();
  assert.equal(await page.locator('.practice-learning-path .is-complete').count(), 2);
  await gallery();
  assert.match(await page.locator('[data-topic-id="organismos-internacionales"]').innerText(), /Completada/);
  assert.equal(await page.locator('[data-topic-id="organismos-internacionales"] .practice-topic-complete').count(), 1);
  await page.reload();
  await page.getByRole('heading', { name: 'Más cerca de tu nacionalidad.' }).waitFor();
  assert.match(await page.locator('.practice-route-footer').innerText(), /1 \/ 20/);
  assert.match(await page.locator('.practice-overview').innerText(), /2 de 300/);
  pruebas.push('Cuestionarios y repasos finales completan pasos; respuestas se registran una vez; sección y progreso sobreviven a la recarga.');
  await reset();
  await page.getByRole('button', { name: /Repaso por temáticas/ }).click();
  assert.equal(await page.locator('.practice-topic-card').count(), 20);
  await checkIcons();
  await capture('03-tematicas-escritorio');
  for (const tema of banco.tematicas) {
    await page.getByRole('button', { name: new RegExp(tema.nombre) }).click();
    const id = await page.locator('.quiz-card').getAttribute('data-question-id');
    assert.ok(tema.preguntas.some(q => q.id === id));
    assert.match(await page.locator('.practice-session-meta').innerText(), new RegExp(`Pregunta 1 de ${tema.totalPreguntas}`));
    await page.getByRole('button', { name: 'Salir de la sesión' }).click();
    await page.getByRole('button', { name: 'Guardar y salir' }).click();
  }
  await page.getByRole('button', { name: /Gastronomía/ }).click();
  const fallada = await quizAnswer(false);
  await capture('04-cuestionario-escritorio');
  await page.getByRole('button', { name: 'Salir de la sesión' }).click();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(), 0);
  await page.getByRole('button', { name: 'Salir de la sesión' }).click();
  await page.getByRole('button', { name: 'Guardar y salir' }).click();
  await page.getByRole('button', { name: 'Práctica', exact: true }).click();
  await page.getByRole('button', { name: /Repaso inteligente/ }).click();
  await capture('05-inteligente-escritorio');
  await page.getByRole('button', { name: 'Empezar mis 5 minutos' }).click();
  assert.equal(await page.locator('.quiz-card').getAttribute('data-question-id'), fallada);
  assert.match(await page.getByRole('timer').innerText(), /[45]:[0-5][0-9]/);
  await quizAnswer(true);
  await page.getByRole('button', { name: 'Terminar repaso' }).click();
  assert.match(await page.locator('.practice-result-score').innerText(), /1.*1/);
  pruebas.push('Las 20 temáticas abren preguntas de su banco. Los errores de otros modos tienen prioridad en el repaso inteligente. Escape cierra la salida.');
  await reset();
  await page.getByRole('button', { name: /Simulacro de examen/ }).click();
  await capture('06-simulacro-escritorio');
  assert.match(await page.locator('.practice-time-warning').innerText(), /30 minutos/);
  assert.match(await page.locator('.practice-exam-motivation').innerText(), /Si apruebas, estás listo para presentarte/);
  await page.getByRole('button', { name: 'Comenzar simulacro' }).click();
  assert.match(await page.getByRole('timer').innerText(), /(?:30:00|29:[0-5][0-9])/);
  const examIds = [], tasks = [0,0,0,0,0];
  for (let i = 0; i < 25; i++) {
    const id = await page.locator('.quiz-card').getAttribute('data-question-id');
    const q = byId.get(id); examIds.push(id); tasks[q.tareaOficial - 1]++;
    const chosen = q.opciones.findIndex(o => i < 15 ? o.id === q.respuestaCorrecta : o.id !== q.respuestaCorrecta);
    await page.locator('.quiz-options button').nth(chosen).click();
    assert.equal(await page.locator('.quiz-explanation').count(), 0);
    if (i === 0) await capture('07-examen-escritorio');
    if (i < 24) await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
  }
  assert.equal(new Set(examIds).size, 25); assert.deepEqual(tasks, [10,3,2,3,7]);
  await page.getByRole('button', { name: 'Pregunta 1, respondida', exact: true }).click();
  assert.equal(await page.locator('.quiz-options button[aria-pressed=true]').count(), 1);
  await page.getByRole('button', { name: 'Pregunta 25, respondida', exact: true }).click();
  await page.getByRole('button', { name: 'Finalizar simulacro' }).click();
  assert.match(await page.locator('.practice-result').innerText(), /Simulacro aprobado/);
  assert.match(await page.locator('.practice-result-score').innerText(), /15.*25/);
  assert.equal(await page.getByRole('timer').count(), 0);
  await capture('08-resultado-escritorio');
  pruebas.push('Simulacro completo: 25 preguntas, reparto 10/3/2/3/7, respuestas revisables, sin correcciones anticipadas, aprobado con 15 aciertos y temporizador detenido al terminar.');
  await reset();
  await page.getByRole('button', { name: /Simulacro de examen/ }).click();
  await page.getByRole('button', { name: 'Comenzar simulacro' }).click();
  await page.getByRole('button', { name: 'Pregunta 25, sin responder', exact: true }).click();
  await page.getByRole('button', { name: 'Finalizar simulacro' }).click();
  assert.match(await page.getByRole('dialog').innerText(), /25 preguntas sin responder/);
  await page.getByRole('button', { name: 'Entregar de todas formas' }).click();
  assert.match(await page.locator('.practice-result-score').innerText(), /0.*25/);
  assert.equal(await page.getByRole('dialog').count(), 0);
  pruebas.push('Entrega en blanco requiere confirmación y puntúa 0/25.');
  for (const width of [320,390,768]) {
    await page.setViewportSize({ width, height: 844 });
    await reset();
    if (width === 390) await page.screenshot({ path: `${out}09-inicio-movil.png`, fullPage: true });
    async function fits(label) { assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${label} a ${width}px`); }
    await fits('inicio');
    await page.getByRole('button', { name: /Empezar mi ruta/ }).click(); await fits('ruta');
    if (width === 390) await page.screenshot({ path: `${out}10-ruta-movil.png`, fullPage: true });
    await gallery(); await fits('secciones'); await checkIcons();
    if (width === 390) await page.screenshot({ path: `${out}12-secciones-movil.png`, fullPage: true });
    await page.locator('[data-topic-id="organismos-internacionales"]').click(); await fits('sección con nombre largo');
    await page.getByRole('button', { name: 'Práctica', exact: true }).click();
    await page.getByRole('button', { name: /Repaso por temáticas/ }).click(); await fits('temáticas');
    await checkIcons();
    if (width === 390) await page.screenshot({ path: `${out}13-tematicas-movil.png`, fullPage: true });
    await page.getByRole('button', { name: /Gastronomía/ }).click(); await fits('cuestionario');
    await page.getByRole('button', { name: 'Salir de la sesión' }).click(); await fits('diálogo');
    const dialog = await page.getByRole('dialog').boundingBox();
    assert.ok(dialog.x >= 0 && dialog.x + dialog.width <= width);
    await page.getByRole('button', { name: 'Guardar y salir' }).click();
    await page.getByRole('button', { name: 'Práctica', exact: true }).click();
    await page.getByRole('button', { name: /Repaso inteligente/ }).click(); await fits('inteligente');
    await page.getByRole('button', { name: 'Práctica', exact: true }).click();
    await page.getByRole('button', { name: /Simulacro de examen/ }).click(); await fits('simulacro');
    await page.getByRole('button', { name: 'Comenzar simulacro' }).click(); await fits('examen');
  }
  pruebas.push('Iconos de 112–128 px en ambas galerías. Sin desbordamientos horizontales en 320, 390 y 768 px: inicio, ruta, secciones con nombres largos, selectores, cuestionario, diálogo, inteligente y examen.');
  await reset();
  await page.reload();
  await page.getByRole('heading', { name: 'Más cerca de tu nacionalidad.' }).waitFor();
  assert.match(await page.locator('.practice-overview').innerText(), /0 de 300/);
  assert.match(await page.locator('.practice-route-footer').innerText(), /0 \/ 20/);
  // Adelantar el reloj comprueba expiración y suspensión sin esperar 35 minutos.
  await page.clock.install({ time: new Date() });
  await page.getByRole('button', { name: /Simulacro de examen/ }).click();
  await page.getByRole('button', { name: 'Comenzar simulacro' }).click();
  await page.clock.fastForward(30 * 60_000 + 1000);
  assert.match(await page.locator('.practice-result').innerText(), /Han terminado los 30 minutos/);
  assert.match(await page.locator('.practice-result-score').innerText(), /0.*25/);
  await reset();
  await page.getByRole('button', { name: /Repaso inteligente/ }).click();
  await page.getByRole('button', { name: 'Empezar mis 5 minutos' }).click();
  await page.clock.fastForward(5 * 60_000 + 1000);
  assert.match(await page.locator('.practice-result').innerText(), /Han terminado los 5 minutos/);
  assert.match(await page.locator('.practice-result').innerText(), /no ha añadido respuestas/);
  pruebas.push('Reiniciar borra el progreso guardado. Examen y repaso terminan automáticamente a los 30 y 5 minutos, incluido el salto de reloj.');
  assert.deepEqual(errors, []);
  await writeFile(`${out}VERIFICACION.json`, JSON.stringify({ fecha: new Date().toISOString(), resultado: 'correcto', navegador: 'Chrome headless con perfil temporal', base, pruebas, erroresJavascript: errors, limites: 'Prueba local. No se ha publicado. Cuestionarios en primera versión funcional.' }, null, 2) + '\n');
  console.log(pruebas.join('\n'));
} catch (error) {
  console.error('Errores del navegador:', errors);
  if (page) console.error('URL:', page.url(), 'HTML:', (await page.content()).slice(0, 5000));
  throw error;
} finally { await browser.close(); }
