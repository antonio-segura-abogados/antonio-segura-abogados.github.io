import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const compiled = await build({ entryPoints: [fileURLToPath(new URL('../src/features/practica/modelo.ts', import.meta.url))], bundle: true, platform: 'node', format: 'esm', write: false });
const m = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);
const rng = seed => () => ((seed = Math.imul(1664525, seed) + 1013904223 >>> 0) / 2 ** 32);
const now = 1_800_000_000_000;
const dia = 86_400_000;

test('La ruta recorre las 300 preguntas una vez por temas y otra en los repasos finales', () => {
  const temas = [], repasos = [];
  for (const t of m.tematicas) {
    const lecciones = m.leccionesDe(t);
    assert.equal(lecciones.length, Math.max(1, t.subcategorias.length) + 1);
    assert.equal(lecciones.at(-1).final, true);
    assert.equal(lecciones.at(-1).preguntas.length, t.totalPreguntas);
    for (const l of lecciones) {
      assert.ok(l.preguntas.length > 0);
      (l.final ? repasos : temas).push(...l.preguntas.map(p => p.id));
    }
  }
  assert.equal(temas.length, 300);
  assert.equal(new Set(temas).size, 300);
  assert.deepEqual([...temas].sort(), [...repasos].sort());
});

test('Cada simulacro tiene 25 preguntas sin repetición y reparto 10/3/2/3/7', () => {
  const alcanzadas = new Set();
  for (let seed = 1; seed <= 300; seed++) {
    const examen = m.crearSimulacro(rng(seed));
    assert.equal(examen.length, 25);
    assert.equal(new Set(examen.map(p => p.id)).size, 25);
    assert.deepEqual([1, 2, 3, 4, 5].map(t => examen.filter(p => p.tareaOficial === t).length), [10, 3, 2, 3, 7]);
    examen.forEach(p => alcanzadas.add(p.id));
  }
  assert.equal(alcanzadas.size, 300, 'Todo el banco puede aparecer en el simulacro');
});

test('El barajado no altera el banco y cambia el orden de un repaso', () => {
  const before = m.tematicas[0].preguntas.map(p => p.id);
  const after = m.barajar(m.tematicas[0].preguntas, rng(20)).map(p => p.id);
  assert.notDeepEqual(after, before);
  assert.deepEqual([...after].sort(), [...before].sort());
  assert.deepEqual(m.tematicas[0].preguntas.map(p => p.id), before);
});

test('Sin historial, el repaso ofrece 10 preguntas distintas del temario completo', () => {
  const repaso = m.crearRepaso(m.progresoVacio(), now, rng(7));
  assert.equal(repaso.length, 10);
  assert.equal(new Set(repaso.map(p => p.id)).size, 10);
  assert.ok(new Set(repaso.map(p => p.tareaOficial)).size > 1);
});

test('Prioriza errores, luego repasos vencidos, preguntas nuevas y preguntas consolidadas', () => {
  const [fallada, vencida, reciente] = m.preguntas;
  let p = m.registrar(m.progresoVacio(), [{ pregunta: fallada, elegida: 'incorrecta' }], now - dia);
  p = m.registrar(p, [{ pregunta: vencida, elegida: vencida.respuestaCorrecta }], now - 2 * dia);
  p = m.registrar(p, [{ pregunta: reciente, elegida: reciente.respuestaCorrecta }], now);
  const repaso = m.crearRepaso(p, now, rng(44));
  assert.equal(repaso[0].id, fallada.id);
  assert.equal(repaso[1].id, vencida.id);
  assert.ok(!repaso.some(q => q.id === reciente.id));
});

test('Los aciertos espacian repasos y un error vuelve a poner la pregunta pendiente', () => {
  const pregunta = m.preguntas[0];
  let p = m.progresoVacio();
  for (const dias of [1, 3, 7, 14, 30, 30]) {
    const previo = p;
    p = m.registrar(p, [{ pregunta, elegida: pregunta.respuestaCorrecta }], now);
    assert.equal(p.preguntas[pregunta.id].proximoRepaso, now + dias * dia);
    assert.notEqual(p.preguntas, previo.preguntas);
  }
  p = m.registrar(p, [{ pregunta, elegida: null }], now);
  assert.equal(p.preguntas[pregunta.id].racha, 0);
  assert.equal(p.preguntas[pregunta.id].aciertos, 6);
  assert.equal(p.preguntas[pregunta.id].intentos, 7);
  assert.equal(p.preguntas[pregunta.id].proximoRepaso, now);
});

test('Recupera progreso válido y tolera almacenamiento corrupto o de otra edición', () => {
  for (const value of [null, '{', 'null', '{}', '{"preguntas":null,"lecciones":[]}', '{"preguntas":{},"lecciones":null}']) assert.deepEqual(m.leerProgreso(value), m.progresoVacio());
  const pregunta = m.preguntas[0];
  const p = m.registrar(m.progresoVacio(), [{ pregunta, elegida: pregunta.respuestaCorrecta }], now);
  p.lecciones = [m.leccionesDe(m.tematicas[0])[0].id];
  assert.deepEqual(m.leerProgreso(JSON.stringify(p)), p);
  p.lecciones.push('no-existe', p.lecciones[0]);
  p.preguntas['desconocida'] = p.preguntas[pregunta.id];
  p.preguntas[m.preguntas[1].id] = { ...p.preguntas[pregunta.id], intentos: -1 };
  const saneado = m.leerProgreso(JSON.stringify(p));
  assert.equal(saneado.lecciones.length, 1);
  assert.equal(Object.keys(saneado.preguntas).length, 1);
});

test('El tiempo usa la hora límite y no se alarga al suspender la pestaña', () => {
  assert.equal(m.segundosRestantes(now + 300_000, now), 300);
  assert.equal(m.segundosRestantes(now + 300_000, now + 299_500), 1);
  assert.equal(m.segundosRestantes(now + 300_000, now + 350_000), 0);
  assert.equal(m.tiempo(1800), '30:00');
  assert.equal(m.tiempo(5), '0:05');
});
