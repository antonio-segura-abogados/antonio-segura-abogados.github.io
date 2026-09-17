#!/usr/bin/env python3
"""Secuencia completa, integridad de 01–13 y decodificación de todos los QR."""
from pathlib import Path
from collections import Counter
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
expected = {str(QR / 'generados' / item['png']): item['destino'] for item in registry.values()}
pdf_codes = []
with tempfile.TemporaryDirectory(prefix='asa-librito-qr-') as temp:
    with pymupdf.open(HERE / 'librito-completo-01-24.pdf') as book, pymupdf.open(HERE / 'cierre-14-24.pdf') as batch, pymupdf.open(HERE / 'parejas-14-23.pdf') as spreads, pymupdf.open(HERE.parent / '08-13-app/librito-01-13.pdf') as old:
        assert len(book) == 24 and len(batch) == 11 and len(spreads) == 5
        assert len(book) % 4 == 0
        for i, page in enumerate(book):
            assert abs(page.rect.width - W) < .01 and abs(page.rect.height - H) < .01
            reference = old[i] if i < 13 else batch[i - 13]
            assert page.get_pixmap().samples == reference.get_pixmap().samples, f'Página {i + 1} alterada al unir'
            for link in page.get_links():
                url = link.get('uri', '')
                rect = link['from']
                if ('github.io' in url or 'anthropic' in url) and abs(rect.width - rect.height) < 1 and rect.width > 50:
                    path = Path(temp) / f'pagina-{i + 1:02d}.png'
                    page.get_pixmap(dpi=300, clip=rect + (-1, -1, 1, 1), alpha=False).save(path)
                    expected[str(path)] = url
                    pdf_codes.append({'pagina': i + 1, 'destino': url, 'tamanoMm': round(rect.width * 25.4 / 72, 2)})
        assert len(pdf_codes) == 13, pdf_codes
        assert {item['destino'] for item in pdf_codes} == {item['destino'] for item in registry.values()}
        for i, spread in enumerate(spreads):
            assert abs(spread.rect.width - W * 2) < .01
            actual = Counter(l['uri'] for l in spread.get_links() if l.get('uri'))
            original = Counter(l['uri'] for j in [i*2,i*2+1] for l in batch[j].get_links() if l.get('uri'))
            assert actual == original, f'Enlaces perdidos en pareja {i}'
        assert any('campmanyabogados.com' in link.get('uri','') for link in book[5].get_links())
        assert any('cervantes.es' in link.get('uri','') for link in book[15].get_links())
        assert 'VIEWNEXT' in book[21].get_text() and '2019' in book[21].get_text()
        assert 'psurrielm@gmail.com' in book[22].get_text() and 'psurrielm@gmail.com' in book[23].get_text()
    result = subprocess.run(['swift', '-module-cache-path', '/private/tmp/asa-swift-cache', str(QR / 'decodificar.swift'), *expected], text=True, capture_output=True, check=True)
    decoded = [json.loads(line) for line in result.stdout.splitlines() if line.startswith('{')]
    assert len(decoded) == len(expected)
    for item in decoded: assert item['destinos'] == [expected[item['archivo']]], item
    report = {
        'fecha': '2026-09-17', 'resultado': 'correcto', 'paginasNuevas': 11, 'paginasTotales': 24,
        'parejasNuevas': ['14–15','16–17','18–19','20–21','22–23'], 'formatoMm': [210,148],
        'originales01a13': 'idénticos al render anterior', 'qrPngDecodificados': len(registry),
        'qrLeidosDesdePdf300ppp': len(pdf_codes), 'qrEnPapel': pdf_codes,
        'metodo': 'Apple Vision; contenido exacto comparado con el destino registrado y el enlace PDF',
        'fuentes': 'Plus Jakarta Sans incrustada; límites de texto comprobados por generar.py',
        'sha256': {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in [HERE/'cierre-14-24.pdf', HERE/'parejas-14-23.pdf', HERE/'librito-completo-01-24.pdf']},
        'pruebaFisica': 'pendiente', 'produccion': 'PDF A5 de revisión; sangrado de cubiertas e imposición por cerrar con imprenta'
    }
    (HERE / 'VERIFICACION-PDF.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    destinations = json.loads((QR / 'destinos.json').read_text())
    for item in destinations['routes']:
        item['qrDecoded'] = True
        item['decodedFromPageRaster'] = True
    for item in destinations['external']:
        item['qrDecoded'] = True
        item['decodedFromPageRaster'] = True
    (QR / 'destinos.json').write_text(json.dumps(destinations,ensure_ascii=False,indent=2)+'\n')
    old_report = json.loads((QR / 'VERIFICACION.json').read_text())
    old_report['resultados'] = [{'id':k,'destinoLeido':v['destino'],'coincideConRegistro':True} for k,v in registry.items()]
    old_report['libritoCompleto'] = report
    (QR / 'VERIFICACION.json').write_text(json.dumps(old_report,ensure_ascii=False,indent=2)+'\n')
    print('24 páginas; 01–13 intactas; 13 QR PNG y 13 QR del PDF decodificados; enlaces conservados.')
