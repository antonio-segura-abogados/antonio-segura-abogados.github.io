// Reglas de producto, casos de usuario y recorridos del modelo, independientes del navegador.
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { scenarios, baseline } from './casos.mjs';
const temp = await mkdtemp(join(tmpdir(), 'asa-arbol-'));
const output = join(temp, 'cuestionario.mjs');
await build({ entryPoints: ['vertical/src/features/entrada/cuestionario.ts'], outfile: output, bundle: true, platform: 'node', format: 'esm' });
const { getQuestions, isAnswered, updateAnswer, toggleMultiple, answerError, goals } = await import(pathToFileURL(output));
const today = '2026-09-18';
const reports = [];
for (const s of scenarios) {
  let answers = {}, visited = [];
  for (let i = 0; i < 50; i++) {
    const questions = getQuestions(s.goal, answers);
    const q = questions[visited.length];
    if (!q) break;
    const value = s.answers[q.id] ?? 'unknown';
    assert.ok(isAnswered(q, value, today, answers), `${s.name}: respuesta inválida ${q.id}=${value}`);
    visited.push(q.id);
    answers = updateAnswer(s.goal, answers, q.id, value);
    assert.deepEqual(getQuestions(s.goal, answers).slice(0, visited.length).map(q => q.id), visited, `${s.name}: una respuesta introduce preguntas antes de la actual`);
  }
  assert.ok(visited.length < 50, s.name);
  assert.equal(new Set(visited).size, visited.length, `${s.name}: preguntas repetidas`);
  for (const id of s.required) assert.ok(visited.includes(id), `${s.name}: falta ${id}`);
  for (const id of s.excluded) assert.ok(!visited.includes(id), `${s.name}: improcedente ${id}`);
  if (visited.includes('entry')) assert.ok(visited.indexOf('notice') < visited.indexOf('entry'));
  const questions = getQuestions(s.goal, answers);
  assert.ok(questions.every(q => isAnswered(q, answers[q.id], today, answers)), `${s.name}: resumen incompleto`);
  reports.push({ caso: s.name, objetivo: s.goal, preguntas: visited, numero: visited.length });
}
// Ediciones: preservar datos útiles, retirar opciones/rutas incompatibles, no resucitar ramas.
let changed = updateAnswer('nacionalidad', baseline, 'location', 'abroad');
assert.equal(changed.nationality, '343'); assert.equal(changed.status, 'residence'); assert.equal(changed.place, undefined); assert.equal(changed.entry, undefined);
changed = updateAnswer('nacionalidad', baseline, 'nationality', '115');
assert.equal(changed.permitType, undefined); assert.equal(changed.legalStart, undefined); assert.equal(changed.age, 'adult');
changed = updateAnswer('residencia', baseline, 'status', 'visitor');
assert.equal(changed.permitType, undefined); assert.equal(changed.renewal, undefined); assert.equal(changed.residenceNeed, undefined); assert.equal(changed.arrival, baseline.arrival);
assert.equal(updateAnswer('residencia', changed, 'status', 'residence').permitType, undefined);
assert.equal(toggleMultiple('spouse,parent', 'none'), 'none'); assert.equal(toggleMultiple('unknown', 'spouse'), 'spouse');
assert.equal(toggleMultiple('spouse,parent', 'parent'), 'spouse');
const ties = getQuestions('nacionalidad', baseline).find(q => q.id === 'nationalityContext');
assert.equal(isAnswered(ties, 'unknown,spouse', today), false);
assert.equal(isAnswered(ties, 'none,spouse', today), false);
const marriage = getQuestions('nacionalidad', { ...baseline, nationalityContext: 'spouse' }).find(q => q.id === 'marriageDate');
assert.ok(answerError(marriage, '2027-01-01', today)); assert.ok(answerError(marriage, '2025-02-30', today));
const stay = getQuestions('residencia', { ...baseline, status: 'visitor' }).find(q => q.id === 'stayEnd');
assert.ok(answerError(stay, '2026-08-01', today, { status: 'visitor' }));
assert.ok(answerError(stay, '2026-10-01', today, { status: 'visitor', arrival: '2026-11-01' }));
const nat = getQuestions('nacionalidad', baseline).find(q => q.id === 'nationality');
assert.equal(isAnswered(nat, '108', today), false); assert.equal(isAnswered(nat, '343,343', today), false); assert.equal(isAnswered(nat, 'stateless,343', today), false);
// Cruce de objetivos, ubicaciones, edades, ciudadanías, situaciones y protección.
let combinations = 0;
for (const goal of goals.map(g => g.id)) for (const location of ['spain', 'abroad', 'unknown']) for (const age of ['adult', 'minor', 'unknown']) for (const nationality of ['343', '115', '132', '108', 'unknown', 'stateless']) for (const status of ['visitor', 'visitExpired', 'residence', 'longterm', 'studies', 'expiredPermit', 'none', 'asylum', 'unknown']) for (const protection of ['no', 'pending', 'granted', 'unknown']) {
  const answers = { ...baseline, location, age, nationality, status, protection, euRegistration: 'no' };
  const qs = getQuestions(goal, answers), ids = qs.map(q => q.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(qs.every(q => q.title && q.help && q.summary));
  assert.ok(qs.filter(q => q.options).every(q => new Set(q.options.map(o => o.value)).size === q.options.length));
  if (nationality === 'unknown') for (const id of ['entry', 'status', 'euRegistration', 'legalStart']) assert.ok(!ids.includes(id));
  if (['115', '132', '108'].includes(nationality)) for (const id of ['entry', 'status', 'permitType', 'protection']) assert.ok(!ids.includes(id));
  if (location !== 'spain') assert.ok(!ids.includes('entry') && !ids.includes('evidence'));
  if (age !== 'adult') assert.ok(!ids.includes('activity') && !ids.includes('familyIncome'));
  if (goal === 'nacionalidad') assert.ok(!ids.includes('activity') && !ids.includes('family') && !qs.find(q => q.id === 'nationality').options.some(o => o.value === '108'));
  if (['pending', 'granted', 'unknown'].includes(protection)) assert.ok(!ids.includes('evidence'));
  if (status === 'longterm') assert.ok(!ids.includes('renewal') && !ids.includes('evidence'));
  combinations++;
}
const report = { fecha: today, resultado: 'correcto', casos: reports, combinaciones: combinations, validaciones: ['Orden causal de las preguntas durante cada recorrido', 'Ausencia de preguntas duplicadas y opciones repetidas', 'Edición conserva datos pertinentes y retira ramas/opciones incompatibles', 'Fechas imposibles, futuras y fin de estancia anterior a llegada', 'Nacionalidades duplicadas, apatridia incompatible y España según objetivo', 'No se asume que nacionalidad desconocida sea de un tercer país', 'No se equipara solicitud pendiente, visita vencida y tarjeta de larga duración vencida'], textosLibres: 'Solo aclaraciones de otras opciones, nacionalidades/países no incluidos, ausencias y familiares adicionales.' };
await writeFile('vertical/diseno/entrevista/AUDITORIA.json', JSON.stringify(report, null, 2) + '\n');
console.log(`${reports.length} casos y ${combinations} combinaciones: árbol coherente, ediciones y validaciones correctas.`);
