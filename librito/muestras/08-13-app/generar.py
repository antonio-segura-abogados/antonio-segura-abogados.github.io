#!/usr/bin/env python3
"""Seis páginas en orden, con capturas reales del móvil construido en HTML/CSS.

Texto editorial editable por variante. Usa las fuentes y primitivas existentes.
Conserva los originales 01–07 y las maquetaciones rechazadas de 12–13.
"""
from pathlib import Path
import hashlib
import importlib.util
import json
import tempfile

import pymupdf
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

HERE = Path(__file__).resolve().parent
BOOK = HERE.parents[1]
ROOT = BOOK.parent
spec = importlib.util.spec_from_file_location('negocio', HERE.parent / '04-05-negocio/generar.py')
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)
P, W, H = c.P, c.W, c.H
BLUE, DARK, WHITE, MUTED, PALE, LINE = c.BLUE, c.DARK, c.WHITE, c.MUTED, c.PALE, c.LINE
spec = importlib.util.spec_from_file_location('etiqueta_qr', ROOT / 'recursos-compartidos/qr/etiqueta.py')
qr_diseno = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qr_diseno)
ASSETS = ROOT / 'recursos-compartidos/assets/demo/08-13'
QR = json.loads((ROOT / 'recursos-compartidos/qr/generados/registro.json').read_text())
PRODUCT = json.loads((ROOT / 'recursos-compartidos/demo/entrada.json').read_text())
PAGES = [
    ('08-concepto-app', '01-producto'), ('09-entrevista', '01-conversacion'),
    ('10-opciones', '01-decision'), ('11-contratacion', '01-acompanamiento'),
    ('12-seguimiento', '04-movil'), ('13-paso-actual', '04-movil'),
]
PREVIOUS_BOOK = HERE.parent / '06-07-modelo/librito-01-07.pdf'


def phone(p, data, x, top, width):
    path = ASSETS / data['captura']
    with Image.open(path) as im:
        height = width * im.height / im.width
        assert im.width / width * 72 >= 450, 'Captura insuficiente para imprimir'
    assert top + height < 383, ('El teléfono invade el pie', top + height)
    p.c.drawImage(ImageReader(path), x, H - top - height, width, height, mask='auto')


def qr(p, data, x, top, tx, tw=180):
    url = QR[data['qr']]['destino']
    qr_diseno.demo(p, H, data, url, x, top, tx, tw, BLUE, LINE, MUTED)


def p8(p, d):
    p.text('LA PROPUESTA', 35, 43, 8.5, 'SemiBold', MUTED, 1)
    # Campo diagonal contenido por el margen: sigue la portada sin rellenar el interior.
    p.poly([(365, 100), (556, 72), (556, 375), (337, 375)], PALE)
    p.text('Tu app de', 32, 105, 43, 'ExtraBold', tracking=-1.4)
    p.slanted('extranjería.', 35, 164, 48, 3)
    end = p.para(d['intro'], 35, 202, 293, 11.4, 17, DARK)
    assert end < 266
    for i, item in enumerate(d['indice']):
        y = 273 + i * 31
        p.text(item['verbo'], 35, y, 13.1, 'ExtraBold', tracking=-.25)
        p.text(item['paginas'], 293, y, 9, 'SemiBold', BLUE)
        p.text(item['detalle'], 111, y, 9.2, ink=MUTED)
        if i < 3: p.line(35, y + 12, 322, y + 12, LINE, .5)
    phone(p, d, 378, 38, 161)
    c.footer(p, 8, d['puente'])


def p9(p, d):
    p.text('01 / ENTENDER', 43, 43, 8.5, 'SemiBold', MUTED, 1)
    p.text('Cada caso empieza', 40, 96, 28.5, 'ExtraBold', tracking=-.9)
    p.slanted('por escuchar.', 43, 146, 39, 3)
    end = p.para(d['intro'], 43, 184, 279, 11.4, 17, DARK)
    assert end <= 252
    p.line(43, 248, 68, 248, BLUE, 2)
    p.para(d['destacado'], 43, 267, 287, 15.8, 20, DARK, 'SemiBold')
    phone(p, d, 388, 41, 160)
    qr(p, d, 39, 308, 135, 190)
    c.footer(p, 9, d['puente'])


def p10(p, d):
    p.text('02 / ELEGIR', 35, 43, 8.5, 'SemiBold', MUTED, 1)
    phone(p, d, 38, 60, 150)
    p.text('Elegir con', 229, 99, 37, 'ExtraBold', tracking=-1)
    p.slanted('claridad.', 232, 153, 47, 3)
    end = p.para(d['intro'], 232, 184, 311, 11.4, 17, DARK)
    assert end <= 235
    for i, item in enumerate(d['criterios']):
        y = 234 + i * 23
        p.circle(236, y - 3, 2.5, BLUE)
        p.text(item['titulo'], 246, y, 10.7, 'SemiBold')
    qr(p, d, 232, 302, 328, 215)
    c.footer(p, 10, d['puente'])


def p11(p, d):
    p.text('02 / ELEGIR', 43, 43, 8.5, 'SemiBold', MUTED, 1)
    p.text('El valor, claro.', 40, 98, 36, 'ExtraBold', tracking=-1)
    p.slanted('La cuota, también.', 43, 146, 31.8, 3)
    end = p.para(d['intro'], 43, 183, 285, 11.4, 17, DARK)
    assert end <= 217
    for i, plan in enumerate(PRODUCT['planes']):
        x = 43 + i * 158
        p.text(plan['nombre'], x, 228, 10.6, 'SemiBold', MUTED)
        p.text(f"{plan['mensualCentimos'] // 100} €", x - 1, 259, 35, 'ExtraBold', DARK, -1)
        p.text('/ mes', x + 85, 258, 9.4, ink=MUTED)
        annual = f"o {plan['anualCentimos'] // 100} € / año"
        p.text(annual, x, 277, 9.1, ink=MUTED)
    p.para(d['nota'], 43, 291, 294, 7.6, 10.5)
    phone(p, d, 388, 41, 160)
    # QR arranca a 310; el texto corto ocupa la parte izquierda a su lado.
    qr(p, d, 39, 310, 135, 192)
    c.footer(p, 11, d['puente'])


def p12(p, d):
    p.text('03 / AVANZAR', 35, 43, 8.5, 'SemiBold', MUTED, 1)
    p.text('«¿Cómo va', 31, 107, 43, 'ExtraBold', tracking=-1.5)
    p.slanted('lo mío?»', 35, 169, 53, 3)
    end = p.para(d['intro'], 35, 204, 302, 11.4, 17, DARK)
    assert end <= 257
    for i, item in enumerate(d['estados']):
        x = 35 + i * 104
        p.circle(x + 3, 266, 3, BLUE if i == 0 else '#a6c3d3')
        if i < 2: p.line(x + 8, 266, x + 95, 266, LINE, 1)
        p.text(item['titulo'], x, 285, 9.8, 'SemiBold')
    phone(p, d, 385, 41, 160)
    qr(p, d, 31, 309, 127, 210)
    c.footer(p, 12, d['puente'])


def p13(p, d):
    p.text('03 / AVANZAR', 43, 43, 8.5, 'SemiBold', MUTED, 1)
    phone(p, d, 43, 61, 150)
    p.text('Saber qué falta.', 231, 99, 29.8, 'ExtraBold', tracking=-.9)
    p.slanted('Y cómo resolverlo.', 234, 143, 29.8, 3)
    end = p.para(d['intro'], 234, 180, 307, 11.2, 16, DARK)
    assert end <= 230
    for i, item in enumerate(d['instrucciones']):
        y = 234 + i * 23
        p.text(str(i + 1).zfill(2), 234, y, 9, 'SemiBold', BLUE)
        p.text(item['titulo'], 258, y, 10.7, 'SemiBold')
    qr(p, d, 234, 306, 330, 215)
    c.footer(p, 13, d['puente'])


def main():
    originals = [PREVIOUS_BOOK] + list((BOOK / 'slides').glob('0[1-7]-*/**/*.pdf'))
    before = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in originals}
    files = []
    with tempfile.TemporaryDirectory(prefix='asa-app-') as temp:
        c.base.fuentes(Path(temp))
        for num, (folder, variant), draw in zip(range(8, 14), PAGES, [p8, p9, p10, p11, p12, p13]):
            target = BOOK / 'slides' / folder / 'variantes' / variant
            data = json.loads((target / 'texto.json').read_text())
            path = target / 'pagina.pdf'
            cv = canvas.Canvas(str(path), pagesize=(W, H), pageCompression=1, invariant=1)
            cv.setTitle(f'Página {num:02d} / {data["titulo"]}')
            cv.setAuthor('Pol Surriel Muixench')
            cv.setSubject('Propuesta para AS / Demo y precios ficticios / Pendiente de revisión')
            cv.setTrimBox((0, 0, W, H))
            draw(P(cv), data)
            cv.showPage(); cv.save(); c.verify(path)
            with pymupdf.open(path) as doc:
                doc[0].get_pixmap(dpi=240, alpha=False).save(target / 'pagina.png')
            files.append(path)
    with pymupdf.open() as batch:
        for path in files:
            with pymupdf.open(path) as source: batch.insert_pdf(source)
        batch.set_metadata({'title': 'Tu app de extranjería / Páginas 08–13', 'author': 'Pol Surriel Muixench'})
        batch.save(HERE / 'app-08-13.pdf', deflate=True)
    with pymupdf.open() as spreads:
        for i in range(0, 6, 2):
            page = spreads.new_page(width=W * 2, height=H)
            for j in range(2):
                with pymupdf.open(files[i + j]) as source:
                    page.show_pdf_page(pymupdf.Rect(j * W, 0, (j + 1) * W, H), source, 0)
                    for link in source[0].get_links():
                        if link.get('uri'):
                            page.insert_link({'kind': pymupdf.LINK_URI, 'from': link['from'] + (j * W, 0, j * W, 0), 'uri': link['uri']})
            page.get_pixmap(dpi=170, alpha=False).save(HERE / f'pareja-{i + 8:02d}-{i + 9:02d}.png')
        spreads.set_metadata({'title': 'Tres parejas enfrentadas / 08–13', 'author': 'Pol Surriel Muixench'})
        spreads.save(HERE / 'parejas-08-13.pdf', deflate=True)
    with pymupdf.open(PREVIOUS_BOOK) as book:
        for path in files:
            with pymupdf.open(path) as source: book.insert_pdf(source)
        book.set_metadata({'title': 'Librito en orden / Páginas 01–13', 'author': 'Pol Surriel Muixench'})
        book.save(HERE / 'librito-01-13.pdf', deflate=True)
    assert all(hashlib.sha256(p.read_bytes()).hexdigest() == before[p] for p in originals)
    print('Seis páginas, tres parejas y acumulado 01–13. Tamaño, fuentes y límites verificados; originales 01–07 intactos.')


if __name__ == '__main__':
    main()
