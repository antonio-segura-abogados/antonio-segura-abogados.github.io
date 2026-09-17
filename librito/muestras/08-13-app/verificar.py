#!/usr/bin/env python3
"""Comprueba dimensiones, secuencia, enlaces y lectura de los QR finales."""
from pathlib import Path
import hashlib
import json
import subprocess
import tempfile
import pymupdf

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
QR = ROOT / 'recursos-compartidos/qr'
W, H = 210 * 72 / 25.4, 148 * 72 / 25.4
registry = json.loads((QR / 'generados/registro.json').read_text())
expected = {}
for name, entry in registry.items():
    expected[str(QR / 'generados' / entry['png'])] = entry['destino']

with tempfile.TemporaryDirectory(prefix='asa-qr-papel-') as temp:
    book = pymupdf.open(HERE / 'librito-01-13.pdf')
    batch = pymupdf.open(HERE / 'app-08-13.pdf')
    spread = pymupdf.open(HERE / 'parejas-08-13.pdf')
    previous = pymupdf.open(HERE.parent / '06-07-modelo/librito-01-07.pdf')
    assert len(book) == 13 and len(batch) == 6 and len(spread) == 3
    for i, page in enumerate(book):
        assert abs(page.rect.width - W) < .01 and abs(page.rect.height - H) < .01
        if i < 7:
            assert page.get_pixmap().samples == previous[i].get_pixmap().samples, f'Página {i+1} alterada'
        else:
            assert page.get_pixmap().samples == batch[i - 7].get_pixmap().samples
    for i in [8, 9, 10, 11, 12]:
        links = [l for l in book[i].get_links() if 'github.io' in l.get('uri', '')]
        assert len(links) == 1
        link = links[0]
        target = Path(temp) / f'pagina-{i + 1:02d}.png'
        book[i].get_pixmap(dpi=300, clip=link['from'] + (-1, -1, 1, 1), alpha=False).save(target)
        expected[str(target)] = link['uri']
    assert any('anthropic' in l.get('uri','') for l in book[2].get_links())
    assert any('campmanyabogados.com' in l.get('uri','') for l in book[5].get_links())
    assert len([l for page in spread for l in page.get_links()]) == 5
    cmd = ['swift', '-module-cache-path', '/private/tmp/asa-swift-cache', str(QR / 'decodificar.swift'), *expected]
    result = subprocess.run(cmd, text=True, capture_output=True, check=True)
    decoded = [json.loads(line) for line in result.stdout.splitlines() if line.startswith('{')]
    assert len(decoded) == len(expected)
    for item in decoded:
        assert item['destinos'] == [expected[item['archivo']]], item
    report = {
        'fecha': '2026-09-17', 'resultado': 'correcto', 'paginasNuevas': 6,
        'formatoMm': [210,148], 'originales01a07': 'idénticos al render anterior',
        'qrPngDecodificados': len(registry), 'qrLeidosDesdePdf300ppp': 5,
        'metodo': 'Apple Vision; destino exacto comparado con cada enlace PDF',
        'enlacesConservados': ['Anthropic (p. 3)', 'Campmany (p. 6)', 'cinco escenas de demo (p. 9–13)'],
        'sha256': {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in [HERE/'app-08-13.pdf', HERE/'parejas-08-13.pdf', HERE/'librito-01-13.pdf']},
        'pruebaFisica': 'pendiente'
    }
    (HERE / 'VERIFICACION-PDF.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    destinations = json.loads((QR / 'destinos.json').read_text())
    for item in destinations['routes']:
        if item['id'] in registry: item['qrDecoded'] = True
        if item['id'] in ['entrevista','opciones','planes','expediente','paso-documentacion']:
            item['decodedFromPageRaster'] = True
    (QR / 'destinos.json').write_text(json.dumps(destinations,ensure_ascii=False,indent=2)+'\n')
    old = json.loads((QR / 'VERIFICACION.json').read_text())
    old['resultados'] = [{'id':k,'destinoLeido':v['destino'],'coincideConRegistro':True} for k,v in registry.items()]
    old['paginas09a13'] = report
    (QR / 'VERIFICACION.json').write_text(json.dumps(old,ensure_ascii=False,indent=2)+'\n')
    print('13 páginas en orden; 01–07 intactas; 9 QR de archivo y 5 QR del PDF decodificados; enlaces conservados.')
