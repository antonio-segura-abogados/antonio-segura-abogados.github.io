#!/usr/bin/env python3
"""Tres composiciones independientes para la portada horizontal de Pol Surriel."""

from __future__ import annotations

import importlib.util
import tempfile
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFont
from reportlab.pdfgen import canvas


CARPETA = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("recursos_portada", CARPETA / "generar-horizontal.py")
recursos = importlib.util.module_from_spec(spec)
spec.loader.exec_module(recursos)
ANCHO, ALTO = recursos.ANCHO, recursos.ALTO
texto, color = recursos.texto, recursos.color

DISENOS = (
    ("02-editorial-dos-columnas", "02 / Editorial", "Dos columnas. Experiencia y ejecución."),
    ("03-diagonal", "03 / Diagonal", "Una composición que avanza hacia la conversación."),
    ("04-conversacion", "04 / Conversación", "El encuentro como protagonista."),
)


def rectangulo(pdf, x, y, ancho, alto, tinta):
    pdf.setFillColor(color(tinta))
    pdf.rect(x, ALTO - y - alto, ancho, alto, fill=1, stroke=0)


def flecha(pdf, x, y, longitud, tinta="as-blue-dark", grosor=2):
    pdf.setStrokeColor(color(tinta))
    pdf.setLineWidth(grosor)
    pdf.setLineCap(0)
    pdf.line(x, ALTO - y, x + longitud, ALTO - y)
    camino = pdf.beginPath()
    camino.moveTo(x + longitud - 9, ALTO - y + 9)
    camino.lineTo(x + longitud, ALTO - y)
    camino.lineTo(x + longitud - 9, ALTO - y - 9)
    pdf.drawPath(camino)


def editorial(pdf):
    # Dos campos verticales: la trayectoria a la izquierda, la prueba a la derecha.
    corte = 342
    rectangulo(pdf, 0, 0, ANCHO, ALTO, "as-white")
    rectangulo(pdf, corte, 0, ANCHO - corte, ALTO, "as-blue-brand")

    texto(pdf, "Mi currículum", 31, 61, 27, "SemiBold", tracking=-0.7)
    texto(pdf, "cuenta mi", 31, 92, 27, "Regular", tracking=-0.7)
    texto(pdf, "experiencia.", 29, 137, 40, "ExtraBold", tracking=-1.4)
    rectangulo(pdf, 32, 165, 42, 3, "as-blue-brand")

    texto(pdf, "Quiero ser vuestro", 32, 211, 16, "SemiBoldItalic", tracking=-0.3)
    texto(pdf, "director", 29, 253, 43, "ExtraBold", tracking=-1.6)
    texto(pdf, "tecnológico.", 30, 291, 38, "ExtraBold", tracking=-1.3)

    texto(pdf, "Este", 367, 111, 44, "ExtraBold", "as-white", tracking=-1.4)
    texto(pdf, "proyecto", 366, 157, 43, "ExtraBold", "as-white", tracking=-1.5)
    texto(pdf, "muestra cómo", 369, 201, 22, "Regular", "as-white", tracking=-0.6)
    texto(pdf, "trabajo.", 366, 240, 38, "ExtraBold", "as-white", tracking=-1)

    # El cierre pertenece al campo del proyecto; una línea separa la invitación.
    rectangulo(pdf, 370, 302, 192, 0.7, "as-white")
    texto(pdf, "¿Hablamos?", 368, 342, 25, "ExtraBold", tracking=-0.9)
    flecha(pdf, 535, 334, 25)
    texto(pdf, "Pol Surriel", 32, 388, 12, "SemiBold", tracking=-0.2)
    texto(pdf, "PARA ANTONIO", 370, 378, 8.5, "SemiBold", "as-white", tracking=0.4)
    texto(pdf, "SEGURA ABOGADOS", 370, 391, 8.5, "SemiBold", "as-white", tracking=0.4)


def diagonal(pdf):
    # El corte oblicuo es la estructura de la página, no una banda decorativa.
    rectangulo(pdf, 0, 0, ANCHO, ALTO, "as-blue-brand")
    pdf.setFillColor(color("as-blue-dark"))
    campo = pdf.beginPath()
    campo.moveTo(0, ALTO - 305)
    campo.lineTo(ANCHO, ALTO - 191)
    campo.lineTo(ANCHO, 0)
    campo.lineTo(0, 0)
    campo.close()
    pdf.drawPath(campo, fill=1, stroke=0)

    texto(pdf, "Mi currículum cuenta", 32, 39, 21, "SemiBold", "as-white", tracking=-0.4)
    texto(pdf, "mi experiencia.", 32, 66, 25, "ExtraBold", "as-white", tracking=-0.5)

    # Toda la aspiración comparte una línea de fuerza ascendente.
    pdf.saveState()
    pdf.translate(41, ALTO - 220)
    pdf.rotate(9)
    pdf.setFillColor(color("as-blue-dark"))
    t = pdf.beginText(3, 86)
    t.setFont("Jakarta-SemiBoldItalic", 18)
    t.setCharSpace(-0.35)
    t.textOut("Quiero ser vuestro")
    pdf.drawText(t)
    pdf.setFillColor(color("as-white"))
    t = pdf.beginText(-4, 0)
    t.setFont("Jakarta-ExtraBold", 108)
    t.setCharSpace(-4)
    t.textOut("director")
    pdf.drawText(t)
    t = pdf.beginText(-3, -62)
    t.setFont("Jakarta-ExtraBold", 73)
    t.setCharSpace(-2.4)
    t.textOut("tecnológico.")
    pdf.drawText(t)
    pdf.restoreState()

    texto(pdf, "Este proyecto", 32, 338, 28, "ExtraBold", "as-white", tracking=-0.7)
    texto(pdf, "muestra cómo trabajo.", 32, 364, 18, "Regular", "as-white", tracking=-0.3)
    texto(pdf, "¿Hablamos?", 391, 363, 23, "ExtraBold", "as-white", tracking=-0.8)
    flecha(pdf, 537, 354, 25, "as-white")
    texto(pdf, "Pol Surriel", 33, 395, 10, "SemiBold", "as-white")
    texto(pdf, "PARA ANTONIO", 443, 34, 8.5, "SemiBold", tracking=0.4)
    texto(pdf, "SEGURA ABOGADOS", 443, 47, 8.5, "SemiBold", tracking=0.4)


def conversacion(pdf):
    # Composición centrada. Un semicírculo enmarca una invitación de gran escala.
    rectangulo(pdf, 0, 0, ANCHO, ALTO, "as-blue-dark")
    pdf.setFillColor(color("as-blue-brand"))
    pdf.circle(ANCHO / 2, ALTO - 450, 253, stroke=0, fill=1)

    def centrado(contenido, y, tamano, estilo="Regular", tinta="as-white", tracking=0):
        ancho = recursos.pdfmetrics.stringWidth(contenido, f"Jakarta-{estilo}", tamano)
        ancho += tracking * (len(contenido) - 1)
        texto(pdf, contenido, (ANCHO - ancho) / 2, y, tamano, estilo, tinta, tracking)

    centrado("Mi currículum cuenta", 48, 21, tracking=-0.35)
    centrado("mi experiencia.", 83, 33, "ExtraBold", tracking=-0.7)

    centrado("Quiero ser vuestro", 134, 17, "SemiBoldItalic", "as-blue-brand", tracking=-0.2)
    centrado("director tecnológico.", 174, 41, "ExtraBold", tracking=-1.2)

    centrado("Este proyecto muestra", 243, 18, tracking=-0.1)
    centrado("cómo trabajo.", 275, 31, "SemiBold", tracking=-0.6)

    centrado("¿Hablamos?", 356, 82, "ExtraBold", tracking=-3)
    centrado("Pol Surriel", 392, 11, "SemiBold", tracking=-0.1)
    texto(pdf, "PARA ANTONIO", 443, 29, 8.5, "SemiBold", "as-white", tracking=0.3)
    texto(pdf, "SEGURA ABOGADOS", 443, 42, 8.5, "SemiBold", "as-white", tracking=0.3)


def exportar(base, componer, numero):
    ruta = CARPETA / f"{base}.pdf"
    pdf = canvas.Canvas(str(ruta), pagesize=(ANCHO, ALTO), pageCompression=1, invariant=1)
    pdf.setTitle(f"Portada {numero} - {base[3:].replace('-', ' ')}")
    pdf.setAuthor("Pol Surriel Muixench")
    pdf.setSubject("Diseño de portada / Candidatura a Antonio Segura Abogados")
    pdf.setCreator("Proyecto ASA / Diseño editorial")
    pdf.setTrimBox((0, 0, ANCHO, ALTO))
    componer(pdf)
    pdf.showPage()
    pdf.save()
    recursos.verificar(ruta, 0)
    with pymupdf.open(ruta) as documento:
        documento[0].get_pixmap(dpi=240, alpha=False).save(ruta.with_suffix(".png"))
    print(f"Revisado: {ruta.name} / 210 × 148 mm / texto y fuentes incrustadas")


def comparativa(temporal):
    margen, espacio, miniatura = 38, 30, 630
    altura = round(miniatura * ALTO / ANCHO)
    ancho = margen * 2 + 3 * miniatura + 2 * espacio
    alto = 149 + altura + 73
    imagen = Image.new("RGB", (ancho, alto), recursos.COLORES["as-gray-50"])
    dibujo = ImageDraw.Draw(imagen)
    titulo = ImageFont.truetype(str(temporal / "Jakarta-ExtraBold.ttf"), 32)
    etiqueta = ImageFont.truetype(str(temporal / "Jakarta-SemiBold.ttf"), 23)
    nota = ImageFont.truetype(str(temporal / "Jakarta-Regular.ttf"), 19)
    dibujo.text((margen, 29), "Tres direcciones de diseño", font=titulo, fill=recursos.COLORES["as-blue-dark"])
    dibujo.text((margen, 78), "Pol Surriel / Portada A5 horizontal / Azul corporativo #0192E5", font=nota, fill=recursos.COLORES["as-gray-600"])
    for i, (base, nombre, descripcion) in enumerate(DISENOS):
        x = margen + i * (miniatura + espacio)
        dibujo.text((x, 116), nombre, font=etiqueta, fill=recursos.COLORES["as-blue-dark"])
        with Image.open(CARPETA / f"{base}.png") as portada:
            imagen.paste(portada.resize((miniatura, altura), Image.Resampling.LANCZOS), (x, 149))
        dibujo.text((x, 149 + altura + 24), descripcion, font=nota, fill=recursos.COLORES["as-gray-600"])
    imagen.save(CARPETA / "comparativa-disenos.png")


def main():
    with tempfile.TemporaryDirectory(prefix="asa-disenos-") as directorio:
        temporal = Path(directorio)
        recursos.fuentes(temporal)
        for (base, _, _), componer, numero in zip(DISENOS, (editorial, diagonal, conversacion), (2, 3, 4), strict=True):
            exportar(base, componer, numero)
        comparativa(temporal)


if __name__ == "__main__":
    main()
