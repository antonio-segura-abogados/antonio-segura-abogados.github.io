import assert from 'node:assert/strict';
import { scenarios } from './casos.mjs';

async function answer(page, value) {
  const block = page.locator('[data-question]');
  const id = await block.getAttribute('data-question');
  if (await block.locator(`input[name="${id}"]`).count()) {
    for (const item of value.split(',')) await block.locator(`input[value="${item}"]`).check();
  } else if (value === 'unknown') await block.getByRole('checkbox').check();
  else if (await block.getByRole('combobox').count()) {
    for (const code of value.split(',')) {
      await block.getByRole('combobox').click();
      await block.locator(`[role=option][id$="-${code}"]`).click();
    }
  } else await block.locator('input[type=date], textarea').fill(value);
}

export async function comprobarEntrevista(page, open, captures) {
  const reports = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1050 : 844 });
    for (const scenario of scenarios) {
      await open('/entrevista?tour=1');
      await page.locator(`input[name=goal][value=${scenario.goal}]`).check();
      await page.getByRole('button', { name: 'Comenzar mi entrevista' }).click();
      const visited = [];
      for (let count = 0; count < 50; count++) {
        if (await page.locator('.interview-summary').isVisible()) break;
        const id = await page.locator('[data-question]').getAttribute('data-question');
        visited.push(id);
        await answer(page, scenario.answers[id] ?? 'unknown');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        if (scenario.name === 'Entrada irregular sin autorización' && id === 'entry') await page.screenshot({ path: `${captures}/entrada-${width}.png`, fullPage: true });
        if (scenario.name === 'Nacionalidad con varios vínculos' && id === 'nationalityContext') await page.screenshot({ path: `${captures}/vinculos-${width}.png`, fullPage: true });
        const next = page.getByRole('button', { name: /^(Continuar|Ver mi resumen)$/ });
        assert.equal(await next.isEnabled(), true, `${scenario.name}: ${id} bloqueado`);
        await next.click();
      }
      assert.equal(await page.locator('.interview-summary').isVisible(), true, scenario.name);
      for (const id of scenario.required) assert.ok(visited.includes(id), `${scenario.name}: falta ${id}`);
      for (const id of scenario.excluded) assert.ok(!visited.includes(id), `${scenario.name}: improcedente ${id}`);
      assert.equal(await page.locator('.client-header').count(), 0);
      assert.equal(visited.includes('citizenship'), false);
      assert.equal(await page.getByRole('button', { name: 'Confirmar y enviar', exact: true }).isEnabled(), true);
      if (scenario.answers.location === 'spain') assert.match(await page.locator('.answer-summary').innerText(), /Barcelona/);
      // Volver sin cambiar no altera la rama ni exige repetirla.
      const originalSummary = await page.locator('.answer-summary').innerText();
      await page.getByRole('button', { name: 'Editar: Nacionalidades', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: 'Continuar', exact: true }).count(), 0);
      await page.getByRole('button', { name: 'Volver al resumen', exact: true }).click();
      assert.equal(await page.locator('.answer-summary').innerText(), originalSummary);
      if (scenario.name === 'Nacionalidad de residente temporal') await checkEditing(page, width, captures);
      reports.push({ caso: scenario.name, ancho: width, preguntas: visited });
      console.log(`${width}px: ${scenario.name}`);
    }
  }
  await comprobarSelectores(page, open, captures);
  await comprobarFechas(page, open);
  await page.setViewportSize({ width: 1440, height: 1050 });
  console.log(`Entrevista: ${scenarios.length} situaciones a dos anchos, edición, selectores, fechas y confirmación correctos.`);
  return reports;
}

async function checkEditing(page, width, captures) {
  const saved = await page.locator('.answer-summary').innerText();
  await page.getByRole('button', { name: 'Editar: Nacionalidades', exact: true }).click();
  await page.getByRole('button', { name: 'Quitar Colombia', exact: true }).click();
  await answer(page, '343');
  await page.getByRole('button', { name: 'Volver al resumen', exact: true }).click();
  assert.equal(await page.locator('.answer-summary').innerText(), saved, 'Quitar y reponer una nacionalidad no borra el resto');
  await page.getByRole('button', { name: 'Editar: Provincia', exact: true }).click();
  await page.getByRole('combobox').fill('malaga');
  await page.getByRole('combobox').press('Enter');
  await page.screenshot({ path: `${captures}/edicion-${width}.png`, fullPage: true });
  await page.getByRole('button', { name: 'Volver al resumen', exact: true }).click();
  assert.equal(await page.locator('.answer-summary').innerText(), saved.replace('Barcelona', 'Málaga'));
  await page.getByRole('button', { name: 'Editar: Ubicación actual', exact: true }).click();
  await page.getByRole('radio', { name: 'No, estoy en otro país', exact: true }).check();
  await page.getByRole('button', { name: 'Cancelar edición', exact: true }).click();
  assert.match(await page.locator('.answer-summary').innerText(), /Málaga/);
  await page.getByRole('button', { name: 'Editar: Nacionalidades', exact: true }).click();
  await answer(page, '115');
  await page.getByRole('button', { name: 'Volver al resumen', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Confirmar y enviar', exact: true }).isDisabled(), true);
  assert.doesNotMatch(await page.locator('.answer-summary').innerText(), /Autorización declarada|Vencimiento de la autorización|Situación en España/);
  await page.getByRole('button', { name: 'Responder: Registro de ciudadano de la Unión', exact: true }).click();
  await answer(page, 'no'); await page.getByRole('button', { name: 'Volver al resumen', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Editar: Inicio de residencia legal', exact: true }).count(), 0);
  await page.getByRole('button', { name: 'Responder: Inicio de vida en España', exact: true }).click();
  await answer(page, '2022-05-01'); await page.getByRole('button', { name: 'Volver al resumen', exact: true }).click();
  await page.getByRole('button', { name: 'Confirmar y enviar', exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${captures}/resumen-${width}.png`, fullPage: true });
  await page.getByRole('button', { name: 'Confirmar y enviar', exact: true }).click();
  assert.equal(await page.getByRole('heading', { name: 'Entrevista confirmada.' }).isVisible(), true);
  assert.match(await page.locator('.interview-sent').innerText(), /no envía ni guarda datos/);
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Comenzar mi entrevista' }).isVisible(), true);
  await page.reload(); assert.equal(await page.getByRole('button', { name: 'Comenzar mi entrevista' }).isVisible(), true);
}

async function comprobarSelectores(page, open, captures) {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1050 : 844 });
    await open('/entrevista');
    await page.getByRole('button', { name: 'Comenzar mi entrevista' }).click();
    await answer(page, 'spain'); await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    const combo = page.getByRole('combobox');
    const next = page.getByRole('button', { name: 'Continuar', exact: true });
    await combo.click(); assert.equal(await page.getByRole('option').count(), 52);
    await combo.fill('inexistente'); assert.equal(await page.getByRole('option').count(), 0); assert.equal(await next.isDisabled(), true);
    await combo.fill('malaga'); await combo.press('ArrowDown'); await combo.press('Enter');
    assert.equal(await combo.inputValue(), 'Málaga'); assert.equal(await page.locator('[data-question]').getAttribute('data-question'), 'place');
    await combo.fill('alava'); assert.equal(await next.isDisabled(), true);
    await page.getByRole('option', { name: 'Araba/Álava', exact: true }).click(); await next.click();
    await combo.fill('espa'); assert.equal(await page.getByRole('option', { name: 'España', exact: true }).count(), 0);
    await combo.fill('colombiana'); await combo.press('Enter');
    await combo.fill('ital'); await page.getByRole('option', { name: 'Italia', exact: true }).click();
    assert.match(await page.locator('.select-values').innerText(), /Colombia/); assert.match(await page.locator('.select-values').innerText(), /Italia/);
    await combo.fill('peru'); await page.screenshot({ path: `${captures}/selector-${width}.png`, fullPage: true });
    await combo.press('Escape'); assert.equal(await combo.getAttribute('aria-expanded'), 'false');
    await next.click(); await answer(page, 'adult'); await next.click(); await answer(page, 'no'); await next.click();
    assert.equal(await page.locator('[data-question]').getAttribute('data-question'), 'euRegistration');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.getByRole('button', { name: 'Reiniciar', exact: true }).click();
    await page.locator('input[name=goal][value=familia]').check();
    await page.getByRole('button', { name: 'Comenzar mi entrevista' }).click();
    await answer(page, 'abroad'); await next.click();
    await combo.fill('peru'); await page.getByRole('option', { name: 'Perú', exact: true }).click(); await next.click();
    await combo.fill('espa'); await page.getByRole('option', { name: 'España', exact: true }).click(); await next.click();
    await answer(page, 'adult'); await next.click(); await answer(page, 'no'); await next.click();
    assert.equal(await page.locator('[data-question]').getAttribute('data-question'), 'relative');
  }
}
async function comprobarFechas(page, open) {
  await open('/entrevista');
  await page.getByRole('button', { name: 'Comenzar mi entrevista' }).click();
  for (const value of ['spain', '08', '343', 'adult', 'no', 'visa']) {
    await answer(page, value); await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  }
  assert.equal(await page.locator('[data-question]').getAttribute('data-question'), 'arrival');
  await answer(page, '2040-01-01');
  assert.equal(await page.getByRole('button', { name: 'Continuar', exact: true }).isDisabled(), true);
  assert.match(await page.locator('#interview-error').innerText(), /futuro/);
  await answer(page, '2026-09-01'); await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await answer(page, 'visitor'); await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await answer(page, '2026-08-01');
  assert.equal(await page.getByRole('button', { name: 'Continuar', exact: true }).isDisabled(), true);
  assert.match(await page.locator('#interview-error').innerText(), /ya ha pasado/);
}
