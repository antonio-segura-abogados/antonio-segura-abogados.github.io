#!/usr/bin/env python3
"""Páginas 06-07: un referente comprobable y su aplicación propuesta a AS.

Reutiliza las primitivas de dibujo de 04-05 y los recursos compartidos.
Los textos de cada página permanecen en su carpeta de variantes.
"""
from pathlib import Path
import argparse
import hashlib
import importlib.util
import json
import tempfile

import pymupdf
from PIL import Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


HERE = Path(__file__).resolve().parent
BOOK = HERE.parents[1]
SLIDES = BOOK / "slides"
spec = importlib.util.spec_from_file_location(
    "maquetacion_negocio", HERE.parent / "04-05-negocio/generar.py"
)
common = importlib.util.module_from_spec(spec)
spec.loader.exec_module(common)
P, W, H = common.P, common.W, common.H
BLUE, DARK, WHITE = common.BLUE, common.DARK, common.WHITE
MUTED, PALE, LINE = common.MUTED, common.PALE, common.LINE
REFERENTES = {
    "01": SLIDES / "06-referente-campmany/variantes/01-suscripcion",
    "02": SLIDES / "06-referente-campmany/variantes/02-referente-visual",
}
P6 = REFERENTES["02"]
P7 = SLIDES / "07-modelo-operativo/variantes/01-procesos"
ASSETS = BOOK.parent / "recursos-compartidos/assets/referentes/campmany"
PREVIOUS = common.PREVIOUS + [common.P4 / "pagina.pdf", common.P5 / "pagina.pdf"]


def page6_tipografica(p, data):
    p.text("UN REFERENTE REAL", 35, 43, 8.5, "SemiBold", MUTED, 1)
    p.text(data["lineasTitulo"][0], 32, 100, 35, "ExtraBold", tracking=-1.1)
    p.slanted(data["lineasTitulo"][1], 35, 149, 38, 3)

    p.text(data["referente"], 35, 187, 18, "ExtraBold", tracking=-.4)
    end_intro = p.para(data["intro"], 35, 209, 280, 11.1, 16, DARK)
    assert end_intro <= 266, "El texto del referente invade la idea de asincronía"

    p.line(35, 277, 62, 277, BLUE, 2)
    for i, line in enumerate(data["idea"]):
        p.text(line, 35, 299 + i * 23, 17.5, "SemiBold", DARK, -.3)
    p.text(data["explicacionIdea"], 35, 342, 10.6, ink=MUTED)

    # La secuencia sintetiza la oferta pública, sin inventar su interfaz.
    p.line(349, 75, 349, 338, LINE, .7)
    p.text("EL RECORRIDO", 373, 87, 7.5, "SemiBold", MUTED, .8)
    for i, stage in enumerate(data["recorrido"]):
        cy = 128 + 62 * i
        if i < 3:
            p.line(384, cy + 12, 384, cy + 50, BLUE, 1.4)
            p.path([(381, cy + 45), (384, cy + 49), (387, cy + 45)], BLUE, 1.2)
        p.circle(384, cy, 11, DARK if i == 3 else BLUE)
        p.centered(f"{i+1:02d}", 384, cy + 3, 8.2, "SemiBold", WHITE)
        p.text(stage["titulo"], 405, cy - 5, 11, "SemiBold")
        end = p.para(stage["texto"], 405, cy + 13, 144, 10.1, 13.2)
        assert end <= cy + 44, "El texto de una etapa invade la siguiente"

    p.text(data["notaPlanes"], 35, 365, 9.2, ink=MUTED)
    source = data["fuente"]
    p.text(source["pie"], 35, 382, 8.3, ink=MUTED)
    source_width = pdfmetrics.stringWidth(source["pie"], "Jakarta-Regular", 8.3)
    p.c.linkURL(source["url"], (35, H - 386, 35 + source_width, H - 373), relative=0)
    common.footer(p, 6, data["puente"])


def original(p, name, x, top, width):
    """Respeta proporciones y transparencia de los recursos oficiales."""
    path = ASSETS / name
    with Image.open(path) as image:
        height = width * image.height / image.width
        assert image.width / width * 72 >= 600, "Resolución insuficiente para el recurso"
    p.c.drawImage(ImageReader(path), x, H - top - height, width=width, height=height, mask="auto")
    return height


def page6(p, data):
    p.text("UN REFERENTE REAL", 35, 43, 8.5, "SemiBold", MUTED, 1)
    p.text(data["lineasTitulo"][0], 32, 100, 35, "ExtraBold", tracking=-1.1)
    p.slanted(data["lineasTitulo"][1], 35, 149, 38, 3)

    # Logo y pieza de la propia web de Campmany, conservados en sus colores.
    original(p, data["assets"]["logo"], 352, 40, 199)
    p.text("PREMIUM", 353, 84, 8.5, "SemiBold", MUTED, 1.1)
    original(p, data["assets"]["ilustracion"], 338, 95, 210)

    end_intro = p.para(data["intro"], 35, 189, 281, 11.1, 16, DARK)
    assert end_intro <= 244, "La explicación invade el argumento"
    p.line(35, 247, 62, 247, BLUE, 2)
    for i, line in enumerate(data["idea"]):
        p.text(line, 35, 269 + i * 22, 17.5, "SemiBold", DARK, -.3)
    p.text(data["explicacionIdea"], 35, 310, 10.5, ink=MUTED)

    # La secuencia ocupa el ancho inferior y deja espacio a la identidad real.
    centers = [70, 217, 363, 510]
    p.line(centers[0], 331, centers[-1], 331, BLUE, 1.5)
    for x in [143, 290, 437]:
        p.arrowhead(x, 331, BLUE, 3)
    for i, (x, stage) in enumerate(zip(centers, data["recorrido"])):
        p.circle(x, 331, 9.2, BLUE if i < 3 else DARK)
        p.centered(f"{i+1:02d}", x, 334, 7.7, "SemiBold", WHITE)
        p.centered(stage["titulo"], x, 352, 10.1, "SemiBold")

    p.text(data["notaPlanes"], 35, 369, 9, ink=MUTED)
    source = data["fuente"]
    p.text(source["pie"], 35, 383, 8.1, ink=MUTED)
    source_width = pdfmetrics.stringWidth(source["pie"], "Jakarta-Regular", 8.1)
    p.c.linkURL(source["url"], (35, H - 387, 35 + source_width, H - 375), relative=0)
    common.footer(p, 6, data["puente"])


def page7(p, data):
    p.text("QUÉ APLICARÍA A AS", 43, 43, 8.5, "SemiBold", MUTED, 1)
    p.text(data["lineasTitulo"][0], 40, 97, 37, "ExtraBold", tracking=-1.4)
    p.slanted(data["lineasTitulo"][1], 43, 151, 44, 3)
    end_intro = p.para(data["intro"], 43, 182, 508, 11.3, 16, DARK)
    assert end_intro <= 214, "La introducción invade los mecanismos"

    # Cada fila explica una relación concreta, de cambio operativo a beneficio.
    for i, item in enumerate(data["mecanismos"]):
        y = (212, 264, 337)[i]
        p.text(f"{i+1:02d}", 43, y + 9, 24, "ExtraBold", BLUE, -.8)
        p.text(item["titulo"], 93, y, 12, "SemiBold")
        end_left = p.para(item["texto"], 93, y + 18, 210, 10.1, 12.4)
        p.line(320, y + 7, 337, y + 7, BLUE, 1.3)
        p.arrowhead(337, y + 7, BLUE, 3.5)
        p.text(item["resultado"], 352, y + 2, 15.7, "ExtraBold", DARK, -.45)
        end_right = p.para(item["beneficio"], 352, y + 20, 207, 10.1, 12.4)
        assert max(end_left, end_right) <= y + 46, "Una relación necesita más altura"
        if item.get("beneficioAdicional"):
            # La comparación salarial complementa la capacidad y coordinación.
            assert i == 1, "El complemento está previsto dentro del segundo mecanismo"
            assert pdfmetrics.stringWidth(item["beneficioAdicional"], "Jakarta-Regular", 9.6) <= 466
            p.text(item["beneficioAdicional"], 93, 313, 9.6, ink=MUTED)
        if i < 2:
            separator = 249 if i == 0 else 322
            p.line(93, separator, 559, separator, LINE, .6)

    p.text(data["nota"], 43, 382, 8.5, ink=MUTED)
    common.footer(p, 7, data["puente"])


def export(target, fn, number):
    data = json.loads((target / "texto.json").read_text())
    c = canvas.Canvas(str(target / "pagina.pdf"), pagesize=(W, H), pageCompression=1, invariant=1)
    c.setTitle(f"Página {number:02d} / " + data["titulo"])
    c.setAuthor("Pol Surriel Muixench")
    c.setSubject("Referente y aplicación a AS / Propuesta en revisión")
    c.setTrimBox((0, 0, W, H))
    fn(P(c), data)
    c.showPage()
    c.save()
    common.verify(target / "pagina.pdf")
    with pymupdf.open(target / "pagina.pdf") as doc:
        doc[0].get_pixmap(dpi=240, alpha=False).save(target / "pagina.png")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--referente", choices=REFERENTES, default="02", help="Variante de página 6; 02 es la vigente")
    args = parser.parse_args()
    referente = REFERENTES[args.referente]
    page6_fn = page6 if args.referente == "02" else page6_tipografica
    suffix = "" if args.referente == "02" else "-01-tipografica"
    hashes = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in PREVIOUS}
    with tempfile.TemporaryDirectory(prefix="asa-modelo-") as tmp:
        common.base.fuentes(Path(tmp))
        export(referente, page6_fn, 6)
        export(P7, page7, 7)

    with pymupdf.open() as spread:
        page = spread.new_page(width=W * 2, height=H)
        for i, target in enumerate([referente, P7]):
            with pymupdf.open(target / "pagina.pdf") as doc:
                page.show_pdf_page(pymupdf.Rect(i * W, 0, (i + 1) * W, H), doc, 0)
                for link in doc[0].get_links():
                    if link.get("uri"):
                        rect = link["from"] + (i * W, 0, i * W, 0)
                        page.insert_link({"kind": pymupdf.LINK_URI, "from": rect, "uri": link["uri"]})
        spread.set_metadata({"title": "Páginas 06-07 / Referente y modelo operativo", "author": "Pol Surriel Muixench"})
        spread.save(HERE / f"modelo-06-07{suffix}.pdf", deflate=True)
        page.get_pixmap(dpi=170, alpha=False).save(HERE / f"modelo-06-07{suffix}.png")

    with pymupdf.open() as book:
        for path in PREVIOUS + [referente / "pagina.pdf", P7 / "pagina.pdf"]:
            with pymupdf.open(path) as doc:
                book.insert_pdf(doc)
        book.set_metadata({"title": "Librito en orden / Páginas 01-07", "author": "Pol Surriel Muixench"})
        book.save(HERE / f"librito-01-07{suffix}.pdf", deflate=True)

    assert all(hashlib.sha256(p.read_bytes()).hexdigest() == hashes[p] for p in PREVIOUS)
    print("Páginas 06-07, pareja y acumulado 01-07 generados. Tamaño, fuentes y límites verificados. Originales 01-05 intactos.")


if __name__ == "__main__":
    main()
