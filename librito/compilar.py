#!/usr/bin/env python3
"""Una selección → renders por slide, PDF completo y presentación web.

Uso: npm run build:book
Solo unir PDFs ya exportados: npm run build:book -- --sin-renderizar
La composición se configura en variantes/<nombre>/render.json.
"""
from pathlib import Path
import argparse
import hashlib
import importlib.util
import io
import json
import os
import tempfile

import pymupdf
from PIL import Image
from reportlab.pdfgen import canvas

BOOK = Path(__file__).resolve().parent
ROOT = BOOK.parent
SLIDES = BOOK / 'slides'
WEB = ROOT / 'vertical/public/presentacion'
GENERATED = ROOT / 'vertical/src/generated/presentacion.json'
W, H = 210 * 72 / 25.4, 148 * 72 / 25.4
MODULES = {}


def load_module(path):
    path = path.resolve()
    if path not in MODULES:
        spec = importlib.util.spec_from_file_location('pagina_' + hashlib.sha256(str(path).encode()).hexdigest()[:12], path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        MODULES[path] = module
    return MODULES[path]


def write(path, content):
    """Reemplazo atómico y sin tocar archivos idénticos."""
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.read_bytes() == content: return
    temporary = path.with_name(path.name + '.new')
    temporary.write_bytes(content)
    os.replace(temporary, path)


def dumps(data): return (json.dumps(data, ensure_ascii=False, indent=2) + '\n').encode()
def sha(data): return hashlib.sha256(data).hexdigest()


def render(target, number, text):
    configuration = target / 'render.json'
    if not configuration.exists():
        if not (target / 'pagina.pdf').is_file(): raise ValueError(f'Falta render.json o pagina.pdf en {target}')
        return (target / 'pagina.pdf').read_bytes()
    config = json.loads(configuration.read_text())
    module = load_module(BOOK / config['modulo'])
    buffer = io.BytesIO()
    cv = canvas.Canvas(buffer, pagesize=(W,H), pageCompression=1, invariant=1)
    cv.setTitle(f'Página {number:02d} / {text["titulo"]}')
    cv.setAuthor('Pol Surriel Muixench')
    cv.setSubject('Candidatura a Antonio Segura Abogados / Variante seleccionada')
    cv.setTrimBox((0,0,W,H))
    draw = getattr(module, config['funcion'])
    if config.get('canvasDirecto'): draw(cv)
    else: draw(module.P(cv), text, *[BOOK / path for path in config.get('recursos',[])])
    cv.showPage(); cv.save()
    return buffer.getvalue()


def chapter(number):
    if number <= 3: return 'La candidatura'
    if number <= 7: return 'La oportunidad'
    if number <= 11: return 'La propuesta'
    if number <= 17: return 'El acompañamiento'
    if number <= 19: return 'La operación'
    if number <= 21: return 'El impacto'
    return 'La persona'


def main():
    args = argparse.ArgumentParser(description=__doc__)
    args.add_argument('--sin-renderizar', action='store_true')
    options = args.parse_args()
    selection = json.loads((BOOK / 'seleccion.json').read_text())
    entries = selection['paginas']
    assert entries and len(entries) % 4 == 0, 'El librito debe tener un múltiplo de cuatro páginas.'
    assert len({e['carpeta'] for e in entries}) == len(entries), 'Carpeta repetida.'
    prepared = []
    with tempfile.TemporaryDirectory(prefix='asa-compilar-') as temp:
        resources = load_module(SLIDES / '01-portada/generar-horizontal.py')
        resources.fuentes(Path(temp))
        for number, entry in enumerate(entries, 1):
            assert entry['carpeta'].startswith(f'{number:02d}-'), 'La selección debe estar en orden, sin huecos.'
            folder = SLIDES / entry['carpeta']
            target = (folder / 'variantes' / entry['variante']).resolve()
            assert target.parent == (folder / 'variantes').resolve(), 'La variante debe estar dentro de su carpeta.'
            data = json.loads((target / 'texto.json').read_text())
            content = (target / 'pagina.pdf').read_bytes() if options.sin_renderizar else render(target, number, data)
            with pymupdf.open(stream=content, filetype='pdf') as doc:
                assert len(doc) == 1, f'{target}: cada variante debe tener una página.'
                page = doc[0]
                assert abs(page.rect.width-W)<.02 and abs(page.rect.height-H)<.02, f'{target}: tamaño distinto de A5.'
                for block in page.get_text('dict')['blocks']:
                    for line in block.get('lines',[]):
                        for span in line['spans']:
                            box = pymupdf.Rect(span['bbox'])
                            assert page.rect.contains(box), f'Texto fuera de la página {number}: {span["text"]}'
                png = page.get_pixmap(dpi=240, alpha=False).tobytes('png')
                pixels = Image.open(io.BytesIO(png)).convert('RGB')
                image_version = sha(png)[:12]
                web_name = f'{number:02d}-{image_version}.webp'
                thumb_name = f'mini-{number:02d}-{image_version}.webp'
                web_img = pixels.copy(); web_img.thumbnail((1680,1680))
                web_buffer = io.BytesIO(); web_img.save(web_buffer,'WEBP',quality=94,method=6)
                thumb_img = pixels.copy(); thumb_img.thumbnail((300,300))
                thumb_buffer = io.BytesIO(); thumb_img.save(thumb_buffer,'WEBP',quality=82,method=6)
                urls = list(dict.fromkeys(l['uri'] for l in page.get_links() if l.get('uri')))
                prepared.append({'folder':folder,'target':target,'pdf':content,'png':png,'web':web_buffer.getvalue(),'thumb':thumb_buffer.getvalue(),
                    'meta':{'numero':number,'titulo':data['titulo'],'capitulo':chapter(number),'imagen':web_name,'miniatura':thumb_name,'ancho':web_img.width,'alto':web_img.height,'texto':page.get_text().strip(),'enlaces':urls,'variante':entry['variante']}})
    # Todo se valida antes de sustituir los renders vigentes.
    with pymupdf.open() as final:
        for item in prepared:
            with pymupdf.open(stream=item['pdf'], filetype='pdf') as doc: final.insert_pdf(doc)
        final.set_metadata({'title':selection['titulo'],'author':selection['autor'],'subject':'Presentación completa / Antonio Segura Abogados','creator':'Compilador del librito ASA'})
        final.set_toc([[1,f'{p["meta"]["numero"]:02d} · {p["meta"]["titulo"]}',p['meta']['numero']] for p in prepared])
        final_bytes = final.tobytes(garbage=4, deflate=True, no_new_id=True)
    version = sha(final_bytes)[:12]
    pdf_name = f'librito-{version}.pdf'
    web_files = {pdf_name}
    for item in prepared:
        write(item['target']/'pagina.pdf',item['pdf']);write(item['target']/'pagina.png',item['png'])
        write(item['folder']/'index.pdf',item['pdf']);write(item['folder']/'index.png',item['png'])
        write(WEB/item['meta']['imagen'],item['web']);write(WEB/item['meta']['miniatura'],item['thumb'])
        web_files.update([item['meta']['imagen'],item['meta']['miniatura']])
    # Solo se retiran derivados de la carpeta dedicada, nunca las variantes.
    for old in WEB.iterdir():
        if old.is_file() and old.name not in web_files and old.suffix in {'.webp','.pdf'}: old.unlink()
    write(BOOK/'librito-final.pdf',final_bytes)
    write(WEB/pdf_name,final_bytes)
    write(GENERATED,dumps({'titulo':selection['titulo'],'autor':selection['autor'],'version':version,'pdf':pdf_name,'slides':[p['meta'] for p in prepared]}))
    write(BOOK/'COMPILACION.json',dumps({'seleccion':'seleccion.json','paginas':len(prepared),'formatoMm':[210,148],'sha256Pdf':sha(final_bytes),'versionWeb':version,'pdf':'librito-final.pdf','salidaWeb':'../vertical/public/presentacion','variantes':[{'pagina':p['meta']['numero'],'carpeta':p['folder'].name,'variante':p['meta']['variante'],'sha256Pdf':sha(p['pdf']),'sha256Png':sha(p['png'])} for p in prepared]}))
    print(f'{len(prepared)} páginas: index.pdf + index.png por carpeta, librito-final.pdf y presentación web {version}.')


if __name__ == '__main__': main()
