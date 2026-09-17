#!/usr/bin/env python3
"""Portada horizontal: un cartel tipográfico con la propuesta como prueba."""

from __future__ import annotations

import json
import re
import tempfile
from pathlib import Path

import pymupdf
from fontTools.ttLib import TTFont as Fuente
from fontTools.varLib.instancer import instantiateVariableFont
from pypdf import PdfReader
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


CARPETA = Path(__file__).resolve().parent
PROYECTO = CARPETA.parents[2]
RECURSOS = PROYECTO / "recursos-compartidos"
FORMATO = json.loads((CARPETA.parents[1] / "formato.json").read_text())
COLORES = dict(re.findall(
    r"--(as-[\w-]+):\s*(#[0-9a-fA-F]{6});",
    (RECURSOS / "estilos/tokens.css").read_text(),
))
ANCHO = FORMATO["anchoMm"] * mm
ALTO = FORMATO["altoMm"] * mm
SANGRADO = FORMATO["portada"]["sangradoMm"] * mm
BASE = "01-horizontal-director-tecnologico"



def fuentes(temporal):
    for peso, cursiva in ((400, False), (600, False), (800, False), (600, True)):
        origen = RECURSOS / "assets/fuentes" / (
            "PlusJakartaSans-Italic-Variable.ttf" if cursiva else "PlusJakartaSans-Variable.ttf"
        )
        estilo = {400: "Regular", 600: "SemiBold", 800: "ExtraBold"}[peso]
        if cursiva:
            estilo += "Italic"
        nombre = f"Jakarta-{estilo}"
        destino = temporal / f"{nombre}.ttf"
        with Fuente(origen) as original:
            estatica = instantiateVariableFont(original, {"wght": peso}, inplace=False)
            # El render debe depender del contenido, no de la hora de compilación.
            estatica.recalcTimestamp = False
            for identificador, valor in {
                1: "Plus Jakarta Sans",
                2: estilo,
                4: f"Plus Jakarta Sans {estilo}",
                6: f"PlusJakartaSans-{estilo}",
            }.items():
                estatica["name"].setName(valor, identificador, 3, 1, 0x409)
                estatica["name"].setName(valor, identificador, 1, 0, 0)
            estatica.save(destino)
        pdfmetrics.registerFont(TTFont(nombre, str(destino)))


def color(nombre):
    return HexColor(COLORES[nombre])


def texto(pdf, contenido, x, y, tamano, estilo="Regular", tinta="as-blue-dark", tracking=0):
    """Coordenadas en puntos desde el borde superior del formato cortado."""
    pdf.setFillColor(color(tinta))
    objeto = pdf.beginText(x, ALTO - y)
    objeto.setFont(f"Jakarta-{estilo}", tamano)
    objeto.setCharSpace(tracking)
    objeto.textOut(contenido)
    pdf.drawText(objeto)


def flecha(pdf, x, y, longitud=24):
    pdf.setStrokeColor(color("as-blue-dark"))
    pdf.setLineWidth(2.3)
    pdf.setLineCap(0)
    base = ALTO - y
    pdf.line(x, base, x + longitud, base)
    trazo = pdf.beginPath()
    trazo.moveTo(x + longitud - 8, base + 8)
    trazo.lineTo(x + longitud, base)
    trazo.lineTo(x + longitud - 8, base - 8)
    pdf.drawPath(trazo)


def componer(pdf, sangrado=0):
    # El fondo continúa por todo el sangrado; no hay un marco blanco.
    pdf.setFillColor(color(FORMATO["portada"]["fondo"]))
    pdf.rect(-sangrado, -sangrado, ANCHO + 2 * sangrado, ALTO + 2 * sangrado, fill=1, stroke=0)

    texto(pdf, "Mi currículum cuenta mi experiencia.", 35, 44, 25, "SemiBold", tracking=-0.65)

    # Escalas y espaciado óptico propios de portada, independientes del cuerpo.
    texto(pdf, "Quiero ser vuestro", 36, 93, 20, "SemiBoldItalic", tracking=-0.4)
    texto(pdf, "director", 27, 199, 132, "ExtraBold", "as-white", tracking=-4.8)
    texto(pdf, "tecnológico.", 29, 273, 83, "ExtraBold", tracking=-2.9)

    # Franja de papel ligeramente inclinada: la prueba atraviesa la declaración.
    pdf.saveState()
    pdf.translate(ANCHO / 2, ALTO - 322)
    pdf.rotate(2.5)
    pdf.setFillColor(color("as-white"))
    pdf.rect(-ANCHO, -22, ANCHO * 2, 44, fill=1, stroke=0)
    pdf.setFillColor(color("as-blue-dark"))
    frase = pdf.beginText(-ANCHO / 2 + 35, -6)
    frase.setFont("Jakarta-SemiBold", 20)
    frase.setCharSpace(-0.4)
    frase.textOut("Este proyecto muestra cómo trabajo.")
    pdf.drawText(frase)
    pdf.restoreState()

    texto(pdf, "¿Hablamos?", 388, 390, 22, "ExtraBold", tracking=-0.8)
    flecha(pdf, 530, 383)
    texto(pdf, "Pol Surriel", 35, 390, 12, "SemiBold", tracking=-0.3)
    texto(pdf, "PARA ANTONIO", 224, 381, 7.8, "SemiBold", tracking=0.5)
    texto(pdf, "SEGURA ABOGADOS", 224, 392, 7.8, "SemiBold", tracking=0.5)


def exportar(base=BASE, sangrado=False):
    margen = SANGRADO if sangrado else 0
    nombre = base + ("-sangrado" if sangrado else "")
    ruta = CARPETA / f"{nombre}.pdf"
    ancho, alto = ANCHO + 2 * margen, ALTO + 2 * margen
    pdf = canvas.Canvas(str(ruta), pagesize=(ancho, alto), pageCompression=1, invariant=1)
    pdf.setTitle("Portada 1 - Director tecnológico")
    pdf.setAuthor("Pol Surriel Muixench")
    pdf.setSubject("Candidatura a Antonio Segura Abogados / Portada en exploración")
    pdf.setCreator("Proyecto ASA / Diseño tipográfico de portada")
    pdf.setTrimBox((margen, margen, margen + ANCHO, margen + ALTO))
    pdf.setBleedBox((0, 0, ancho, alto))
    pdf.translate(margen, margen)
    componer(pdf, margen)
    pdf.showPage()
    pdf.save()
    verificar(ruta, margen)
    if not sangrado:
        with pymupdf.open(ruta) as documento:
            documento[0].get_pixmap(dpi=240, alpha=False).save(CARPETA / f"{base}.png")
    print(f"Verificado: {ruta.name} / {ancho / mm:g} × {alto / mm:g} mm")


def verificar(ruta, sangrado):
    lector = PdfReader(ruta)
    assert len(lector.pages) == 1
    pagina = lector.pages[0]
    assert abs(float(pagina.trimbox.width) - ANCHO) < 0.02
    assert abs(float(pagina.trimbox.height) - ALTO) < 0.02
    assert abs(float(pagina.mediabox.width) - ANCHO - sangrado * 2) < 0.02
    assert abs(float(pagina.mediabox.height) - ALTO - sangrado * 2) < 0.02
    # PyMuPDF conserva las separaciones del titular con interlineado compacto.
    # Pypdf se utiliza para verificar cajas y fuentes incrustadas.
    with pymupdf.open(ruta) as documento:
        texto_pdf = " ".join(documento[0].get_text().split())
    for frase in (
        "Mi currículum cuenta mi experiencia.",
        "Quiero ser vuestro director tecnológico.",
        "Este proyecto muestra cómo trabajo.",
        "¿Hablamos? Pol Surriel",
    ):
        assert frase in texto_pdf, f"Texto perdido: {frase}"
    assert "Muixench" not in texto_pdf
    for ref in pagina["/Resources"]["/Font"].values():
        fuente = ref.get_object()
        if fuente.get("/Subtype") == "/TrueType":
            assert "/FontFile2" in fuente["/FontDescriptor"].get_object()
    with pymupdf.open(ruta) as documento:
        for bloque in documento[0].get_text("dict")["blocks"]:
            for linea in bloque.get("lines", []):
                for fragmento in linea["spans"]:
                    x0, y0, x1, y1 = fragmento["bbox"]
                    assert x0 >= sangrado and x1 <= ANCHO + sangrado
                    assert y0 >= sangrado and y1 <= ALTO + sangrado


def main():
    assert FORMATO["anchoMm"] == 210 and FORMATO["altoMm"] == 148
    with tempfile.TemporaryDirectory(prefix="asa-portada-horizontal-") as directorio:
        temporal = Path(directorio)
        fuentes(temporal)
        exportar()
        exportar(sangrado=True)


if __name__ == "__main__":
    main()
