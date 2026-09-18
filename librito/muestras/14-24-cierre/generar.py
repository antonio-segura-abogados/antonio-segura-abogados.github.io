#!/usr/bin/env python3
"""Páginas 14–24: acompañamiento, operación y candidatura. Conserva 01–13."""
from pathlib import Path
import hashlib
import importlib.util
import json
import math
import tempfile

import pymupdf
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader

HERE = Path(__file__).resolve().parent
BOOK = HERE.parents[1]
ROOT = BOOK.parent
spec = importlib.util.spec_from_file_location('app', HERE.parent / '08-13-app/generar.py')
a = importlib.util.module_from_spec(spec)
spec.loader.exec_module(a)
c = a.c
P, W, H = a.P, a.W, a.H
BLUE, DARK, WHITE, MUTED, PALE, LINE = a.BLUE, a.DARK, a.WHITE, a.MUTED, a.PALE, a.LINE
ASSETS = ROOT / 'recursos-compartidos/assets/demo/14-19'
QR = json.loads((ROOT / 'recursos-compartidos/qr/generados/registro.json').read_text())
PREVIOUS = HERE.parent / '08-13-app/librito-01-13.pdf'
PAGES = [
    ('14-documentos', '01-carpeta'), ('15-originales', '01-logistica'),
    ('16-practica', '01-habito'), ('17-consultas', '01-conversacion'),
    ('18-configurador', '01-rutas'), ('19-cambios-y-excepciones', '01-alcance'),
    ('20-beneficios', '01-alcance'), ('21-puesta-en-marcha', '01-direccion'),
    ('22-curriculum', '01-experiencias'), ('23-conversacion', '01-equipo'),
    ('24-contraportada', '01-diagonal'),
]


def picture(p, path, x, top, width, min_ppi=300):
    with Image.open(path) as im:
        height = width * im.height / im.width
        assert im.width / width * 72 >= min_ppi, ('Resolución insuficiente', path)
    p.c.drawImage(ImageReader(path), x, H - top - height, width, height, mask='auto')
    return top + height


def phone(p, d, x, top, width=160):
    assert picture(p, ASSETS / d['captura'], x, top, width, 450) < 383


def code(p, key, x, top, size=28 * 72 / 25.4):
    url = QR[key]['destino']
    a.qr_diseno.codigo(p.c, H, url, x, top, size, LINE)


def qr(p, d, x, top, tx, tw=180):
    a.qr_diseno.demo(p, H, d, QR[d['qr']]['destino'], x, top, tx, tw, BLUE, LINE, MUTED)


def p14(p, d):
    p.text('03 / AVANZAR', 35, 43, 8.5, 'SemiBold', MUTED, 1)
    p.text('Cada documento,', 31, 98, 34, 'ExtraBold', tracking=-1)
    p.slanted('en su sitio.', 35, 154, 45, 3)
    end = p.para(d['intro'], 35, 190, 287, 11.3, 17, DARK)
    assert end <= 248
    for i, line in enumerate(d['claves']):
        p.text(str(i + 1).zfill(2), 35, 253 + i * 22, 9, 'SemiBold', BLUE)
        p.text(line, 59, 253 + i * 22, 10.8, 'SemiBold')
    phone(p, d, 385, 41)
    qr(p, d, 31, 309, 127, 206)
    c.footer(p, 14, d['puente'])


def p15(p, d):
    p.text('03 / AVANZAR', 43, 43, 8.5, 'SemiBold', MUTED, 1)
    phone(p, d, 43, 61, 150)
    p.text('También hay un camino', 233, 95, 24.7, 'ExtraBold', tracking=-.7)
    p.slanted('para el papel.', 236, 148, 38, 3)
    end = p.para(d['intro'], 236, 182, 307, 11.2, 16, DARK)
    assert end <= 246
    for i, label in enumerate(d['pasos']):
        x = 236 + i * 78
        p.circle(x + 3, 253, 3, BLUE)
        if i < 3: p.line(x + 9, 253, x + 71, 253, LINE, 1)
        p.text(label, x, 272, 8.8, 'SemiBold')
    p.para(d['nota'], 236, 289, 305, 7.4, 10)
    qr(p, d, 236, 311, 332, 211)
    c.footer(p, 15, d['puente'])


def p16(p, d):
    p.text('04 / ACOMPAÑAR', 35, 43, 8.5, 'SemiBold', MUTED, 1)
    p.text('Un poco', 31, 103, 49, 'ExtraBold', tracking=-1.6)
    p.slanted('cada día.', 35, 164, 55, 3)
    end = p.para(d['intro'], 35, 201, 285, 11.3, 17, DARK)
    assert end <= 252
    for i, label in enumerate(d['claves']):
        x = [35, 119, 204][i]
        p.text(label, x, 266, 9.1, 'SemiBold')
        if i < 2: p.arrowhead(x + 72, 262, BLUE, 2.6)
    p.para(d['nota'], 35, 287, 301, 7.6, 10)
    p.c.linkURL('https://examenes.cervantes.es/sites/default/files/manual-ccse-2026-def.pdf', (35, H - 303, 336, H - 278), relative=0)
    phone(p, d, 385, 41)
    qr(p, d, 31, 311, 127, 209)
    c.footer(p, 16, d['puente'])


def p17(p, d):
    p.text('04 / ACOMPAÑAR', 43, 43, 8.5, 'SemiBold', MUTED, 1)
    phone(p, d, 43, 61, 150)
    p.text('Una consulta,', 233, 97, 36, 'ExtraBold', tracking=-1)
    p.slanted('con todo el contexto.', 236, 144, 28.4, 3)
    end = p.para(d['intro'], 236, 181, 307, 11.2, 16, DARK)
    assert end <= 246
    for i, label in enumerate(d['claves']):
        p.circle(239, 241 + i * 22, 2.5, BLUE)
        p.text(label, 250, 244 + i * 22, 10.5, 'SemiBold')
    qr(p, d, 236, 309, 332, 211)
    c.footer(p, 17, d['puente'])


def management(p, d, number, title1, title2, size):
    x = 35 if number % 2 == 0 else 43
    p.text('05 / DIRIGIR LA OPERACIÓN', x, 43, 8.5, 'SemiBold', MUTED, .7)
    p.text(title1, x - 3, 84, 33, 'ExtraBold', tracking=-.9)
    p.slanted(title2, x, 129, size, 2.6)
    # El CRM completo incluye navegación y cabecera. La captura de escritorio
    # necesita más altura que el antiguo recorte del tablero: texto y QR pasan
    # a la columna derecha, conservando titulares y contenido editorial.
    image_width = 368
    image_top = 142
    bottom = picture(p, ASSETS / d['captura'], x, image_top, image_width, 350)
    assert bottom < 383, (number, bottom)
    tx = x + image_width + 20
    end = p.para(d['intro'], tx, 158, 555 - tx, 10.2, 14.5, DARK)
    assert end <= 274, (number, end)
    qr_size = 27 * 72 / 25.4
    qr_x = tx + (555 - tx - qr_size) / 2
    code(p, d['qr'], qr_x, 282, qr_size)
    badge_width, _ = a.qr_diseno.medidas('Demo interactiva', 7.7)
    a.qr_diseno.etiqueta(p.c, H, 'Demo interactiva',
                        qr_x + qr_size / 2 - badge_width / 2, 365,
                        BLUE, QR[d['qr']]['destino'], 'arriba', 7.7)
    c.footer(p, number, d['nota'])


def p18(p, d): management(p, d, 18, 'Vuestro criterio.', 'Reglas configurables.', 32.2)
def p19(p, d): management(p, d, 19, 'Actualizar la ruta.', 'Decidir a quién afecta.', 31.7)


def geographic_map(p):
    geometry = json.loads((ROOT / 'recursos-compartidos/assets/mapas/espana-natural-earth.geojson').read_text())['geometry']
    cos = math.cos(math.radians(40))
    def project(lon, lat): return 54 + (lon + 9.7) * 18.5 * cos, 211 + (44.2 - lat) * 18.5
    for polygon in geometry['coordinates']:
        for n, ring in enumerate(polygon):
            if max(v[0] for v in ring) < -10: continue
            p.poly([project(*v) for v in ring], '#d9ecf7' if n == 0 else WHITE)
    barcelona = project(2.17, 41.39)
    # Ajuste óptico hacia el noreste sobre la costa simplificada del mapa.
    origin = (barcelona[0] + 4, barcelona[1] - 4)
    p.c.saveState()
    p.c.setStrokeColor(HexColor(BLUE))
    p.c.setLineWidth(.9)
    p.c.setLineCap(1)
    # El arco corto del norte es más bajo para separarlo de la ruta a Galicia.
    for lon, lat, curvature in [(-8.55, 42.88, .35), (-2.94, 43.26, .18),
                                (-3.70, 40.42, .35), (-.38, 39.47, .35),
                                (-5.98, 37.39, .35)]:
        dest = project(lon, lat)
        dx, dy = dest[0] - origin[0], dest[1] - origin[1]
        # Arco parabólico: control perpendicular al trayecto, hacia arriba.
        control = ((origin[0] + dest[0]) / 2 - curvature * dy,
                   (origin[1] + dest[1]) / 2 + curvature * dx)
        # Conversión exacta de la curva cuadrática al Bézier cúbico del PDF.
        c1 = tuple(start + 2 / 3 * (middle - start) for start, middle in zip(origin, control))
        c2 = tuple(end + 2 / 3 * (middle - end) for end, middle in zip(dest, control))
        p.c.bezier(origin[0], H - origin[1], c1[0], H - c1[1],
                   c2[0], H - c2[1], dest[0], H - dest[1])
        tangent = (dest[0] - control[0], dest[1] - control[1])
        length = math.hypot(*tangent)
        ux, uy = tangent[0] / length, tangent[1] / length
        p.poly([dest, (dest[0] - 6 * ux + 2.3 * uy, dest[1] - 6 * uy - 2.3 * ux), (dest[0] - 6 * ux - 2.3 * uy, dest[1] - 6 * uy + 2.3 * ux)], BLUE)
    p.c.restoreState()
    p.circle(*origin, 5, DARK)
    p.text('Desde Cataluña', origin[0] - 10, origin[1] - 12, 9, 'SemiBold')
    p.rect(226, 340, 93, 30, WHITE, LINE, 3)
    for polygon in geometry['coordinates']:
        for n, ring in enumerate(polygon):
            if max(v[0] for v in ring) >= -10: continue
            p.poly([(233 + (lon + 18.2) * 16, 345 + (29.5 - lat) * 11) for lon, lat in ring], '#d9ecf7' if n == 0 else WHITE)
    p.text('Canarias · recuadro', 227, 382, 7.5, ink=MUTED)
    p.text('Alcance potencial · flechas ilustrativas', 35, 194, 8, 'SemiBold', MUTED)


def p20(p, d):
    p.text('LO QUE CAMBIA PARA EL DESPACHO', 35, 43, 8.5, 'SemiBold', MUTED, .8)
    p.text('Más alcance.', 31, 96, 45, 'ExtraBold', tracking=-1.4)
    p.slanted('Mejor operación.', 35, 154, 46, 3)
    geographic_map(p)
    for i, item in enumerate(d['beneficios']):
        y = 188 + i * 48
        p.text(item['titulo'], 335, y, 12.3, 'ExtraBold', tracking=-.2)
        end = p.para(item['texto'], 335, y + 17, 217, 9.1, 12, MUTED)
        assert end < y + 49
    c.footer(p, 20, d['nota'])


def p21(p, d):
    p.text('DE LA PROPUESTA A LA REALIDAD', 43, 43, 8.5, 'SemiBold', MUTED, .8)
    p.text('Yo lideraría', 40, 97, 43, 'ExtraBold', tracking=-1.2)
    p.slanted('la puesta en marcha.', 43, 154, 42, 3)
    end = p.para(d['intro'], 43, 190, 505, 11.2, 16, DARK)
    assert end <= 222
    for i, item in enumerate(d['fases']):
        x = 43 + i * 131
        p.text(str(i + 1).zfill(2), x, 246, 25, 'ExtraBold', BLUE, -.5)
        if i < 3:
            p.line(x + 43, 237, x + 115, 237, LINE, 1)
            p.arrowhead(x + 115, 237, BLUE, 2.5)
        p.text(item['titulo'], x, 271, 16, 'ExtraBold', tracking=-.3)
        end = p.para(item['texto'], x, 290, 110, 9.5, 13, MUTED)
        assert end <= 330
        p.text(item['decision'], x, 339, 7.6, 'SemiBold', BLUE)
    p.rect(43, 348, 508, 38, PALE)
    for i, item in enumerate(d['roles']):
        x = 53 + i * 252
        p.text(item['titulo'], x, 360, 8.4, 'SemiBold')
        p.para(item['texto'], x, 373, 231, 7.4, 10, MUTED)
    c.footer(p, 21, d['puente'])


def p22(p, d):
    p.text('LA PERSONA DETRÁS DE LA PROPUESTA', 35, 43, 8.5, 'SemiBold', MUTED, .8)
    p.text('Pol Surriel', 31, 95, 48, 'ExtraBold', tracking=-1.5)
    p.text(d['subtitulo'], 35, 122, 15, 'SemiBold', BLUE)
    view, surreal, teaching = d['experiencias']
    p.text(view['empresa'], 35, 159, 14, 'ExtraBold')
    p.text(view['fechas'], 35, 175, 8.2, ink=MUTED)
    for i, role in enumerate(view['cargos']):
        p.text(role['titulo'], 166, 150 + i * 32, 10.2, 'SemiBold')
        p.text(role['fechas'], 166, 164 + i * 32, 8.7, ink=MUTED)
    p.line(35, 210, 552, 210, LINE, .6)
    p.text(surreal['empresa'], 35, 234, 13.5, 'ExtraBold')
    p.text(surreal['fechas'], 35, 250, 7.8, ink=MUTED)
    p.text(surreal['cargo'], 166, 231, 9.8, 'SemiBold')
    end = p.para(surreal['detalle'], 166, 248, 382, 9.4, 13, MUTED)
    assert end <= 275
    p.line(35, 278, 552, 278, LINE, .6)
    p.text(teaching['empresa'], 35, 302, 14, 'ExtraBold')
    p.text(teaching['fechas'], 35, 318, 8.2, ink=MUTED)
    for i, text in enumerate(teaching['lineas']):
        p.text(text, 166, 297 + i * 14, 9.2, 'SemiBold' if i < 2 else 'Regular', DARK if i < 2 else MUTED)
    p.line(35, 339, 552, 339, LINE, .6)
    p.text('Formación', 35, 363, 12, 'ExtraBold')
    for i, text in enumerate(d['formacion']): p.text(text, 166, 359 + i * 16, 9.0, ink=MUTED)
    p.c.linkURL('https://www.linkedin.com/in/psurriel/', (35, H - 128, 552, H - 45), relative=0)
    c.footer(p, 22, d['puente'])


def p23(p, d):
    p.text('LA CONVERSACIÓN QUE ME GUSTARÍA ABRIR', 43, 43, 8.5, 'SemiBold', MUTED, .7)
    p.text('Me gustaría', 40, 94, 43, 'ExtraBold', tracking=-1.3)
    p.slanted('hacerlo con vosotros.', 43, 145, 39.2, 3)
    files = ROOT / 'tmp/fotos'
    # Foto original completa, en su posición inicial y sin retoques.
    photo_x = 43
    picture(p, files / d['fotos'][0]['archivo'], photo_x, 171, 191, 300)
    p.text(d['fotos'][0]['pie'], photo_x, 333, 8.5, 'SemiBold', MUTED)
    code(p, d['qr'], 270, 204)
    a.qr_diseno.etiqueta(p.c, H, d['qrTitulo'], 366, 205, BLUE,
                        QR[d['qr']]['destino'], 'izquierda')
    p.para(d['qrDetalle'], 366, 251, 183, 11, 16, DARK)
    p.para(d['cierre'], 43, 357, 505, 10.8, 15, DARK)
    p.text(d['email'], 43, 383, 11.4, 'SemiBold', BLUE)
    p.text('linkedin.com/in/psurriel', 361, 383, 9.5, ink=MUTED)
    p.c.linkURL('mailto:' + d['email'], (43, H - 386, 260, H - 369), relative=0)
    p.c.linkURL(d['linkedin'], (361, H - 386, 550, H - 369), relative=0)
    c.footer(p, 23, d['puente'])


def p24(p, d):
    p.rect(0, 0, W, H, BLUE)
    p.text('UNA CANDIDATURA DE POL SURRIEL', 43, 43, 8.5, 'SemiBold', WHITE, .9)
    p.text('¿Hablamos?', 37, 137, 66, 'ExtraBold', WHITE, -2.2)
    p.para(d['frase'], 43, 178, 410, 19, 25, WHITE, 'SemiBold')
    p.poly([(0, 275), (W, 218), (W, H), (0, H)], WHITE)
    p.text(d['firma'], 43, 306, 26, 'ExtraBold', DARK, -.6)
    p.text(d['email'], 43, 334, 13.7, 'SemiBold', BLUE)
    p.text(d['destinatario'], 43, 358, 9.2, ink=MUTED)
    code(p, d['qr'], 473, 285)
    a.qr_diseno.etiqueta(p.c, H, d['qrTitulo'], 330, 289, BLUE,
                        QR[d['qr']]['destino'], 'derecha', 8.5)
    p.para(d['qrDetalle'], 335, 339, 119, 9.2, 13, MUTED)
    p.text(d['urlVisible'], 43, 393, 9, 'SemiBold')
    p.c.linkURL('mailto:' + d['email'], (43, H - 339, 320, H - 315), relative=0)
    p.c.linkURL(QR['inicio']['destino'], (43, H - 397, 400, H - 380), relative=0)


def main():
    original_paths = [PREVIOUS] + list((BOOK / 'slides').glob('*/**/*.pdf'))
    original_paths = [p for p in original_paths if p == PREVIOUS or int(p.relative_to(BOOK / 'slides').parts[0][:2]) <= 13]
    hashes = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in original_paths}
    files = []
    with tempfile.TemporaryDirectory(prefix='asa-cierre-') as temp:
        c.base.fuentes(Path(temp))
        for num, (folder, variant), draw in zip(range(14, 25), PAGES, [p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24]):
            target = BOOK / 'slides' / folder / 'variantes' / variant
            d = json.loads((target / 'texto.json').read_text())
            path = target / 'pagina.pdf'
            cv = canvas.Canvas(str(path), pagesize=(W, H), pageCompression=1, invariant=1)
            cv.setTitle(f'Página {num:02d} / {d["titulo"]}')
            cv.setAuthor('Pol Surriel Muixench')
            cv.setSubject('Propuesta de candidatura a AS / Diseño pendiente de revisión')
            cv.setTrimBox((0, 0, W, H))
            draw(P(cv), d); cv.showPage(); cv.save(); c.verify(path)
            with pymupdf.open(path) as doc: doc[0].get_pixmap(dpi=240, alpha=False).save(target / 'pagina.png')
            files.append(path)
    with pymupdf.open() as batch:
        for path in files:
            with pymupdf.open(path) as source: batch.insert_pdf(source)
        batch.set_metadata({'title': 'Cierre de la propuesta / Páginas 14–24', 'author': 'Pol Surriel Muixench'})
        batch.save(HERE / 'cierre-14-24.pdf', deflate=True)
    with pymupdf.open() as spreads:
        for i in range(0, 10, 2):
            page = spreads.new_page(width=W * 2, height=H)
            for j in range(2):
                with pymupdf.open(files[i + j]) as source:
                    page.show_pdf_page(pymupdf.Rect(j * W, 0, (j + 1) * W, H), source, 0)
                    for link in source[0].get_links():
                        if link.get('uri'): page.insert_link({'kind': pymupdf.LINK_URI, 'from': link['from'] + (j * W, 0, j * W, 0), 'uri': link['uri']})
            page.get_pixmap(dpi=170, alpha=False).save(HERE / f'pareja-{i + 14:02d}-{i + 15:02d}.png')
        spreads.set_metadata({'title': 'Cinco parejas enfrentadas / 14–23', 'author': 'Pol Surriel Muixench'})
        spreads.save(HERE / 'parejas-14-23.pdf', deflate=True)
    with pymupdf.open(PREVIOUS) as book:
        for path in files:
            with pymupdf.open(path) as source: book.insert_pdf(source)
        book.set_metadata({'title': 'Quiero ser vuestro director tecnológico / Librito completo 01–24', 'author': 'Pol Surriel Muixench'})
        book.save(HERE / 'librito-completo-01-24.pdf', deflate=True)
    assert all(hashlib.sha256(path.read_bytes()).hexdigest() == value for path, value in hashes.items())
    print('11 páginas, cinco parejas enfrentadas y librito completo de 24 páginas. Originales 01–13 intactos.')


if __name__ == '__main__': main()
