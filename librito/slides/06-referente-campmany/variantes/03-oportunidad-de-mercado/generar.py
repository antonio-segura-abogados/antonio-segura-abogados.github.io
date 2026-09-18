#!/usr/bin/env python3
"""Página 6: estudio de Pol, oportunidad para AS y referente como respaldo."""
from pathlib import Path
import importlib.util
import json
import tempfile

import pymupdf
from reportlab.pdfbase import pdfmetrics

HERE = Path(__file__).resolve().parent
BOOK = HERE.parents[3]


def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


model = load_module('modelo_campmany', BOOK / 'muestras/06-07-modelo/generar.py')
common = model.common
P, W, H = common.P, common.W, common.H
BLUE, DARK, MUTED, PALE = common.BLUE, common.DARK, common.MUTED, common.PALE


def page6(p, data):
    p.text(data['antetitulo'], 35, 43, 8.5, 'SemiBold', MUTED, .8)
    p.text(data['lineasTitulo'][0], 32, 101, 40, 'ExtraBold', tracking=-1.3)
    p.slanted(data['lineasTitulo'][1], 35, 160, 44, 3)

    end_study = p.para(data['estudio'], 35, 198, 510, 12.4, 18, DARK)
    assert end_study <= 252, 'El estudio invade la oportunidad para AS'
    p.text(data['oportunidad'], 35, 268, 20, 'ExtraBold', BLUE, -.45)

    # Campmany respalda el argumento principal en una franja secundaria.
    p.rect(35, 289, 524, 83, PALE)
    p.rect(35, 289, 3, 83, BLUE)
    proof = data['respaldo']
    p.text(proof['etiqueta'], 51, 310, 7.4, 'SemiBold', MUTED, .5)
    model.original(p, proof['logo'], 51, 323, 128)
    p.text('CAMPMANY PREMIUM', 51, 356, 7.5, 'SemiBold', MUTED, .4)
    end_model = p.para(proof['modelo'], 202, 308, 339, 10.2, 14, DARK)
    assert end_model <= 336, 'La explicación del modelo invade el resultado'
    end_result = p.para(proof['resultado'], 202, 337, 339, 10.2, 13, DARK, 'SemiBold')
    assert end_result <= 376, 'El resultado supera la franja del referente'

    source = data['fuente']
    p.text(source['pie'], 35, 384, 7.3, ink=MUTED)
    for link in source['enlaces']:
        prefix = source['pie'][:source['pie'].index(link['etiqueta'])]
        link_start = 35 + pdfmetrics.stringWidth(prefix, 'Jakarta-Regular', 7.3)
        link_end = link_start + pdfmetrics.stringWidth(link['etiqueta'], 'Jakarta-Regular', 7.3)
        p.c.linkURL(link['url'], (link_start, H - 387, link_end, H - 376), relative=0)
    common.footer(p, 6, data['puente'])


def main():
    compiler = load_module('compilador_oportunidad', BOOK / 'compilar.py')
    data = json.loads((HERE / 'texto.json').read_text())
    with tempfile.TemporaryDirectory(prefix='asa-slide06-v3-') as temporary:
        common.base.fuentes(Path(temporary))
        content = compiler.render(HERE, 6, data)
    with pymupdf.open(stream=content, filetype='pdf') as doc:
        png = doc[0].get_pixmap(dpi=240, alpha=False).tobytes('png')
    compiler.write(HERE / 'pagina.pdf', content)
    compiler.write(HERE / 'pagina.png', png)
    common.verify(HERE / 'pagina.pdf')
    print('Página 6, variante 03: PDF y PNG generados; tamaño, fuentes y límites verificados.')


if __name__ == '__main__':
    main()
