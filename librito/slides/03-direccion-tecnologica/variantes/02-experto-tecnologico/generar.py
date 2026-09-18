#!/usr/bin/env python3
"""Genera únicamente la variante 2 de la página 3, conservando los originales.

El titular y el argumento se editan en texto.json. Mantiene el formato, los
recursos compartidos y la evidencia gráfica de la primera variante.
"""
from pathlib import Path
import importlib.util
import json
import tempfile

import pymupdf
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics

HERE = Path(__file__).resolve().parent
BOOK = HERE.parents[3]
ROOT = BOOK.parent


def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


base = load_module('recursos', BOOK / 'slides/01-portada/generar-horizontal.py')
qr_diseno = load_module('etiqueta_qr', ROOT / 'recursos-compartidos/qr/etiqueta.py')
W, H = base.ANCHO, base.ALTO
BLUE, DARK = [base.COLORES[key] for key in ('as-blue-brand', 'as-blue-dark')]
MUTED = '#435e70'
QR_DATA = json.loads((ROOT / 'recursos-compartidos/qr/destinos.json').read_text())
REPORT_URL = next(e['url'] for e in QR_DATA['external'] if e['id'] == 'informe-anthropic')


class P:
    def __init__(self, c):
        self.c = c

    def text(self, s, x, y, size=11.5, weight='Regular', ink=DARK, tracking=0):
        self.c.setFillColor(HexColor(ink))
        t = self.c.beginText(x, H-y)
        t.setFont('Jakarta-'+weight, size)
        t.setCharSpace(tracking)
        t.textOut(s)
        self.c.drawText(t)

    def para(self, s, x, y, width, size=11.5, leading=17, ink=DARK):
        lines, line = [], ''
        for word in s.split():
            trial = (line+' '+word).strip()
            if line and pdfmetrics.stringWidth(trial, 'Jakarta-Regular', size) > width:
                lines.append(line)
                line = word
            else:
                line = trial
        if line:
            lines.append(line)
        for i, line in enumerate(lines):
            self.text(line, x, y+i*leading, size, ink=ink)
        return y+len(lines)*leading


def page3(p, text, capture):
    p.text('EL CAMBIO QUE VIENE', 43, 43, 8.5, 'SemiBold', MUTED, 1)
    p.text(text['titular'][0], 40, 99, 36, 'ExtraBold', tracking=-1.2)
    p.text(text['titular'][1], 40, 140, 38, 'ExtraBold', tracking=-1.2)
    p.text(text['titular'][2], 39, 187, 40, 'ExtraBold', BLUE, -1.5)
    p.para(text['argumento'], 43, 218, 270)
    qr_diseno.codigo(p.c, H, REPORT_URL, 41, 300, 79.37, base.COLORES['as-blue-light'])
    qr_diseno.etiqueta(p.c, H, 'Informe completo aquí', 138, 301, BLUE, REPORT_URL, tamano=8.8)
    p.text('Economic Scenarios for', 138, 348, 8.5, 'SemiBold', MUTED)
    p.text('Transformative AI', 138, 361, 8.5, 'SemiBold', MUTED)
    p.text('Anthropic Institute · 2026', 138, 378, 8.2, ink=MUTED)
    p.text('TRES ESCENARIOS DE IA', 354, 75, 8.5, 'SemiBold', MUTED, .5)
    p.c.drawImage(str(capture), 347, H-95-224.7, width=192, height=224.7, mask='auto')
    p.para('Empleo cognitivo en EE. UU. Los tres escenarios incluyen ocupaciones jurídicas; no son predicciones.', 350, 338, 199, 8.5, 12, MUTED)
    p.text('Fuente: fig. 4, p. 34; sectores, p. 25.', 350, 381, 8.5, ink=MUTED)
    p.text('EL PRIMER PASO: ENTENDER VUESTRO NEGOCIO.', 43, 399, 7.5, 'SemiBold', MUTED, .2)
    p.text('03', 545, 399, 9, 'SemiBold')


def main():
    compiler = load_module('compilador', BOOK / 'compilar.py')
    text = json.loads((HERE / 'texto.json').read_text())
    with tempfile.TemporaryDirectory(prefix='asa-slide03-v2-') as temporary:
        base.fuentes(Path(temporary))
        content = compiler.render(HERE, 3, text)
    with pymupdf.open(stream=content, filetype='pdf') as doc:
        assert len(doc) == 1
        page = doc[0]
        assert abs(page.rect.width-W) < .02 and abs(page.rect.height-H) < .02
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines', []):
                for span in line['spans']:
                    assert page.rect.contains(pymupdf.Rect(span['bbox'])), span['text']
        png = page.get_pixmap(dpi=240, alpha=False).tobytes('png')
    compiler.write(HERE / 'pagina.pdf', content)
    compiler.write(HERE / 'pagina.png', png)
    print('Variante 2: pagina.pdf y pagina.png generados en su propia carpeta.')


if __name__ == '__main__':
    main()
