"""Comprueba el banco CCSE contra el PDF aportado, usando pypdf.

Desde as-abogados/:
    .venv-librito/bin/python recursos-compartidos/ccse/verificar.py

La extracción inicial se hizo con PyMuPDF. Esta comprobación usa otro lector
para cotejar todos los enunciados, opciones, respuestas y páginas de referencia.
No modifica el JSON ni el PDF.
"""

import hashlib
import json
import re
from collections import Counter
from pathlib import Path

from pypdf import PdfReader


DIRECTORY = Path(__file__).resolve().parent
ROOT = DIRECTORY.parents[1]
EXPECTED_COUNTS = {1: 120, 2: 36, 3: 24, 4: 36, 5: 84}
EXPECTED_IDS = {
    str(task * 1000 + n)
    for task, count in EXPECTED_COUNTS.items()
    for n in range(1, count + 1)
}
QUESTION_PAGES = {1: (22, 30), 2: (37, 39), 3: (47, 48), 4: (70, 72), 5: (96, 102)}
SOLUTION_PAGES = {1: 103, 2: 104, 3: 104, 4: 104, 5: 105}


def check(condition, message):
    if not condition:
        raise ValueError(message)


def no_duplicate_keys(pairs):
    result = {}
    for key, value in pairs:
        check(key not in result, f'Clave JSON repetida: {key}')
        result[key] = value
    return result


def compact(text):
    # pypdf puede introducir espacios dentro de palabras o antes de puntos.
    # Se cotejan todos los caracteres salvo espacios de maquetación.
    return re.sub(r'\s+', '', text)


def verify():
    data = json.loads((DIRECTORY / 'preguntas-2026.json').read_text(encoding='utf-8'),
                      object_pairs_hook=no_duplicate_keys)
    check(data['edicion'] == 2026, 'Edición incorrecta')
    source = ROOT / data['fuente']['archivo']
    check(hashlib.sha256(source.read_bytes()).hexdigest() == data['fuente']['sha256'],
          'El PDF no coincide con la fuente registrada en el JSON')
    reader = PdfReader(source)
    check(len(reader.pages) == data['fuente']['totalPaginasPdf'] == 109,
          'Número de páginas del PDF incorrecto')
    check(data['fuente']['desfasePaginaPdfRespectoManual'] == 4,
          'Desfase de páginas incorrecto')

    questions = []
    themes = data['tematicas']
    check(len({t['id'] for t in themes}) == len(themes), 'Temáticas repetidas')
    for theme in themes:
        label = theme['nombre']
        items = theme['preguntas']
        check(bool(items) and len(items) == theme['totalPreguntas'], f'Recuento incorrecto: {label}')
        subs = theme['subcategorias']
        sub_ids = {s['id'] for s in subs}
        check(len(sub_ids) == len(subs), f'Subcategorías repetidas: {label}')
        counts = Counter(q['subcategoriaId'] for q in items)
        for sub in subs:
            check(counts[sub['id']] == sub['totalPreguntas'] > 0,
                  f'Recuento incorrecto en subcategoría {sub["id"]}')
        for q in items:
            check(q['subcategoriaId'] in sub_ids if subs else q['subcategoriaId'] is None,
                  f'Subcategoría inválida en {q["id"]}')
        questions.extend(items)

    check(len(questions) == 300, 'El banco debe contener 300 preguntas')
    check({q['id'] for q in questions} == EXPECTED_IDS,
          'Faltan códigos oficiales o hay códigos duplicados o ajenos al banco')
    check(Counter(q['tareaOficial'] for q in questions) == EXPECTED_COUNTS,
          'Reparto por tareas incorrecto')
    by_id = {q['id']: q for q in questions}
    for q in questions:
        code = q['id']
        task = int(code[0])
        check(q['tareaOficial'] == task, f'Tarea incorrecta: {code}')
        check(q['tipo'] == ('verdadero_falso' if task == 2 else 'opcion_multiple'),
              f'Tipo de pregunta incorrecto: {code}')
        check([o['id'] for o in q['opciones']] == list('ab' if task == 2 else 'abc'),
              f'Número u orden de opciones incorrecto: {code}')
        check(q['enunciado'].strip() and all(o['texto'].strip() for o in q['opciones']),
              f'Contenido vacío: {code}')
        options = {o['id']: o['texto'] for o in q['opciones']}
        check(q['respuestaCorrecta'] in options, f'Respuesta inexistente: {code}')
        check(options[q['respuestaCorrecta']] == q['respuesta'], f'Texto de respuesta incorrecto: {code}')
        if task == 2:
            check([o['texto'].rstrip('.') for o in q['opciones']] == ['Verdadero', 'Falso'],
                  f'Opciones de verdadero/falso incorrectas: {code}')
        for ref in q['referencia'].values():
            check(ref['paginaPdf'] == ref['paginaManual'] + 4,
                  f'Numeración de página incorrecta: {code}')
        check(q['referencia']['solucion']['paginaPdf'] == SOLUTION_PAGES[task],
              f'Página de solución incorrecta: {code}')

    coverage = data['cobertura']
    check(coverage['totalPreguntasOficiales'] == coverage['totalPreguntasIncluidas'] == len(questions),
          'Cobertura total incorrecta')
    check(coverage['totalTematicas'] == len(themes), 'Total de temáticas incorrecto')
    check(coverage['totalSubcategorias'] == sum(len(t['subcategorias']) for t in themes),
          'Total de subcategorías incorrecto')
    check(coverage['porTipo'] == dict(Counter(q['tipo'] for q in questions)),
          'Recuento por tipo incorrecto')
    tasks = data['tareasOficiales']
    check(len(tasks) == 5 and {t['id'] for t in tasks} == set(EXPECTED_COUNTS),
          'Catálogo de tareas incompleto')
    for task in tasks:
        number = task['id']
        check(task['totalPreguntas'] == EXPECTED_COUNTS[number], 'Recuento de tarea incorrecto')
        check(task['primerCodigo'] == str(number * 1000 + 1)
              and task['ultimoCodigo'] == str(number * 1000 + EXPECTED_COUNTS[number]),
              'Rango de códigos incorrecto')
        check(task['paginasPreguntas']['pdf'] == list(QUESTION_PAGES[number]),
              'Rango de páginas de preguntas incorrecto')
        check(task['paginasSoluciones']['pdf'] == [SOLUTION_PAGES[number]] * 2,
              'Rango de páginas de soluciones incorrecto')
        for key in ['paginasPreguntas', 'paginasSoluciones']:
            check(task[key]['manual'] == [p - 4 for p in task[key]['pdf']],
                  'Rango de páginas impresas incorrecto')

    # Cotejo con una extracción independiente de las páginas de preguntas.
    pattern = re.compile(r'(?m)^[ \t]*(' + '|'.join(sorted(EXPECTED_IDS))
                         + r')\s+(?=[¿¡A-Za-zÁÉÍÓÚÜÑáéíóúüñ])')
    extracted_ids = set()
    for start, end in QUESTION_PAGES.values():
        for page_number in range(start, end + 1):
            text = reader.pages[page_number - 1].extract_text()
            text = re.sub(r'(?m)^\s*(PREGUNTAS|SOLUCIONES)\s*$', '', text)
            matches = list(pattern.finditer(text))
            for i, match in enumerate(matches):
                code = match.group(1)
                check(code not in extracted_ids, f'Código repetido en extracción: {code}')
                extracted_ids.add(code)
                q = by_id[code]
                end_offset = matches[i + 1].start() if i + 1 < len(matches) else len(text)
                parts = re.split(r'(?m)^[ \t]*([abc])\.\s+', text[match.end():end_offset])
                check(parts[1::2] == [o['id'] for o in q['opciones']],
                      f'Letras distintas de las del PDF: {code}')
                source_texts = [parts[0]] + parts[2::2]
                stored_texts = [q['enunciado']] + [o['texto'] for o in q['opciones']]
                check([compact(t) for t in source_texts] == [compact(t) for t in stored_texts],
                      f'Enunciado u opciones distintos del PDF: {code}')
                check(q['referencia']['pregunta']['paginaPdf'] == page_number,
                      f'Página del enunciado incorrecta: {code}')
    check(extracted_ids == EXPECTED_IDS, 'Extracción de preguntas incompleta')

    solution_ids = set()
    for page_number in sorted(set(SOLUTION_PAGES.values())):
        text = reader.pages[page_number - 1].extract_text()
        for code, answer in re.findall(r'\b([1-5]\d{3})\s+([abc])\b', text):
            check(code not in solution_ids, f'Código repetido en solucionario: {code}')
            solution_ids.add(code)
            q = by_id[code]
            check(q['respuestaCorrecta'] == answer, f'Respuesta distinta del solucionario: {code}')
            check(q['referencia']['solucion']['paginaPdf'] == page_number,
                  f'Página del solucionario incorrecta: {code}')
    check(solution_ids == EXPECTED_IDS, 'Solucionario incompleto')
    print('Correcto: 300/300 preguntas, todas las opciones y 300/300 respuestas coinciden con el PDF.')
    print(f'{len(themes)} temáticas; {coverage["totalSubcategorias"]} subcategorías; '
          '264 preguntas de opción múltiple y 36 de verdadero/falso.')
    print('Cobertura de tareas, códigos únicos, referencias, recuentos y SHA-256 comprobados.')


if __name__ == '__main__':
    verify()
