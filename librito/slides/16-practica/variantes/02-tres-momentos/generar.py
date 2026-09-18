"""Alternativa de la página 16; exporta únicamente esta variante, sin seleccionarla."""
from pathlib import Path
import importlib.util
import json
import tempfile

HERE = Path(__file__).resolve().parent
BOOK = HERE.parents[3]
spec = importlib.util.spec_from_file_location('cierre', BOOK / 'muestras/14-24-cierre/generar.py')
a = importlib.util.module_from_spec(spec)
spec.loader.exec_module(a)
P = a.P


def pagina(p, d):
    p.text('04 / ACOMPAÑAR', 35, 43, 8.5, 'SemiBold', a.MUTED, 1)
    p.text('Un poco', 32, 88, 38, 'ExtraBold', tracking=-1.2)
    p.slanted('cada día.', 195, 88, 42, 3)
    end = p.para(d['intro'], 35, 135, 119, 10.5, 15.5, a.DARK)
    assert end < 260
    for x, captura in zip([175, 306, 437], d['capturas']):
        p.text(captura['titulo'], x + 3, 109, 7.6, 'SemiBold', a.BLUE, .3)
        a.phone(p, {'captura': captura['archivo']}, x, 122, 120)
    a.code(p, d['qr'], 35, 268)
    a.a.qr_diseno.etiqueta(p.c, a.H, 'Demo interactiva', 34, 355,
                          a.BLUE, a.QR[d['qr']]['destino'], 'arriba', 7.5)
    p.para(d['nota'], 386, 39, 171, 7, 10)
    a.c.footer(p, 16, d['puente'])


if __name__ == '__main__':
    spec = importlib.util.spec_from_file_location('compilar', BOOK / 'compilar.py')
    compiler = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(compiler)
    with tempfile.TemporaryDirectory(prefix='asa-variante-16-') as temp:
        compiler.load_module(BOOK / 'slides/01-portada/generar-horizontal.py').fuentes(Path(temp))
        pdf = compiler.render(HERE, 16, json.loads((HERE / 'texto.json').read_text()))
        compiler.write(HERE / 'pagina.pdf', pdf)
        with compiler.pymupdf.open(stream=pdf, filetype='pdf') as doc:
            compiler.write(HERE / 'pagina.png', doc[0].get_pixmap(dpi=240).tobytes('png'))
    print('Variante 02 exportada; selección e index sin cambios.')
